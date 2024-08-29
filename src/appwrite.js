import { Client, Databases, Account } from "appwrite";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66cb7c35000f04176383');

export const account = new Account(client);
export const databases = new Databases(client);