import { auth, storage } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPhoneNumber,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import conf from "../conf/conf";
import { detect } from "detect-browser";

export class AuthService {
  account;
  storage;
  userData = null;

  constructor() {
    this.account = auth;
    this.googleProvider = new GoogleAuthProvider();
    this.storage = storage;
  }

  // createAccount function
  async createAccount({ email, password, name }) {
    try {
      await createUserWithEmailAndPassword(this.account, email, password);

      // update profile
      await updateProfile(this.account.currentUser, {
        displayName: name,
      });

      const userAccount = this.account.currentUser;
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Firebase serive :: createAccount :: error", error);
    }
  }

  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(this.account, this.googleProvider);
      const user = result.user;
      console.log("Google Sign-In successful:", user);
      return user;
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      throw error;
    }
  }

  // Phone authentication
  async signUpWithPhone(phoneNumber, appVerifier) {
    // try {
    //   const confirmationResult = await signInWithPhoneNumber(
    //     this.account,
    //     phoneNumber,
    //     appVerifier
    //   );
    //   console.log("3");
    //   return confirmationResult; // You need to use this confirmationResult to verify the code sent to the user
    // } catch (error) {
    //   console.log("Firebase service :: signUpWithPhone :: error", error);
    //   throw error;
    // }
    signInWithPhoneNumber(this.account, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Verify phone number OTP
  async verifyPhoneNumber(confirmationResult, verificationCode) {
    try {
      const result = await confirmationResult.confirm(verificationCode);
      this.userData = {
        name: result.user.displayName,
        phoneNumber: result.user.phoneNumber,
        id: result.user.uid,
        isAdmin: false,
      };
      return this.userData;
    } catch (error) {
      console.log("Firebase service :: verifyPhoneNumber :: error", error);
      throw error;
    }
  }

  // login function
  async login({ email, password }) {
    try {
      return signInWithEmailAndPassword(this.account, email, password);
    } catch (error) {
      console.log("Firebase serivce :: login :: error", error);
    }
  }

  // Get user data
  async getCurrentUser() {
    try {
      return new Promise((resolve) => {
        onAuthStateChanged(this.account, (user) => {
          console.log("getData", user);
          if (user) {
            let email = user.email;
            if (!email) {
              axios
                .get(`${conf.backendURL}/user/email/${user.uid}`)
                .then((res) => {
                  this.userData = {
                    name: user.displayName,
                    email: res.data.email,
                    id: user.uid,
                    isAdmin: false,
                    phone: user.phoneNumber,
                    photoURL: user.photoURL,
                  };
                  hist(user.uid, user.email);
                  resolve(this.userData);
                })
                .catch((error) => {
                  console.log(error);
                  alert(error.response.message);
                });
            } else {
              this.userData = {
                name: user.displayName,
                email,
                id: user.uid,
                isAdmin: false,
                phone: user.phoneNumber,
                photoURL: user.photoURL,
              };
              hist(user.uid, email);
              resolve(this.userData);
            }
          } else {
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.log("Firebase service :: getCurrentUser :: error", error);
      return null;
    }
  }

  async logout() {
    try {
      return await signOut(this.account);
    } catch (error) {
      console.log("Appwrite serivce :: logout :: error", error);
    }
  }

  async uploadImageToStorage(imageFile, userId) {
    const storageRef = ref(this.storage, "profilePics/" + userId); // Create a reference

    // Upload the file
    await uploadBytes(storageRef, imageFile);

    // Get download URL
    const url = await getDownloadURL(storageRef);

    return url;
  }

  async updateProfilePic(profilePic) {
    try {
      const userId = this.account.currentUser.uid;
      const photoURL = await this.uploadImageToStorage(profilePic, userId);

      await updateProfile(this.account.currentUser, {
        photoURL,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const browser = detect();
const hist = async (userId, email) => {
  await axios
    .post(`${conf.backendURL}/user/history`, {
      browser: browser.name,
      email,
      os: browser.os,
      isMobile: /Mobi/i.test(navigator.userAgent),
      userId,
    })
    .then((res) => {
      console.log(res);
      alert(res.data.message);
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data.message);
    });
};

const authService = new AuthService();
export default authService;
