import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environments } from "src/env/environments";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: environments.apiKey,
  authDomain: environments.authDomain,
  projectId: environments.projectId,
  storageBucket: environments.storageBucket,
  messagingSenderId: environments.messagingSenderId,
  appId: environments.appId,
  measurementId: environments.measurementId
};
//Providers
export const Googleprovider = new GoogleAuthProvider();
export const Facebookprovider = new FacebookAuthProvider().setCustomParameters({'display': 'popup'});
export const Githubprovider = new GithubAuthProvider ();
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const analytics = getAnalytics(app);
