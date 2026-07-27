import { z } from "zod";
import {
  isFridayOrSaturday,
  isMoreThanDaysAway,
  isPastDate,
} from "@/lib/utils";

export const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
] as const;

export const jobTypes = ["Full-time", "Part-time", "Contract"] as const;

export const jobSchema = z
  .object({
    department: z
      .union([z.literal(""), z.enum(departments)])
      .refine((value) => value !== "", {
        message: "Select a department.",
      }),

    position: z
      .string()
      .trim()
      .min(3, "Position title must be at least 3 characters."),

    startDate: z.string().min(1, "Start date is required."),

    jobType: z
      .union([z.literal(""), z.enum(jobTypes)])
      .refine((value) => value !== "", {
        message: "Select a job type.",
      }),

    salaryAnnual: z.string().optional(),

    salaryHourly: z.string().optional(),

    managerId: z.string().min(1, "Select a manager."),
  })
  .superRefine((data, ctx) => {
    // Start Date Validation
    if (isPastDate(data.startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "Start date cannot be in the past.",
      });
    }

    if (isMoreThanDaysAway(data.startDate, 90)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "Start date cannot be more than 90 days in the future.",
      });
    }

    if (
      (data.department === "HR" || data.department === "Finance") &&
      isFridayOrSaturday(data.startDate)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "HR and Finance employees cannot start on Friday or Saturday.",
      });
    }

    // Salary Validation

    if (data.jobType === "Full-time") {
      if (!data.salaryAnnual) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salaryAnnual"],
          message: "Annual salary is required.",
        });
      } else {
        const annualSalary = Number(data.salaryAnnual);

        if (
          Number.isNaN(annualSalary) ||
          annualSalary < 30000 ||
          annualSalary > 200000
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["salaryAnnual"],
            message: "Annual salary must be between $30,000 and $200,000.",
          });
        }
      }
    }

    if (data.jobType === "Part-time" || data.jobType === "Contract") {
      if (!data.salaryHourly) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salaryHourly"],
          message: "Hourly rate is required.",
        });
      } else {
        const hourlyRate = Number(data.salaryHourly);

        if (Number.isNaN(hourlyRate) || hourlyRate < 50 || hourlyRate > 150) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["salaryHourly"],
            message: "Hourly rate must be between $50 and $150.",
          });
        }
      }
    }
  });

export type JobFormData = z.infer<typeof jobSchema>;
