import type { ReactNode } from "react";

type ReviewSectionProps = {
  title: string;
  onEdit: () => void;
  children: ReactNode;
};

const ReviewSection = ({ title, onEdit, children }: ReviewSectionProps) => {
  return (
    <div className="rounded-lg border border-stone-200 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium text-indigo-700 hover:underline"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
};

export default ReviewSection;
