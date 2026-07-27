"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type RemotePreferenceFieldProps<T extends FieldValues> = {
  control: Control<T>;
  remoteName: FieldPath<T>;
  approvalName: FieldPath<T>;
  threshold?: number;
  label?: string;
  approvalLabel?: string;
};

const RemotePreferenceField = <T extends FieldValues>({
  control,
  remoteName,
  approvalName,
  threshold = 50,
  label = "Remote work preference",
  approvalLabel = "Manager approved for >50% remote work",
}: RemotePreferenceFieldProps<T>) => {
  return (
    <Controller
      name={remoteName}
      control={control}
      render={({ field: remoteField }) => {
        const remoteValue = remoteField.value ?? 0;
        const showApproval = remoteValue > threshold;

        return (
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor={remoteField.name}>
                {label} — {remoteValue}%
              </FieldLabel>
              <Slider
                id={remoteField.name}
                value={[remoteValue]}
                onValueChange={(val: number | readonly number[]) => {
                  const next = Array.isArray(val) ? val[0] : val;
                  remoteField.onChange(next);
                }}
                min={0}
                max={100}
                step={5}
                className="w-full **:data-[slot=slider-range]:bg-indigo-600 **:data-[slot=slider-thumb]:border-indigo-600"
              />
            </Field>

            {showApproval && (
              <Controller
                name={approvalName}
                control={control}
                render={({ field: approvalField, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <Checkbox
                      id={approvalField.name}
                      checked={approvalField.value ?? false}
                      onCheckedChange={(val) =>
                        approvalField.onChange(val === true)
                      }
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel
                      htmlFor={approvalField.name}
                      className="font-normal"
                    >
                      {approvalLabel}
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
          </div>
        );
      }}
    />
  );
};

export default RemotePreferenceField;
