const Pill = ({ text, bgColor, textColor }: PillProps) => {
  return (
    <div
      className={`flex-center px-5 py-2 rounded-[40px] w-fit ${bgColor ? bgColor : "bg-success-50"}`}
    >
      <h3
        className={`text-xs font-medium ${textColor ? textColor : "text-success-700"}`}
      >
        {text}
      </h3>
    </div>
  );
};

export default Pill;
