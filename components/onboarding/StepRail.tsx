import { Check } from "lucide-react";

type StepStatus = "current" | "done" | "upcoming";

type StepRailProps = {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
  employeeName?: string;
};

function getInitials(name?: string) {
  if (!name) return "—";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function getStepStatus(
  stepNumber: number,
  currentStep: number,
  completedSteps: number[],
): StepStatus {
  if (stepNumber === currentStep) return "current";
  if (completedSteps.includes(stepNumber)) return "done";
  return "upcoming";
}

const StepRail = ({
  steps,
  currentStep,
  completedSteps,
  employeeName,
}: StepRailProps) => {
  return (
    <div className="flex w-full flex-col gap-1 sm:w-52 sm:shrink-0">
      <div className="mb-4 flex items-center gap-3 sm:flex-col sm:items-start">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-800">
          {getInitials(employeeName)}
        </div>
        <div>
          <p className="text-sm font-medium text-stone-900">
            {employeeName || "............."}
          </p>
          <p className="text-xs text-stone-400">Onboarding file</p>
        </div>
      </div>

      <ol className="flex gap-2 overflow-x-auto sm:flex-col sm:gap-0.5 sm:overflow-visible">
        {steps.map((name, index) => {
          const stepNumber = index + 1;
          const status = getStepStatus(stepNumber, currentStep, completedSteps);

          return (
            <li key={name} className="shrink-0 sm:shrink">
              <div
                className={
                  "flex items-center gap-2.5 rounded-md border-l-4 px-3 py-2 text-sm " +
                  (status === "current"
                    ? "border-indigo-600 bg-indigo-50 font-medium text-indigo-800"
                    : status === "done"
                      ? "border-emerald-500 text-emerald-700"
                      : "border-stone-200 text-stone-400")
                }
              >
                <span
                  className={
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold " +
                    (status === "current"
                      ? "bg-indigo-600 text-white"
                      : status === "done"
                        ? "bg-emerald-500 text-white"
                        : "bg-stone-200 text-stone-500")
                  }
                >
                  {status === "done" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    stepNumber
                  )}
                </span>
                <span className="whitespace-nowrap">{name}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default StepRail;
