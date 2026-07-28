"use client";

import { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import ManagerCombobox from "../shared/ManagerCombobox";
import { departments, jobTypes } from "@/lib/schemas/jobSchema";
import { mockManagers } from "@/lib/mockData";
import DateField from "../shared/DateField";
import SelectField from "../shared/SelectField";

export function Step2JobDetails() {
  const { control, watch, setValue } = useFormContext();

  const department = watch("job.department");
  const jobType = watch("job.jobType");

  const filteredManagers = mockManagers.filter(
    (m) => m.department === department,
  );
  const previousDepartment = useRef(department);

  // Reset manager whenever department changes —
  useEffect(() => {
    if (
      previousDepartment.current &&
      previousDepartment.current !== department
    ) {
      setValue("job.managerId", "");
      setValue("skills.selectedSkills", []);
      setValue("skills.skillExperience", {});
    }

    previousDepartment.current = department;
  }, [department, setValue]);

  return (
    <FieldGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <SelectField
        control={control}
        name="job.department"
        label="Department"
        options={departments}
        placeholder="Select department"
      />

      <Controller
        name="job.position"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Position title</FieldLabel>
            <Input
              {...field}
              id={field.name}
              placeholder="Software Engineer II"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <DateField control={control} name="job.startDate" label="Start date">
        {department === "HR" ||
          (department === "Finance" && (
            <FieldDescription>
              Cannot fall on Friday or Saturday for this department.
            </FieldDescription>
          ))}
      </DateField>

      <Controller
        name="job.jobType"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Job type</FieldLabel>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex gap-4 pt-1"
            >
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <RadioGroupItem value={type} id={`jobType-${type}`} />
                  <FieldLabel
                    htmlFor={`jobType-${type}`}
                    className="font-normal"
                  >
                    {type}
                  </FieldLabel>
                </div>
              ))}
            </RadioGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {jobType === "Full-time" && (
        <Controller
          name="job.salaryAnnual"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Annual salary expectation ($)
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="number"
                placeholder="85000"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>$30,000 – $200,000</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}

      {(jobType === "Part-time" || jobType === "Contract") && (
        <Controller
          name="job.salaryHourly"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Hourly rate ($)</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="number"
                placeholder="95"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>$50 – $150 per hour</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}

      <ManagerCombobox
        control={control}
        name="job.managerId"
        label="Manager"
        managers={filteredManagers}
        disabled={!department}
      />
    </FieldGroup>
  );
}
