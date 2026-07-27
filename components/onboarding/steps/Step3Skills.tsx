"use client";
import { useFormContext } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";

import SkillExperienceField from "./skills/SkillExperienceField";

import { skillsByDepartment } from "@/lib/mockData";
import PrimarySkillsField from "./skills/PrimarySkillsField";

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
    </FieldGroup>
  );
};

export default Step3Skills;
