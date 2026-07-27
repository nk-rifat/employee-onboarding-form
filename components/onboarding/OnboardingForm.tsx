"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OnboardingHeader from "./OnboardingHeader";
import StepRail from "./StepRail";
import Step1Personal from "./steps/Step1Personal";
import { Step2JobDetails } from "./steps/Step2JobDetails";
import { transformOnboardingData } from "./config/transformFormData";
import OnboardingSuccess from "./OnboardingSuccess";

import {
  onboardingSchema,
  type OnboardingFormValues,
} from "./config/formSchema";

import { defaultValues } from "./config/defaultValues";
import OnboardingNavigation from "./config/OnboardingNavigation";
import Step3Skills from "./steps/Step3Skills";
import Step4Emergency from "./steps/Step4Emergency";
import Step5Review from "./steps/Step5Review";
import { useOnboardingSteps } from "./hooks/useOnboardingSteps";

const STEP_LABELS = [
  "Personal",
  "Job details",
  "Skills",
  "Emergency",
  "Review",
];

const OnboardingForm = () => {
  const {
    currentStep,
    completedSteps,
    goNext: nextStep,
    goBack: stepBack,
    resetSteps,
  } = useOnboardingSteps();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema) as Resolver<OnboardingFormValues>,
    mode: "onChange",
    defaultValues,
  });

  const {
    watch,
    trigger,
    handleSubmit,
    formState: { isDirty },
  } = form;

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  async function goNext() {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await trigger("personal");
        break;

      case 2:
        isValid = await trigger("job");
        break;

      case 3:
        isValid = await trigger("skills");
        break;

      case 4:
        isValid = await trigger("emergency");
        break;

      default:
        isValid = true;
    }

    if (!isValid) return;

    nextStep();
  }

  function onSubmit(data: OnboardingFormValues) {
    const payload = transformOnboardingData(data);

    console.log("Final submission payload:", payload);

    setSubmitted(true);
  }

  function renderStep(step: number) {
    switch (step) {
      case 1:
        return <Step1Personal />;
      case 2:
        return <Step2JobDetails />;
      case 3:
        return <Step3Skills />;
      case 4:
        return <Step4Emergency />;
      case 5:
        return <Step5Review />;
      default:
        return null;
    }
  }

  function startOver() {
    form.reset(defaultValues);
    resetSteps();
    setSubmitted(false);
  }

  const isLastStep = currentStep === STEP_LABELS.length;

  if (submitted) {
    return <OnboardingSuccess onStartOver={startOver} />;
  }

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

            <OnboardingNavigation
              currentStep={currentStep}
              isLastStep={isLastStep}
              onBack={stepBack}
              onNext={goNext}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default OnboardingForm;
