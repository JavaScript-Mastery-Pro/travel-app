import type { Route } from "./+types/sign-in";
import { loginWithGoogle } from "~/lib/auth";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In" },
    { name: "description", content: "Welcome to Travel App" },
  ];
}

export default function SignIn() {
  return (
    <main className="w-full h-screen flex bg-auth bg-cover bg-no-repeat">
      <section className="size-full glassmorphism flex-center px-6">
        {/* <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={loginWithGoogle}
        >
          Sign in with Google
        </button> */}
        <div className="flex bg-white flex-col border border-light-100 md:max-w-[510px] rounded-[20px] py-10 px-6 w-full">
          <header className="flex items-center gap-1.5 justify-center">
            <Link to="/">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="w-[30px] h-[30px]"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
          </header>
          <article className="mt-9 mb-[60px] flex flex-col gap-3">
            <h2 className="p-28-semibold text-dark-100 text-center">
              Start Your Travel Journey
            </h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to explore AI-generated itineraries, trending
              destinations, and much more
            </p>
          </article>
          <ButtonComponent
            type="button"
            iconCss="e-search-icon"
            className="!bg-primary-100 !py-2.5 !px-4 !rounded-lg !flex !items-center !justify-center gap-1.5 !border-2 !border-light-100 !shadow-none"
            onClick={loginWithGoogle}
          >
            <img
              src="/assets/icons/google.svg"
              alt="google"
              className="size-5"
            />
            <span className="p-18-semibold text-white">
              Sign in with Google
            </span>
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
}
