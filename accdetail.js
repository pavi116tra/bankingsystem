import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
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

// Layout
function account_design(namedetail, accdetail, emaildetail, baldetail) {
  return `
    <div class="c1">
      <p>Full Name : <span class="name">${namedetail}</span></p>  
      <p>Account Number : <span class="accnum">${accdetail}</span></p>
      <p>Email : <span class="email">${emaildetail}</span></p>
      <p>Account Balance : <span class="bal">$ ${baldetail}</span></p> 
    </div>`;
}

// ✅ FIX: Get correct localStorage key
const loggedUser = JSON.parse(localStorage.getItem("user_detail_login"));

// ✅ FIX: Use correct field for account number
if (loggedUser && loggedUser.account_num) {
  const fetchUserDetails = async () => {
    try {
      const q = query(
        collection(db, "user"),
        where("account_num", "==", loggedUser.account_num)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("No matching user found in Firestore.");
        window.location.href = "./login.html";
        return;
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const html = account_design(
          data.name,
          data.account_num,
          data.email,
          data.amount
        );
        document.querySelector(".content").innerHTML = html;
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Something went wrong while fetching your details.");
    }
  };

  fetchUserDetails();
} else {
  alert("User not logged in.");
  window.location.href = "./login.html";
}


// function account_design(namedetail, accdetail, emaildetail, baldetail) {
//   return `
//     <div class="c1">
//       <p>Full Name : <span class="name">${namedetail}</span> </p>  
//       <p>Account Number : <span class="accnum">${accdetail}</span></p>
//       <p>Email : <span class="email">${emaildetail}</span></p>
//       <p>Account Balance : <span class="bal">$ ${baldetail}</span></p> 
//     </div>`;
// }

// const userList = JSON.parse(localStorage.getItem("user_detail")) || [];
// const loggedUser = JSON.parse(localStorage.getItem("user_detail_login")) || {};

// if (loggedUser && loggedUser.loginacc_num) {
//   const matchUser = userList.find(u => 
//     u.account_num === loggedUser.loginacc_num &&
//     u.password === loggedUser.loginpassword
//      );

//   if (matchUser) {
//     const html = account_design(
//       matchUser.name,
//       matchUser.account_num,
//       loggedUser.loginemail,
//       matchUser.amount
//     );
//     document.querySelector(".content").innerHTML = html;
//   } else {
//     alert("No matching user found.");
//      }
// } else {
//   alert("User not logged in.");
//   window.location.href = "./login.html"; // redirect to login if not logged in
// }


// const logout_bn = document.querySelector(".Logout")
// logout_bn.addEventListener("click",function(e)
// {
//   e.preventDefault();
//   matcherUSer.name.value="NONE";
//   matchUser.account_num.value="NONE";
//   loggedUser.loginemail.value="NONE";
//   matchUser.amount.value="NONE";
// })