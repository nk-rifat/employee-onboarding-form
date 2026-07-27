import type { OnboardingFormValues } from "./formSchema";
import { ageFromDob } from "@/lib/utils";
import { mockManagers } from "@/lib/mockData";

export function transformOnboardingData(data: OnboardingFormValues) {
  const manager = mockManagers.find((m) => m.id === data.job.managerId);

  const age = ageFromDob(data.personal.dob);

  return {
    personalInfo: {
      fullName: data.personal.fullName,
      email: data.personal.email,
      phone: data.personal.phone,
      dateOfBirth: data.personal.dob,
      age,
    },

    jobDetails: {
      department: data.job.department,
      position: data.job.position,
      startDate: data.job.startDate,
      jobType: data.job.jobType,

      manager: manager ?? null,

      compensation:
        data.job.jobType === "Full-time"
          ? {
              type: "annual",
              amount: Number(data.job.salaryAnnual),
            }
          : {
              type: "hourly",
              amount: Number(data.job.salaryHourly),
            },
    },

    skillsAndPreferences: {
      skills: data.skills.selectedSkills.map((skill) => ({
        name: skill,
        yearsExperience: Number(data.skills.skillExperience[skill] ?? 0),
      })),

      workingHours: {
        start: data.skills.workHoursStart,
        end: data.skills.workHoursEnd,
      },

      remotePreferencePercent: data.skills.remotePreference,

      managerApproved:
        data.skills.remotePreference > 50 ? data.skills.managerApproved : null,

      notes: data.skills.notes,
    },

    emergencyContact: {
      name: data.emergency.contactName,
      relationship: data.emergency.relationship,
      phone: data.emergency.phone,

      guardian:
        age !== null && age < 21
          ? {
              name: data.emergency.guardianName,
              phone: data.emergency.guardianPhone,
            }
          : null,
    },

    submittedAt: new Date().toISOString(),
  };
}
