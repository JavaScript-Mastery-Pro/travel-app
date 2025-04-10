import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Link } from "react-router";

interface HeaderProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string;
}

const Header = ({ title, description, ctaText, ctaUrl }: HeaderProps) => {
  return (
    <header className="flex flex-col gap-5 md:flex-row justify-between w-full">
      <article className="flex flex-col gap-3.5 w-full">
        <h1 className="text-xl md:text-2xl font-semibold text-dark-100">
          {title}
        </h1>
        <p className="text-gray-100 text-sm font-normal md:text-lg">
          {description}
        </p>
      </article>
      {ctaText && ctaUrl && (
        <Link to={ctaUrl}>
          <ButtonComponent
            type="button"
            className="buttonClass !h-11 !w-full md:!w-[240px]"
          >
            <img src="/assets/icons/plus.svg" alt="google" className="size-5" />
            <span className="p-16-semibold text-white ">{ctaText}</span>
          </ButtonComponent>
        </Link>
      )}
    </header>
  );
};

export default Header;
