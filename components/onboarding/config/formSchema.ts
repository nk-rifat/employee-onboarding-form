import { z } from "zod";
import { personalSchema } from "@/lib/schemas/personalSchema";
import { jobSchema } from "@/lib/schemas/jobSchema";
import { skillsSchema } from "@/lib/schemas/skillsSchema";

export const onboardingSchema = z.object({
  personal: personalSchema,
  job: jobSchema,
  skills: skillsSchema,
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;