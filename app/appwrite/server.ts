import { Account, Client, Databases, Users } from "node-appwrite";
import { appwriteConfig } from "./config";

export const adminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

  return {
    get databases() {
      return new Databases(client);
    },
    get users() {
      return new Users(client);
    },
    get account() {
      return new Account(client);
    },
  };
};
