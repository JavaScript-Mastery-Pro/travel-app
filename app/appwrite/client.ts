import { Client, Account, Databases, Storage } from "appwrite";
import { appwriteConfig } from "~/appwrite/config";

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage };
