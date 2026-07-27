"use client";

import { Button } from "@/components/ui/button";

type OnboardingSuccessProps = {
  onStartOver: () => void;
};

const OnboardingSuccess = ({ onStartOver }: OnboardingSuccessProps) => {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-10 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl text-white">
        ✓
      </div>

      <h2 className="text-xl font-semibold text-emerald-900">
        Onboarding completed
      </h2>

      <p className="text-sm text-emerald-700">
        Employee information has been submitted successfully.
      </p>

      <Button variant="outline" onClick={onStartOver}>
        Start another onboarding
      </Button>
    </div>
  );
};

export default OnboardingSuccess;
