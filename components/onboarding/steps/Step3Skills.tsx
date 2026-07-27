"use client";
import { Controller, useFormContext } from "react-hook-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import SkillExperienceField from "./skills/SkillExperienceField";

import { skillsByDepartment } from "@/lib/mockData";
import PrimarySkillsField from "./skills/PrimarySkillsField";
import { Input } from "@/components/ui/input";

const Step3Skills = () => {
  const { control, watch, setValue } = useFormContext();

  const department = watch("job.department");
  const selectedSkills = watch("skills.selectedSkills") ?? [];
  const availableSkills = skillsByDepartment[department] ?? [];
  const skillExperience = watch("skills.skillExperience") ?? {};

  return (
    <FieldGroup className="gap-6">
      {/* Primary skills */}
      <PrimarySkillsField
        control={control}
        name="skills.selectedSkills"
        experienceFieldName="skills.skillExperience"
        skills={availableSkills}
        currentExperience={skillExperience}
        onValuesChange={(nextSkills, nextExperience) => {
          setValue("skills.skillExperience", nextExperience, {
            shouldValidate: true,
          });
        }}
      />

      {/* Years of experience per selected skill */}
      <SkillExperienceField
        control={control}
        name="skills.skillExperience"
        skills={selectedSkills}
      />

      {/* Preferred working hours */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Controller
          name="skills.workHoursStart"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Preferred hours — start
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="time"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="skills.workHoursEnd"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Preferred hours — end
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="time"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </FieldGroup>
  );
};

export default Step3Skills;
