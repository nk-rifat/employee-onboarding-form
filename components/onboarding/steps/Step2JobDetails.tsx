"use client";

import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function Step2JobDetails() {
  const { control, watch, setValue } = useFormContext();

  const department = watch("job.department");
  const jobType = watch("job.jobType");

  const filteredManagers = mockManagers.filter(
    (m) => m.department === department,
  );

  // Reset manager whenever department changes — 
  useEffect(() => {
    setValue("job.managerId", "");
  }, [department, setValue]);

  return (
    <FieldGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Controller
        name="job.department"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Department</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
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

      <Controller
        name="job.startDate"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Start date</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="date"
              aria-invalid={fieldState.invalid}
            />
            {(department === "HR" || department === "Finance") &&
              !fieldState.invalid && (
                <FieldDescription>
                  Cannot fall on Friday or Saturday for this department.
                </FieldDescription>
              )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

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
