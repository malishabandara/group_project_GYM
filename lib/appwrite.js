import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";
import { router } from "expo-router";

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

export const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, firstName, lastName) => {
  try {
    // Create a new user account
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      firstName,
      lastName
    );

    if (!newAccount) throw new Error("Failed to create user account");

    // Send a verification email to the user
    await account.createVerification(config.endpoint);

    const avatarUrl = avatars.getInitials();

    //const result1 = await account.deleteSession("current");

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
    throw new Error(error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    // Create a new session for the user with email and password
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Function to verify the user with OTP code
export const verifyUser = async (userId, secret) => {
  try {
    const verification = await account.updateVerification(userId, secret);

    return verification;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Function to authenticate the user before login
export const authenticateUser = async (email, password, userId, secret) => {
  try {
    // Verify the user with OTP code
    await verifyUser(userId, secret);

    // Authenticate the user by signing in
    const session = await signIn(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
