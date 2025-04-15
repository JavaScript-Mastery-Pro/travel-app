import { Link, useLocation } from "react-router";

import { getFirstWord } from "~/lib/utils";
import {
  ChipListComponent,
  ChipsDirective,
  ChipDirective,
} from "@syncfusion/ej2-react-buttons";

const TripCard = ({
  id,
  name,
  location,
  imageUrl,
  tags,
  price,
}: TripCardProps) => {
  const path = useLocation();
  return (
    <Link
      to={path.pathname === "/" ? `/travel/${id}` : `/trips/${id}`}
      className="shadow-300 bg-white rounded-[20px] flex-col w-full relative"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-[160px] rounded-t-xl object-cover aspect-video"
      />
      <article className="flex flex-col gap-3 mt-4 pl-[18px] pr-3.5">
        <h2 className="text-sm md:text-lg font-semibold text-dark-100 line-clamp-2">
          {name}
        </h2>
        <figure className="flex items-center gap-2">
          <img
            src="/assets/icons/location-mark.svg"
            alt="location icon"
            className="size-4"
          />
          <figcaption className="text-xs md:text-sm font-normal text-gray-100">
            {location}
          </figcaption>
        </figure>
      </article>
      <div className="flex gap-2 mt-5 pl-[18px] pr-3.5 pb-5">
        <ChipListComponent id="travel-chip">
          <ChipsDirective>
            {tags.map((tag, index) => (
              <ChipDirective
                key={index}
                text={getFirstWord(tag)}
                cssClass={`${
                  index === 1
                    ? "!bg-pink-50 !text-pink-500"
                    : "!bg-success-50 !text-success-700"
                }`}
              />
            ))}
          </ChipsDirective>
        </ChipListComponent>
      </div>
      <article className="tripCard-pill">{price}</article>
    </Link>
  );
};

export default TripCard;
