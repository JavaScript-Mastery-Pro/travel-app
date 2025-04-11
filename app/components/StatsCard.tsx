import { calculateTrendPercentage } from "~/lib/utils";

const StatsCard = ({
  headerTitle,
  total,
  lastMonthCount,
  thisMonthCount,
}: StatsCardType) => {
  const { trend, percentage } = calculateTrendPercentage(
    thisMonthCount,
    lastMonthCount
  );
  const isDecrement = trend === "decrement";

  return (
    <article className="p-6 flex flex-col gap-6 bg-white shadow-400 rounded-20 text-dark-100">
      <h1 className="text-base font-medium">{headerTitle}</h1>
      <div className="flex flex-row md:flex-col-reverse xl:flex-row xl:items-center gap-3 justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{total}</h2>
          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              <img
                src={`/assets/icons/${isDecrement ? "arrow-down-red.svg" : "arrow-up-green.svg"}`}
                className="size-5"
                alt="directional arrow"
              />
              <figcaption
                className={`text-sm font-medium ${isDecrement ? "text-red-500" : "text-success-700"}`}
              >
                {Math.round(percentage)}%
              </figcaption>
            </figure>
            <p className="text-sm font-medium text-gray-100 truncate">
              vs last month
            </p>
          </div>
        </div>
        <img
          src={`/assets/icons/${isDecrement ? "decrement.svg" : "increment.svg"}`}
          className="xl:w-32 w-full h-full md:h-32 xl:h-full"
          alt="trend graph"
        />
      </div>
    </article>
  );
};

export default StatsCard;
