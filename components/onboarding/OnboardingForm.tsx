"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import OnboardingHeader from "./OnboardingHeader";
import StepRail from "./StepRail";
import Step1Personal from "./steps/Step1Personal";
import { Button } from "@/components/ui/button";
import { personalSchema } from "@/lib/schemas/personalSchema";

const STEP_LABELS = [
  "Personal",
  "Job details",
  "Skills",
  "Emergency",
  "Review",
];

// Temporary — expands to a combined schema as Steps 2-5 are added
const currentSchema = z.object({
  personal: personalSchema,
});

type OnboardingFormValues = z.infer<typeof currentSchema>;

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(currentSchema),
    mode: "onChange",
    defaultValues: {
      personal: {
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        profilePicture: null,
      },
    },
  });

  const { watch, trigger, handleSubmit } = form;

  async function goNext() {
    const isValid = await trigger("personal");
    if (!isValid) return;

    setCompletedSteps((prev) => Array.from(new Set([...prev, currentStep])));
    setCurrentStep((prev) => Math.min(prev + 1, STEP_LABELS.length));
  }

  function goBack() {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  function onSubmit(data: OnboardingFormValues) {
    console.log("Final submission:", data);
  }

  function renderStep(step: number) {
    switch (step) {
      case 1:
        return <Step1Personal />;
      // case 2: return <Step2JobDetails />;
      // case 3: return <Step3Skills />;
      // case 4: return <Step4Emergency />;
      // case 5: return <Step5Review />;
      default:
        return null;
    }
  }

  const isLastStep = currentStep === STEP_LABELS.length;

  return (
    <FormProvider {...form}>
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
            employeeName={watch("personal.fullName")}
          />

          <div className="min-w-0 flex-1">
            <form
              id="onboarding-form"
              onSubmit={
                isLastStep ? handleSubmit(onSubmit) : (e) => e.preventDefault()
              }
            >
              {renderStep(currentStep)}
            </form>

            <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-5">
              <Button
                variant="outline"
                onClick={goBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>

              {isLastStep ? (
                <Button type="submit" form="onboarding-form">
                  Submit
                </Button>
              ) : (
                <Button type="button" onClick={goNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default OnboardingForm;
