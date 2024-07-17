import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.laka.FlexFlow",
  projectId: "668a3ce4003a62ae0963",
  databaseId: "668a401b0024a8004c47",
  userCollectionId: "668a4044000e366b0c37",
  storageId: "668a419c0019dc8fbd51",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, firstName, lastName) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      firstName,
      lastName
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials();

    const result1 = await account.deleteSession("current");

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        firstName,
        lastName,
        avatar: avatarUrl,
      }
    );
    const result2 = await account.deleteSession("current");
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
