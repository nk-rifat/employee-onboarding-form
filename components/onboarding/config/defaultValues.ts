import type { OnboardingFormValues } from "./formSchema";

export const defaultValues: OnboardingFormValues = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    profilePicture: null,
  },
  job: {
    department: "",
    position: "",
    startDate: "",
    jobType: "",
    salaryAnnual: "",
    salaryHourly: "",
    managerId: "",
  },
  skills: {
    selectedSkills: [],
    skillExperience: {},
    workHoursStart: "",
    workHoursEnd: "",
    remotePreference: 0,
    managerApproved: false,
    notes: "",
  },
  emergency: {
    contactName: "",
    relationship:
      undefined as unknown as OnboardingFormValues["emergency"]["relationship"],
    phone: "",
    guardianName: "",
    guardianPhone: "",
  },
};
