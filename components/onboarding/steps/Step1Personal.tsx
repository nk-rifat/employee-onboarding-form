"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import PhoneField from "../shared/PhoneField";

const Step1Personal = () => {
  const { control } = useFormContext();

  return (
    <FieldGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Controller
        name="personal.fullName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Your full name"
              autoComplete="name"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="personal.email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="Your email"
              autoComplete="email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <PhoneField
        control={control}
        name="personal.phone"
        label="Phone Number"
      />

      <Controller
        name="personal.dob"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Date of birth</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="date"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="personal.profilePicture"
        control={control}
        render={({ field: { onChange, name }, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name}>Profile picture (optional)</FieldLabel>
            <Input
              id={name}
              name={name}
              type="file"
              accept="image/jpeg,image/png"
              aria-invalid={fieldState.invalid}
              onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            />
            <FieldDescription>JPG or PNG, max 2MB</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default Step1Personal;
