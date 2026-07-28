import { useCallback } from "react";

type UseFieldKeyboardNavOptions = {
  onAdvance: () => void;
};

export function useFieldKeyboardNav({ onAdvance }: UseFieldKeyboardNavOptions) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      const target = e.target as HTMLElement;
      const isTextarea = target.tagName === "TEXTAREA";

      if (e.key !== "Enter" || isTextarea) return;

      e.preventDefault();

      const focusable = Array.from(
        e.currentTarget.querySelectorAll<HTMLElement>(
          "input, select, textarea, button, [role='combobox'], [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((el) => !el.hasAttribute("disabled"));

      const currentIndex = focusable.indexOf(target);
      const next = focusable[currentIndex + 1];

      if (next) {
        next.focus();
        return;
      }

      onAdvance();
    },
    [onAdvance],
  );

  return { handleKeyDown };
}
