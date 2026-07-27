import type { ReactNode } from "react";

type ReviewSectionProps = {
  title: string;
  children: ReactNode;
};

const ReviewSection = ({ title, children }: ReviewSectionProps) => {
  return (
    <div className="rounded-lg border border-stone-200 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default ReviewSection;
