import { useNavigate } from "react-router";
import { logoutUser } from "~/appwrite/auth";

const Logout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={async () => {
          await logoutUser();
          navigate("/sign-in");
        }}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded"
      >
        logout
      </button>
    </div>
  );
};

export default Logout;
