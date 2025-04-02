import { ID, OAuthProvider, Query } from "appwrite";
import { account, database } from "~/appwrite/client";
import { appwriteConfig } from "~/appwrite/config";
import { adminClient } from "./server";

export const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) {
      console.error("User not found");
      return null;
    }
    const session = await account.getSession("current");
    const accessToken = session?.providerAccessToken;
    if (!accessToken) {
      console.error("Access token not found");
    }
    const profilePicture = await getGooglePicture(accessToken);

    const { databases } = await adminClient();
    const userExists = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", user.$id)]
    );

    if (userExists.total === 0) {
      const createdUser = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: user.$id,
          email: user.email,
          name: user.name,
          imageUrl: profilePicture ?? null,
        }
      );
      return createdUser;
    }
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

const getGooglePicture = async (accessToken: string) => {
  if (!accessToken) return null;
  try {
    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Google profile picture");
    }
    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].url;
    } else {
      return null;
    }
  } catch (error) {}
};

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/`,
      `${window.location.origin}/404`
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
