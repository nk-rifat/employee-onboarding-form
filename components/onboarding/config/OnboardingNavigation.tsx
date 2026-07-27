"use client";

import { Button } from "@/components/ui/button";

type OnboardingNavigationProps = {
  currentStep: number;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
};

export default function OnboardingNavigation({
  currentStep,
  isLastStep,
  onBack,
  onNext,
}: OnboardingNavigationProps) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-5">
      <Button variant="outline" onClick={onBack} disabled={currentStep === 1}>
        Back
      </Button>

      {isLastStep ? (
        <Button type="submit" form="onboarding-form">
          Submit
        </Button>
      ) : (
        <Button type="button" onClick={onNext}>
          Next
        </Button>
      )}
    </div>
  );
}
