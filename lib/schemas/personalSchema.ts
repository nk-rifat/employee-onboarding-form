import z from "zod";
import { ageFromDob } from "../utils";

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

export const personalSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .refine((val) => val.split(/\s+/).length >= 2, {
      message: "Enter at least two words (first and last name).",
    }),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(phoneRegex, "Use the format +1-123-456-7890."),

  dob: z
    .string()
    .min(1, "Date of birth is required.")
    .refine((val) => {
      const age = ageFromDob(val);
      return age !== null && age >= 18;
    }, "Must be at least 18 years old."),

  profilePicture: z
    .instanceof(File)
    .nullable()
    .refine(
      (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
      {
        message: "Only JPG or PNG files are allowed.",
      },
    )
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "File must be 2MB or smaller.",
    }),
});
