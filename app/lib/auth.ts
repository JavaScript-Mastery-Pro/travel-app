import { OAuthProvider } from "appwrite";
import { account } from "~/appwrite/config";

export const loginWithGoogle = () => {
  try {
    account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:5173",
      "http://localhost:5173/login"
    );
  } catch (error) {
    console.error("Error during OAuth2 session creation:", error);
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const getUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
