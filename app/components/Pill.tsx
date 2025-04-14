import { cn } from "~/lib/utils";

const Pill = ({ text, bgColor, textColor }: PillProps) => {
  return (
    <div
      className={cn(
        "flex-center px-5 py-2 rounded-[40px] w-fit",
        bgColor ? bgColor : "bg-success-50"
      )}
    >
      <h3
        className={cn(
          "text-xs font-medium",
          textColor ? textColor : "text-success-700"
        )}
      >
        {text}
      </h3>
    </div>
  );
};

export default Pill;
