import { Client, Account, Databases } from "appwrite";
import { appwriteConfig } from "~/appwrite/config";

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const database = new Databases(client);

export { client, account, database };
