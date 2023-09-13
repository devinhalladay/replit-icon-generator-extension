const SectionLabel = ({ number, label }: { number: number; label: string }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex min-w-[24px] min-h-[24px] w-[24px] h-[24px] bg-accentPrimaryDimmer rounded-md items-center justify-center text-[14px] font-medium shrink grow-0 leading-4 text-accentPrimaryStrongest">
        <span>{number}</span>
      </div>
      <p className="text-lg font-medium leading-4">{label}</p>
    </div>
  );
};

export default SectionLabel;
