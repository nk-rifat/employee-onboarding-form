"use client";

import { useFormContext } from "react-hook-form";
import { ageFromDob } from "@/lib/utils";
import type { OnboardingFormValues } from "../config/formSchema";
import ReviewSection from "./review/ReviewSection";
import ReviewRow from "./review/ReviewRow";

const Step5Review = () => {
  const { watch } = useFormContext<OnboardingFormValues>();
  const personal = watch("personal");
  const age = ageFromDob(personal.dob);

  return (
    <div className="flex flex-col gap-4">
      <ReviewSection title="Personal info">
        <ReviewRow label="Full name" value={personal.fullName} />
        <ReviewRow label="Email" value={personal.email} />
        <ReviewRow label="Phone" value={personal.phone} />
        <ReviewRow label="Date of birth" value={personal.dob} />
        <ReviewRow label="Age" value={age ?? "—"} />
      </ReviewSection>
    </div>
  );
};

export default Step5Review;
