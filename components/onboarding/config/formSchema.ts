import { z } from "zod";
import { personalSchema } from "@/lib/schemas/personalSchema";
import { jobSchema } from "@/lib/schemas/jobSchema";
import { skillsSchema } from "@/lib/schemas/skillsSchema";
import { emergencySchema } from "@/lib/schemas/emergencySchema";
import { ageFromDob } from "@/lib/utils";

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

export const onboardingSchema = z
  .object({
    personal: personalSchema,
    job: jobSchema,
    skills: skillsSchema,
    emergency: emergencySchema,
  })
  .superRefine((data, ctx) => {
    const age = ageFromDob(data.personal.dob);

    if (age !== null && age < 21) {
      if (!data.emergency.guardianName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["emergency", "guardianName"],
          message: "Guardian name is required under age 21.",
        });
      }
      if (!data.emergency.guardianPhone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["emergency", "guardianPhone"],
          message: "Guardian phone is required under age 21.",
        });
      } else if (!phoneRegex.test(data.emergency.guardianPhone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["emergency", "guardianPhone"],
          message: "Use the format +1-123-456-7890.",
        });
      }
    }
  });

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
