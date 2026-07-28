# Employee Onboarding Form

A 5-step employee onboarding wizard built with Next.js, React Hook Form, Zod, shadcn/ui, Tailwind CSS, and TypeScript.

## Live demo

[https://employee-onboarding-form-lkdec438h-rifats-projects-5da95cb3.vercel.app/](https://employee-onboarding-form-lkdec438h-rifats-projects-5da95cb3.vercel.app/)

## Tech stack

- **Next.js** (App Router)
- **React Hook Form** — single form instance shared across all 5 steps via `FormProvider` / `useFormContext`
- **Zod** — schema validation, including cross-field and cross-step rules
- **shadcn/ui** — Field, Input, Select, RadioGroup, Checkbox, Slider, Popover + Command (searchable combobox)
- **Tailwind CSS** — styling
- **TypeScript** — throughout, including generic, reusable field components

## How to run the project

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

> If `npm install` errors with an `ERESOLVE`/peer-dependency conflict, run `npm install --legacy-peer-deps` instead. This can happen because `@hookform/resolvers` lists several optional schema-library peers (Zod, Valibot, Yup) — this project only uses the Zod path, so the conflict is safe to bypass.

## Project structure

```
employee-onboarding-form/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
├── components/
│   ├── onboarding/
│   │   ├── OnboardingForm.tsx
│   │   ├── OnboardingHeader.tsx
│   │   ├── OnboardingSuccess.tsx
│   │   ├── StepRail.tsx
│   │   ├── config/
│   │   │   ├── defaultValues.ts
│   │   │   ├── formSchema.ts
│   │   │   ├── OnboardingNavigation.tsx
│   │   │   └── transformFormData.ts
│   │   ├── hooks/
│   │   │   ├── useFieldKeyboardNav.ts
│   │   │   └── useOnboardingSteps.ts
│   │   ├── shared/
│   │   │   ├── DateField.tsx
│   │   │   ├── ManagerCombobox.tsx
│   │   │   ├── NameField.tsx
│   │   │   ├── PhoneField.tsx
│   │   │   ├── SelectField.tsx
│   │   │   └── TimeField.tsx
│   │   └── steps/
│   │       ├── Step1Personal.tsx
│   │       ├── Step2JobDetails.tsx
│   │       ├── Step3Skills.tsx
│   │       ├── Step4Emergency.tsx
│   │       ├── Step5Review.tsx
│   │       ├── review/
│   │       │   ├── ReviewRow.tsx
│   │       │   └── ReviewSection.tsx
│   │       └── skills/
│   │           ├── PrimarySkillsField.tsx
│   │           ├── RemotePreferenceField.tsx
│   │           └── SkillExperienceField.tsx
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── mockData.ts
│   ├── utils.ts
│   └── schemas/
│       ├── emergencySchema.ts
│       ├── jobSchema.ts
│       ├── personalSchema.ts
│       └── skillsSchema.ts
└── public/
```

### What lives where

| Path                                                   | Purpose                                                                                        |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `app/page.tsx`                                         | Renders `<OnboardingForm />` — the entire app's entry point                                    |
| `components/onboarding/OnboardingForm.tsx`             | Orchestrator — owns the single `useForm()` instance, step state, submit handling, keyboard nav |
| `components/onboarding/OnboardingHeader.tsx`           | Title, "Step X of 5", progress bar                                                             |
| `components/onboarding/StepRail.tsx`                   | Left sidebar — avatar/photo, step list                                                         |
| `components/onboarding/OnboardingSuccess.tsx`          | Success screen shown after submit                                                              |
| `components/onboarding/config/formSchema.ts`           | Combined Zod schema + cross-step `superRefine` rules                                           |
| `components/onboarding/config/transformFormData.ts`    | Reshapes form data into the final submit payload                                               |
| `components/onboarding/hooks/`                         | `useOnboardingSteps` (step navigation), `useFieldKeyboardNav` (Enter-to-advance)               |
| `components/onboarding/shared/`                        | Field components reused **across multiple steps** — see table below                            |
| `components/onboarding/steps/skills/`, `steps/review/` | Components extracted for readability but used **within one step only**                         |
| `components/ui/`                                       | shadcn/ui primitives (Button, Select, Field, Slider, etc.)                                     |
| `lib/mockData.ts`                                      | `mockManagers`, `skillsByDepartment`                                                           |
| `lib/utils.ts`                                         | `ageFromDob`, `isFridayOrSaturday`, `cn`                                                       |
| `lib/schemas/`                                         | One Zod schema per step                                                                        |

## How complex logic was handled

**One shared form, five views into it.** `useForm()` is called exactly once, in `OnboardingForm`, wrapped in `FormProvider`. Every step component reads/writes into that same instance via `useFormContext()` — so data survives moving back and forth between steps without any extra "save on leave" code, and the review step (Step 5) simply reads the same live data.

**Step-local vs. cross-step validation.** Each step has its own Zod schema (`personalSchema`, `jobSchema`, etc.) for rules that only need that step's own fields — including same-step cross-field rules like job type → salary range, and department → weekend restriction (both live in `jobSchema` via `superRefine`, since both fields are in Step 2). The **guardian-contact rule** is different: it needs age (Step 1) _and_ guardian fields (Step 4) at once, so no single step schema can express it. That rule lives in the combined `formSchema.ts`'s top-level `superRefine`, which is the only place with access to the whole form.

**Department-driven cascading resets.** Changing department in Step 2 must clear any previously-selected manager _and_ previously-selected skills (Step 3), since both lists are filtered by department. This is handled with a guarded `useEffect` (using a `useRef` to track the previous department) that only resets those fields when department genuinely changes from one real value to another — not on initial mount.

**Conditional fields.** Guardian contact (age < 21), the salary field type (Full-time → annual, Contract/Part-time → hourly), and "Manager approved" (remote % > 50) are all handled the same way: read the controlling value via `watch()`, conditionally render the dependent field(s), and let the schema enforce required-ness so the rule holds even if someone tries to submit without ever seeing the field render.

**Keyboard navigation.** Tab and native Select/RadioGroup/Checkbox keyboard behavior come for free from shadcn/Radix. Enter-to-advance (moving to the next field, or to Next/Submit on the last field of a step) is custom, extracted into `useFieldKeyboardNav` — a small hook that walks the DOM's focusable elements in order rather than hardcoding field names, so it works unchanged across all 5 steps.

**Slider + form state.** The remote-preference slider uses local component state for the visible drag position (`onValueChange`) and only commits to the form (`onValueCommitted`) once the user releases — avoiding a controlled/uncontrolled fight between Radix's internal drag gesture and React Hook Form's validation re-render on every pixel of movement.

## Assumptions made

- **Part-time salary range.** The brief only specifies a salary range for Contract ($50–150/hr). Part-time is assumed to use the same hourly range, since no separate range was given.
- **Auto-save** is implemented as in-memory React Hook Form state (not `localStorage`), per the explicit requirement — data is lost on a hard page refresh, by design.
