"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

type SkillExperienceFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  skills: string[];
  legend?: string;
};

const SkillExperienceField = <T extends FieldValues>({
  control,
  name,
  skills,
  legend = "Years of experience per skill",
}: SkillExperienceFieldProps<T>) => {
  if (skills.length === 0) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errors = fieldState.error as
          | Record<string, { message?: string }>
          | undefined;

        return (
          <FieldSet>
            <FieldLegend variant="label">{legend}</FieldLegend>
            <FieldGroup className="gap-3">
              {skills.map((skill) => {
                const fieldError = errors?.[skill]?.message;
                const value =
                  (field.value as Record<string, string>)?.[skill] ?? "";

                return (
                  <Field
                    key={skill}
                    orientation="horizontal"
                    data-invalid={!!fieldError}
                  >
                    <FieldLabel
                      htmlFor={`exp-${skill}`}
                      className="w-40 font-normal"
                    >
                      {skill}
                    </FieldLabel>
                    <Input
                      id={`exp-${skill}`}
                      type="number"
                      min={0}
                      className="max-w-27.5"
                      value={value}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          [skill]: e.target.value,
                        })
                      }
                      aria-invalid={!!fieldError}
                    />
                    <span className="text-xs text-stone-400">years</span>
                    {fieldError && (
                      <FieldError errors={[{ message: fieldError }]} />
                    )}
                  </Field>
                );
              })}
            </FieldGroup>
          </FieldSet>
        );
      }}
    />
  );
};

export default SkillExperienceField;
