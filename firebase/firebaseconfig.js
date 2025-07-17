

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2nltnjcMhvm6eduZG2vT2sm9n0gpRdx4",
  authDomain: "mine-mercury.firebaseapp.com",
  projectId: "mine-mercury",
  storageBucket: "mine-mercury.firebasestorage.app",
  messagingSenderId: "838823549453",
  appId: "1:838823549453:web:9cb9d4171e7a7a085b1344",
  measurementId: "G-XT3YN83DM5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
