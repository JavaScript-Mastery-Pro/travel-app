import { useNavigate } from "react-router";
import { loginWithGoogle } from "~/lib/auth";

export default function SignIn() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <button
        onClick={async () => {
          loginWithGoogle();
        }}
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded"
      >
        Sign in with google
      </button>
    </div>
  );
}
