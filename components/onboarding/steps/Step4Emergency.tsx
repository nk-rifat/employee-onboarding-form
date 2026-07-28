import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import PhoneField from "../shared/PhoneField";
import { relationshipOptions } from "@/lib/schemas/emergencySchema";
import { ageFromDob } from "@/lib/utils";
import NameField from "../shared/NameField";

const Step4Emergency = () => {
  const { control, watch } = useFormContext();

  const dob = watch("personal.dob");
  const age = ageFromDob(dob);
  const needsGuardian = age !== null && age < 21;

  return (
    <FieldGroup className="gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <NameField
          control={control}
          name="emergency.contactName"
          label="Contact name"
          placeholder="Name"
        />

        <Controller
          name="emergency.relationship"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Relationship</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <PhoneField
          control={control}
          name="emergency.phone"
          label="Phone number"
        />
      </div>

      {needsGuardian && (
        <>
          <div className="rounded-md border border-indigo-200 bg-indigo-50 p-4">
            <p className="text-sm text-indigo-800">
              Since the employee is under 21, a guardian contact is required.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <NameField
              control={control}
              name="emergency.guardianName"
              label="Guardian name"
              placeholder="Guardian name"
              rules={{
                validate: (value: string) => {
                  if (!needsGuardian) return true;
                  return value.trim()
                    ? true
                    : "Guardian name is required under age 21.";
                },
              }}
            />

            <PhoneField
              control={control}
              name="emergency.guardianPhone"
              label="Guardian phone"
              rules={{
                validate: (value) => {
                  if (!needsGuardian) return true;

                  if (!value.trim()) {
                    return "Guardian phone is required under age 21.";
                  }

                  return /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/.test(value)
                    ? true
                    : "Use the format +1-123-456-7890.";
                },
              }}
            />
          </div>
        </>
      )}
    </FieldGroup>
  );
};

export default Step4Emergency;
