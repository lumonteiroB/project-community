// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY8bKLtfSgNWSmWOJG8EV6x-n4gzfq2IA",
  authDomain: "communities-ec57c.firebaseapp.com",
  projectId: "communities-ec57c",
  storageBucket: "communities-ec57c.firebasestorage.app",
  messagingSenderId: "407305805087",
  appId: "1:407305805087:web:91771a1a531e6c5a1b642a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };