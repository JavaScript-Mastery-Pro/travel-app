import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Link, type LoaderFunctionArgs } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import type { Route } from "./+types/payment-success";
import { LEFT_CONFETTI, RIGHT_CONFETTI } from "~/constants";

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
    confetti(LEFT_CONFETTI);
    confetti(RIGHT_CONFETTI);
  };

  return (
    <main className="payment-success wrapper">
      <section>
        <article>
          <img
            src="/assets/icons/check.svg"
            alt="check-circle"
            className="size-24"
          />
          <h1>Thank You & Weclome Aboard!</h1>

          <p>
            Your trip’s booked — can’t wait to have you on this adventure! 🌍️
            Get ready to explore & make memories.✨
          </p>

          <Link to={`/travel/${loaderData?.tripId}`} className="w-full">
            <ButtonComponent
              type="button"
              className="button-class !h-11 !w-full"
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

          <Link to="/" className="w-full">
            <ButtonComponent
              type="button"
              className="button-class-secondary !h-11 !w-full"
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
