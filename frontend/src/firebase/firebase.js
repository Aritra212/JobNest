import { initializeApp } from "firebase/app";
import conf from "../conf/conf.js";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getStorage } from "firebase/storage";

// firebase configuration
const app = initializeApp({
  apiKey: conf.appApi,
  authDomain: conf.authDomain,
  projectId: conf.projectId,
  storageBucket: conf.bucketId,
  messagingSenderId: conf.messageSenderId,
  appId: conf.appId,
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage();
auth.useDeviceLanguage();

export { app, auth, storage, RecaptchaVerifier };
