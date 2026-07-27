import { useState } from "react";

const TOTAL_STEPS = 5;

export function useOnboardingSteps() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  function goNext() {
    setCompletedSteps((prev) => Array.from(new Set([...prev, currentStep])));

    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  }

  function goBack() {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  function resetSteps() {
    setCurrentStep(1);
    setCompletedSteps([]);
  }

  return {
    currentStep,
    completedSteps,
    goNext,
    goBack,
    resetSteps,
  };
}
