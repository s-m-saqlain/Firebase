import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB89i0zQUBSd_RlG-1O2zVEnvwqUav0rWQ",
  authDomain: "app-4463f.firebaseapp.com",
  databaseURL: "https://app-4463f-default-rtdb.firebaseio.com",
  projectId: "app-4463f",
  storageBucket: "app-4463f.appspot.com",
  messagingSenderId: "318580542350",
  appId: "1:318580542350:web:a5094ef0aff0794737f2df",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
