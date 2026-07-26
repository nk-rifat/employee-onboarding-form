"use client";
import { useState } from "react";
import OnboardingHeader from "./OnboardingHeader";
import StepRail from "./StepRail";
import { Step1Personal } from "./steps/Step1Personal";

const STEP_LABELS = [
  "Personal",
  "Job details",
  "Skills",
  "Emergency",
  "Review",
];

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  return (
    <div>
      <div className="mx-auto max-w-4xl rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <OnboardingHeader
          currentStep={currentStep}
          completedCount={completedSteps.length}
          totalSteps={STEP_LABELS.length}
          stepLabel={STEP_LABELS[currentStep - 1]}
        />

        <div className="flex flex-col gap-8 sm:flex-row">
          <StepRail
            currentStep={currentStep}
            completedSteps={completedSteps}
            steps={STEP_LABELS}
            employeeName=""
          />

          <div className="min-w-0 flex-1">
            {/* form content goes here later */}
            <Step1Personal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
