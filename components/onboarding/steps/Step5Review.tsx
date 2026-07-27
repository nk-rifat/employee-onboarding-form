"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ageFromDob } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import type { OnboardingFormValues } from "../config/formSchema";
import ReviewSection from "./review/ReviewSection";
import ReviewRow from "./review/ReviewRow";
import { mockManagers } from "@/lib/mockData";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const Step5Review = () => {
  const { control, watch } = useFormContext<OnboardingFormValues>();
  const personal = watch("personal");
  const job = watch("job");
  const skills = watch("skills");
  const emergency = watch("emergency");
  const age = ageFromDob(personal.dob);

  const manager = mockManagers.find((m) => m.id === job.managerId);
  const isUnder21 = age !== null && age < 21;

  const compensation =
    job.jobType === "Full-time"
      ? job.salaryAnnual
        ? `$${Number(job.salaryAnnual).toLocaleString()} / year`
        : "—"
      : job.salaryHourly
        ? `$${Number(job.salaryHourly).toLocaleString()} / hour`
        : "—";

  return (
    <div className="flex flex-col gap-4">
      <ReviewSection title="Personal info">
        <ReviewRow label="Full name" value={personal.fullName} />
        <ReviewRow label="Email" value={personal.email} />
        <ReviewRow label="Phone" value={personal.phone} />
        <ReviewRow label="Date of birth" value={personal.dob} />
        <ReviewRow label="Age" value={age ?? "—"} />
      </ReviewSection>

      <ReviewSection title="Job details">
        <ReviewRow label="Department" value={job.department} />
        <ReviewRow label="Position" value={job.position} />
        <ReviewRow label="Start date" value={job.startDate} />
        <ReviewRow label="Job type" value={job.jobType} />
        <ReviewRow label="Compensation" value={compensation} />
        <ReviewRow label="Manager" value={manager?.name} />
      </ReviewSection>

      <ReviewSection title="Skills & preferences">
        <ReviewRow label="Skills" value={skills.selectedSkills.join(", ")} />
        <ReviewRow
          label="Preferred hours"
          value={
            skills.workHoursStart && skills.workHoursEnd
              ? `${skills.workHoursStart} – ${skills.workHoursEnd}`
              : "—"
          }
        />
        <ReviewRow
          label="Remote preference"
          value={`${skills.remotePreference}%`}
        />
        {skills.remotePreference > 50 && (
          <ReviewRow
            label="Manager approved"
            value={skills.managerApproved ? "Yes" : "No"}
          />
        )}
        <ReviewRow label="Notes" value={skills.notes} />
      </ReviewSection>

      <ReviewSection title="Emergency contact">
        <ReviewRow label="Name" value={emergency.contactName} />
        <ReviewRow label="Relationship" value={emergency.relationship} />
        <ReviewRow label="Phone" value={emergency.phone} />
        {isUnder21 && (
          <>
            <ReviewRow label="Guardian name" value={emergency.guardianName} />
            <ReviewRow label="Guardian phone" value={emergency.guardianPhone} />
          </>
        )}
      </ReviewSection>

      <Controller
        name="confirm"
        control={control}
        render={({ field, fieldState }) => (
          <Field orientation="horizontal" data-invalid={fieldState.invalid}>
            <Checkbox
              id={field.name}
              checked={field.value ?? false}
              onCheckedChange={(val) => field.onChange(val === true)}
              aria-invalid={fieldState.invalid}
            />
            <FieldLabel htmlFor={field.name} className="font-normal">
              I confirm all information is correct.
            </FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
};

export default Step5Review;
