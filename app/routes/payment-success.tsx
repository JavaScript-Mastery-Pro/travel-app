import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Link, type LoaderFunctionArgs } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import type { Route } from "./+types/payment-success";

export function meta() {
  return [
    { title: "Payment Success" },
    { name: "description", content: "Payment Success" },
  ];
}

export async function loader({ params }: LoaderFunctionArgs) {
  return params;
}

const PaymentSuccess = ({ loaderData }: Route.ComponentProps) => {
  useEffect(() => {
    triggerConfetti();
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 200, // Number of confetti pieces
      angle: 45, // Direction of the confetti burst (90 degrees is top)
      spread: 60, // Spread of the confetti burst
      origin: { x: 0, y: 1 }, // Center of the screen
      colors: ["#ff0", "#ff7f00", "#ff0044", "#4c94f4", "#f4f4f4"], // Confetti colors
      decay: 0.95, // Gravity decay of the confetti
    });
    confetti({
      particleCount: 200,
      angle: 135,
      spread: 60,
      origin: { x: 1, y: 1 },
      colors: ["#ff0", "#ff7f00", "#ff0044", "#4c94f4", "#f4f4f4"],
      decay: 0.95,
    });
  };

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper items-center justify-center h-screen">
      <section className="flex flex-col gap-5 justify-between w-full items-center">
        <article className="flex flex-col gap-3.5 w-full items-center justify-center md:max-w-[488px]">
          <img
            src="/assets/icons/check.svg"
            alt="check-circle"
            className="size-24"
          />
          <h1 className="text-xl md:text-3xl font-semibold text-dark-100">
            Thank You & Weclome Aboard!
          </h1>
          <p className="text-gray-100 text-sm font-normal md:text-lg text-center">
            Your trip’s booked — can’t wait to have you on this adventure! 🌍️
            Get ready to explore & make memories.✨
          </p>
          <Link to={`/travel/${loaderData?.tripId}`} className="w-full">
            <ButtonComponent
              type="button"
              className="buttonClass !h-11 !w-full"
            >
              <img
                src="/assets/icons/itinerary-button.svg"
                alt="google"
                className="size-5"
              />
              <span className="p-16-semibold text-white ">
                View trip details
              </span>
            </ButtonComponent>
          </Link>
          <Link to={`/`} className="w-full">
            <ButtonComponent
              type="button"
              className="buttonClass-secondary !h-11 !w-full"
            >
              <img
                src="/assets/icons/arrow-left.svg"
                alt="google"
                className="size-5"
              />
              <span className="p-16-semibold">Return to homepage</span>
            </ButtonComponent>
          </Link>
        </article>
      </section>
    </main>
  );
};

export default PaymentSuccess;
