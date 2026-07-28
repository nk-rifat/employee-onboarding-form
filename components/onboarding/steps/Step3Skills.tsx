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
import { Textarea } from "@/components/ui/textarea";
import RemotePreferenceField from "./skills/RemotePreferenceField";
import TimeField from "../shared/TimeField";

const Step3Skills = () => {
  const { control, watch, setValue } = useFormContext();

  const department = watch("job.department");
  const selectedSkills = watch("skills.selectedSkills") ?? [];
  const availableSkills = skillsByDepartment[department] ?? [];
  const skillExperience = watch("skills.skillExperience") ?? {};
  const notes = watch("skills.notes") ?? "";

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
        <TimeField
          control={control}
          name="skills.workHoursStart"
          label="Preferred hours — start"
        />
        <TimeField
          control={control}
          name="skills.workHoursEnd"
          label="Preferred hours — end"
        />
      </div>
      {/* Remote Preference*/}
      <RemotePreferenceField
        control={control}
        remoteName="skills.remotePreference"
        approvalName="skills.managerApproved"
      />

      {/* Extra notes*/}
      <Controller
        name="skills.notes"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Extra notes ({notes.length}/500)
            </FieldLabel>
            <Textarea
              {...field}
              value={field.value ?? ""}
              id={field.name}
              rows={3}
              maxLength={500}
              placeholder="Anything else worth knowing before day one?"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default Step3Skills;
