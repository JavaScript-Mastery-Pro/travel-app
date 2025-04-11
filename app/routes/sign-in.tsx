import type { Route } from "./+types/sign-in";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Link, redirect } from "react-router";
import { loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In" },
    { name: "description", content: "Sign in to Explore the app" },
  ];
}

export async function clientLoader() {
  try {
    const user = await account.get();
    if (user.$id) return redirect("/");
  } catch (error) {
    console.error("Error fetching user:", error);
  }
  return null;
}

const SignIn = () => {
  const handleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <main className="w-full h-screen flex bg-auth bg-cover bg-no-repeat">
      <section className="size-full glassmorphism flex-center px-6">
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
          <article className="mt-9 mb-[30px] flex flex-col gap-3">
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
            className="buttonClass !h-11 !w-full"
            onClick={handleSignIn}
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
};

export default SignIn;
