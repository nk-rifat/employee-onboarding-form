"use client";

import { useFormContext } from "react-hook-form";
import { ageFromDob } from "@/lib/utils";
import type { OnboardingFormValues } from "../config/formSchema";
import ReviewSection from "./review/ReviewSection";
import ReviewRow from "./review/ReviewRow";
import { mockManagers } from "@/lib/mockData";

const Step5Review = () => {
  const { watch } = useFormContext<OnboardingFormValues>();
  const personal = watch("personal");
  const job = watch("job");
  const skills = watch("skills");
  const age = ageFromDob(personal.dob);

  const manager = mockManagers.find((m) => m.id === job.managerId);

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
    </div>
  );
};

export default Step5Review;
