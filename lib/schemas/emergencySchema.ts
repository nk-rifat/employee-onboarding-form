import { z } from "zod";

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

export const relationshipOptions = [
  "Parent",
  "Sibling",
  "Spouse",
  "Friend",
  "Other relative",
] as const;

export const emergencySchema = z.object({
  contactName: z
    .string()
    .trim()
    .min(3, "Must be at least 3 characters.")
    .refine((val) => /^[a-zA-Z\s'-]+$/.test(val), {
      message: "Position title can only contain letters.",
    }),
  relationship: z
    .union([z.literal(""), z.enum(relationshipOptions)])
    .refine((val) => val !== "", {
      message: "Select a relationship.",
    }),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(phoneRegex, "Use the format +1-123-456-7890."),
  guardianName: z.string().trim().optional().default(""),
  guardianPhone: z.string().trim().optional().default(""),
});

export type EmergencyFormData = z.infer<typeof emergencySchema>;
