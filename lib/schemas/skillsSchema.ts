import { z } from "zod";

export const skillsSchema = z
  .object({
    selectedSkills: z.array(z.string()).min(3, "Choose at least 3 skills."),
    skillExperience: z.record(z.string(), z.string()),
    workHoursStart: z.string().min(1, "Start time is required."),
    workHoursEnd: z.string().min(1, "End time is required."),
    remotePreference: z.number().min(0).max(100),
    managerApproved: z.boolean(),
    notes: z.string().trim().max(500, "Max 500 characters.").optional(),
  })
  .superRefine((data, ctx) => {
    const skills = data.selectedSkills;
    // Every selected skill needs a valid time (years)
    skills.forEach((skill) => {
      const raw = data.skillExperience?.[skill];
      const value = Number(raw);
      if (raw === undefined || raw === "" || Number.isNaN(value) || value < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["skillExperience", skill],
          message: "Enter years of experience.",
        });
      }
    });

    // End time must be after start time
    if (
      data.workHoursStart &&
      data.workHoursEnd &&
      data.workHoursStart >= data.workHoursEnd
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["workHoursEnd"],
        message: "End time must be after start time.",
      });
    }

    // Manager approval required above 50% remote
    if (data.remotePreference > 50 && !data.managerApproved) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["managerApproved"],
        message: "Manager approval is required above 50% remote.",
      });
    }
  });

export type SkillsFormData = z.infer<typeof skillsSchema>;
