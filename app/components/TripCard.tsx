import { Link } from "react-router";
import Pill from "./Pill";
import { getFirstWord } from "~/lib/utils";

interface TripCardProps {
  tripName: string;
  location: string;
  imageUrl: string;
  tags: string[];
  id: string;
}

const TripCard = ({
  tripName,
  location,
  imageUrl,
  tags,
  id,
}: TripCardProps) => {
  return (
    <Link
      to={`trips/${id}`}
      className="shadow-300 bg-white rounded-[20px] flex-col px-[18px] py-5 max-w-[270px] w-full"
    >
      <img
        src={imageUrl}
        alt="image"
        className="w-full h-[160px] aspect-[7/4] rounded-xl"
      />
      <article className="flex flex-col gap-3 mt-4">
        <h2 className="text-sm md:text-lg font-semibold text-dark-100">
          {tripName}
        </h2>
        <figure className="flex items-center gap-2">
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="size-4"
          />
          <figcaption className="text-xs md:text-sm font-normal text-gray-100">
            {location}
          </figcaption>
        </figure>
      </article>
      <div className="flex gap-2 mt-5">
        {tags.map((tag, index) => (
          <Pill key={index} text={getFirstWord(tag)} />
        ))}
      </div>
    </Link>
  );
};

export default TripCard;
