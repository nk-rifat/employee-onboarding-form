"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

type PrimarySkillsFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  experienceFieldName: FieldPath<T>;
  skills: string[];
  emptyMessage?: string;
  onValuesChange: (
    nextSkills: string[],
    nextExperience: Record<string, string>,
  ) => void;
  currentExperience: Record<string, string>;
};

const PrimarySkillsField = <T extends FieldValues>({
  control,
  name,
  skills,
  emptyMessage = "No skills to show yet — pick a department first.",
  onValuesChange,
  currentExperience,
}: PrimarySkillsFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected: string[] = field.value ?? [];

        function toggle(skill: string, isChecked: boolean) {
          const next = isChecked
            ? [...selected, skill]
            : selected.filter((s: string) => s !== skill);

          const nextExperience = { ...currentExperience };

          if (!isChecked) {
            nextExperience[skill] = nextExperience[skill] ?? "";
          } else {
            delete nextExperience[skill];
          }

          field.onChange(next);
          onValuesChange(next, nextExperience);
        }

        return (
          <FieldSet>
            <FieldLegend variant="label">
              Primary skills (choose at least 3)
              {skills.length === 0 && " — select a department in Step 2 first"}
            </FieldLegend>
            <FieldGroup
              data-slot="checkbox-group"
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              {skills.length === 0 && (
                <p className="text-sm text-stone-400 sm:col-span-2">
                  {emptyMessage}
                </p>
              )}
              {skills.map((skill) => {
                const checked = selected.includes(skill);
                return (
                  <Field key={skill} orientation="horizontal">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={checked}
                      onCheckedChange={(isChecked) =>
                        toggle(skill, isChecked === true)
                      }
                    />
                    <FieldLabel
                      htmlFor={`skill-${skill}`}
                      className="font-normal"
                    >
                      {skill}
                    </FieldLabel>
                  </Field>
                );
              })}
            </FieldGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
        );
      }}
    />
  );
};

export default PrimarySkillsField;
