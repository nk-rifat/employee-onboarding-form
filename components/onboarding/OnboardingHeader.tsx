type OnboardingHeaderProps = {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
  completedCount: number;
};

const OnboardingHeader = ({
  currentStep,
  totalSteps,
  stepLabel,
  completedCount,
}: OnboardingHeaderProps) => {
  const progressPercent = (completedCount / totalSteps) * 100;

  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold text-stone-900">
        Employee onboarding
      </h1>
      <p className="text-sm text-stone-500">
        Step {currentStep} of {totalSteps} — {stepLabel}
      </p>
      <div className="mt-3 h-1.5 w-full rounded-full bg-stone-100">
        <div
          className="h-1.5 rounded-full bg-amber-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default OnboardingHeader;
