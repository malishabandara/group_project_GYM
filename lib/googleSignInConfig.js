// GoogleSignInConfig.js
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// GoogleSignin.configure({
//   webClientId:
//     "323563589391-2gtk1um4gpupq9cvt758e35obfdqv19l.apps.googleusercontent.com", // From Google Developer Console
// });

import { Client, Account } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "668a3ce4003a62ae0963",
};

const client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectId);

const account = new Account(client);

export { account, client };
