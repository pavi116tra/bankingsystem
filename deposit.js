import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB2nltnjcMhvm6eduZG2vT2sm9n0gpRdx4",
  authDomain: "mine-mercury.firebaseapp.com",
  projectId: "mine-mercury",
  storageBucket: "mine-mercury.firebasestorage.app",
  messagingSenderId: "838823549453",
  appId: "1:838823549453:web:9cb9d4171e7a7a085b1344",
  measurementId: "G-XT3YN83DM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const input1 = document.querySelector(".inp1");
const submit_inp = document.querySelector(".bn-submit");

const loggedUser = JSON.parse(localStorage.getItem("user_detail_login"));

submit_inp.addEventListener("click", async function (e) {
  e.preventDefault();

  const dep_price = input1.value.trim();
  const depositAmount = parseInt(dep_price);

  if (isNaN(depositAmount) || depositAmount <= 0) {
    alert("Please enter a valid positive deposit amount.");
    return;
  }

  if (!loggedUser || !loggedUser.account_num) {
    alert("User not logged in.");
    window.location.href = "./login.html";
    return;
  }

  try {
    // Find the user document from Firestore
    const q = query(
      collection(db, "user"),
      where("account_num", "==", loggedUser.account_num)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("No matching user found.");
      return;
    }

    let userDocRef, userData;

    querySnapshot.forEach((docSnap) => {
      userDocRef = docSnap.ref;
      userData = docSnap.data();
    });

    // Update amount
    const newAmount = parseFloat(userData.amount) + depositAmount;

    await updateDoc(userDocRef, {
      amount: newAmount
    });

    alert(`✅ Successfully deposited ₹${depositAmount}`);
    window.location.href = "./accdetail.html";
  } catch (error) {
    console.error("Error depositing amount:", error);
    alert("Something went wrong while updating balance.");
  }
});


// const input1 = document.querySelector(".inp1");
// const submit_inp = document.querySelector(".bn-submit");


// const loggedUser = JSON.parse(localStorage.getItem("user_detail_login")) || {};
// const userList = JSON.parse(localStorage.getItem("user_detail")) || [];
// submit_inp.addEventListener("click",function(e){
//     e.preventDefault();

//     let dep_price  = input1.value.trim();
//     let depositAmount =parseInt(dep_price);
//      if(isNaN(depositAmount) || depositAmount<0)
//      {
//         alert("Please enter a valid deposit amount.")
//         return;
//      }
//      if (loggedUser && loggedUser.loginacc_num) {
//         const matchUser = userList.find(u => 
//             u.account_num === loggedUser.loginacc_num &&
//             u.password === loggedUser.loginpassword
//      );
//      if (matchUser) {
//         matchUser.amount = parseInt(matchUser.amount)+ depositAmount;
//         localStorage.setItem("user_detail",JSON.stringify(userList))
//         alert("Successfully deposited");
//         window.location.href = "./accdetail.html";
//      }
//     else {
//            alert("No matching user found.");
//      }
//    } 
//   else {
//      alert("User not logged in.");
//      window.location.href = "./login.html";
//     }
// })
