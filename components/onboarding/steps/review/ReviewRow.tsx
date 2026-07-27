type ReviewRowProps = {
  label: string;
  value: string | number | null | undefined;
};

const ReviewRow = ({ label, value }: ReviewRowProps) => {
  const display =
    value === null || value === undefined || value === "" ? "—" : value;

  return (
    <div className="flex justify-between border-b border-stone-100 py-2 text-sm last:border-0">
      <span className="text-stone-500">{label}</span>
      <span className="max-w-[60%] text-right font-medium text-stone-800">
        {display}
      </span>
    </div>
  );
};

export default ReviewRow;
