import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2nltnjcMhvm6eduZG2vT2sm9n0gpRdx4",
  authDomain: "mine-mercury.firebaseapp.com",
  projectId: "mine-mercury",
  storageBucket: "mine-mercury.firebasestorage.app",
  messagingSenderId: "838823549453",
  appId: "1:838823549453:web:9cb9d4171e7a7a085b1344",
  measurementId: "G-XT3YN83DM5"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const acc_num1 = document.querySelector(".np1");
const email = document.querySelector(".np2");
const pasword1 = document.querySelector(".np3");
const Login_button = document.querySelector(".bn-login");

// Validation functions
function emailchecker(email) {
  return email.endsWith("@gmail.com");
}
function passwordcheck(password) {
  if (
    password !== password.toLowerCase() &&
    password !== password.toUpperCase() &&
    password.length === 10
  ) {
    for (let i = 0; i < password.length; i++) {
      if (!isNaN(password[i])) {
        return true;
      }
    }
  }
  return false;
}

// Limit attempts
function limiting() {
  setTimeout(() => {
    alert("⏳ Too many attempts. Please wait 5 minutes before trying again.");
  }, 5000);
}

let chance = 1;

Login_button.addEventListener("click", async (e) => {
  e.preventDefault();

  const loginacc_num = acc_num1.value.trim();
  const loginemail = email.value.trim();
  const loginpassword = pasword1.value.trim();

  if (chance >= 6) {
    limiting();
    return;
  }

  // Field validations
  if (!loginacc_num || !loginemail || !loginpassword) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  if (loginacc_num.length !== 10) {
    alert("⚠️ Enter a valid 10-digit account number.");
    return;
  }

  if (!emailchecker(loginemail)) {
    alert("⚠️ Email must end with @gmail.com");
    return;
  }

  if (!passwordcheck(loginpassword)) {
    alert("⚠️ Password must contain upper, lower, number, and be 10 characters.");
    chance++;
    return;
  }

  try {
    const q = query(collection(db, "user"), where("account_num", "==", loginacc_num));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("❌ No account found with this account number.");
      return;
    }

    let matched = false;

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.email === loginemail && data.password === loginpassword) {
        matched = true;

        const userSession = {
          name: data.name,
          account_num: data.account_num,
          email: data.email,
          amount: data.amount
        };

        localStorage.setItem("user_detail_login", JSON.stringify(userSession));
        alert("✅ Login successful!");
        window.location.href = "accdetail.html";

        acc_num1.value = "";
        email.value = "";
        pasword1.value = "";
        chance = 1;
      } else {
        if (data.email !== loginemail) {
          alert("❌ Email doesn't match.");
        } else if (data.password !== loginpassword) {
          alert("❌ Password doesn't match.");
          chance++;
          if (chance >= 6) limiting();
        }
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    alert("⚠️ Error while logging in. Try again.");
  }
});

// import { db } from "./firebaseconfig.js";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where
// } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


// const acc_num1 = document.querySelector(".np1");
// const email = document.querySelector(".np2");
// const pasword1 = document.querySelector(".np3");
// const Login_button = document.querySelector(".bn-login")
// function emailchecker(email)
// {
//     if(email.includes("@gmail.com"))
//     {
//         return true;
//     }
//     else{
//         return false;
//     }
// }
// function passwordcheck(password){
//         if(password!==password.toLowerCase() && password!==password.toUpperCase()&& password.toString().length==10)
//     {
//         for(let i=0;i<password.length;i++)
//         {
//           if(!isNaN(password[i]))
//           {
//                return true;
//           }
//           }
//           return false;
//     }
//     else{
//         return false;
//     }
// }
// function limiting()
// {
//     setTimeout(()=>
//     {
//              alert("Your chances are over. Please wait for 5 minutes before trying again.")
//      },5000)
   


// }
//  let chance=1;
// Login_button.addEventListener("click",function(e)
// {
//     e.preventDefault();
//     let loginacc_num = acc_num1.value.trim();
//     let loginemail = email.value.trim();
//     let loginpassword = pasword1.value.trim();
//     const user_detail = JSON.parse(localStorage.getItem("user_detail")) || [];
  
//        if (chance >= 6) {
//          limiting();
//         return;
//        }
//          if(loginacc_num==="" || loginemail==="" || loginpassword==="")
//         {
//          alert("Please fill in all fields.");
//          return;
//         }
//          if(loginacc_num.toString().length!=10)
//         {
//               alert("Enter the valid account number");
//               return;
              
//         }
        
//             if(!emailchecker(loginemail))
//             {
//                alert("Enter the valid Email")
//                return;
//             }
//             if(!passwordcheck(loginpassword ))
//             {
//                 alert("Enter the valid Password (mix of upper, lower, number,length 10)")
//                 chance++;
//                 return;
//             }
//    const matcheruser = user_detail.find(u => u.account_num===loginacc_num && loginpassword===u.password && u.email===loginemail )
   
//   if(matcheruser)
//   {
//          const user1={
//                 loginacc_num:loginacc_num,
//                 loginemail:loginemail,
//                 loginpassword:loginpassword      
//                        };
//                             localStorage.setItem("user_detail_login",JSON.stringify(user1));
//                             alert(" Login successfull");
//                             // console.log("All Registered Users:");
//                             // user_detail_login.forEach((u, i) => {
//                             //        console.log(`User ${i + 1}:`, u);
//                             //  });
//                             window.location.href="./accdetail.html"
//                             acc_num1.value="";
//                             email.value="";
//                             pasword1.value="";
//                             chance=1;
//   }
//   else{
//     const accExists = user_detail.find(u=> u.account_num=== loginacc_num);
//     if(!accExists)
//     {
//         alert("❌ Incorrect account number");
//     }
//     else if(accExists.email !== loginemail)
//     {
//         alert("❌ Email doesn't match this account");
//     }
//     else if(accExists.password !== loginpassword)
//       {
//        alert("❌  Incorrect  password");
//        chance++;
//        if(chance>5)
//        {
//         limiting();
//         return;
//        }
//       }
//       else{
//         alert("❌ Something went wrong. Try again.");
//       }
//      }
// })
// accdetail page-3
// function account_design(namedetail, accdetail, emaildetail, baldetail) {
//   return `
//     <div class="c1">
//       <p>Full Name : <span class="name">${namedetail}</span> </p>  
//       <p>Account Number : <span class="accnum">${accdetail}</span></p>
//       <p>Email : <span class="email">${emaildetail}</span></p>
//       <p>Account Balance : <span class="bal">$ ${baldetail}</span></p> 
//     </div> `;
// }

// const userList = JSON.parse(localStorage.getItem("user_detail")) || [];
// const loggedUser = JSON.parse(localStorage.getItem("user_detail_login")) || {};

// if (loggedUser && loggedUser.loginacc_num) {
//   const matchUser = userList.find(u => 
//     u.account_num === loggedUser.loginacc_num &&
//     u.password === loggedUser.loginpassword
//   );

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
//   }
// } else {
//   alert("User not logged in.");
//   window.location.href = "./login.html"; // redirect to login if not logged in
// }

// function account_design(namedetail,accdetail,emaildetail,baldetail){
//     return ` <div class="c1">
//                   <p>Full Name : <span class="name">${namedetail}</span> </p>  
//                   <p>Account Number : <span class="accnum">${accdetail}</span></p>
//                   <p>email : <span class="email">${emaildetail}</span></p>
//                   <p>Account Balance : <span class="bal">$ ${baldetail}</span></p> 
//                   </div> `
// }
//  const detailreg = JSON.parse(localStorage.getItem("user_detail")) ||[];
//  console.log(detailreg);
//  const detaillog = JSON.parse(localStorage.getItem("user_detail_login")) ||{};
//   console.log(detaillog);
//  account_design(detailreg.name,detailreg.account_num,detailreg.loginemail,detailreg.amount);



//     if(loginacc_num!=="" && loginemail!=="" && loginpassword!=="")
//     {
//         if(loginacc_num.toString().length==10)
//         {
//             if(emailchecker(loginemail))
//             {
//               if(passwordcheck(loginpassword )){
//                      if(user_detail &&loginacc_num===user_detail.account_num)
//                      {
//                         if(user_detail && loginpassword===user_detail.password )
//                         {
//                               const user1={
//                                 loginacc_num:loginacc_num,
//                                 loginemail:loginemail,
//                                 loginpassword:loginpassword
//                                };
//                             localStorage.setItem("user_detail_login",JSON.stringify(user1));
//                             alert(" Login successfull");
//                             window.location.href="./accdetail.html"
//                             acc_num1.value="";
//                             email.value="";
//                             pasword1.value="";
//                             chance=1;
//                         }
//                         else {
//                             alert("Incorrect Password")
//                        chance++;
//                         }
//                      }
//                      else{
//                         alert("Invalid account number")
//                      }
//                    }
//                     else{
//                          alert("Enter the valid Password")
//                         chance++;
//                      }
//                  }
//             else{
//                  alert("Enter the valid Email")
//                }
//          }
//         else{
//             alert("Enter the valid account number");
//         }
//     }
//       else{
//           alert("Please fill in all fields.");
//       } 
//        if (chance === 6) {
//             limiting();
//             }  
// })


// function account_design(namedetail,accdetail,emaildetail,baldetail){
//     return ` <div class="c1">
//                   <p>Full Name : <span class="name">${namedetail}</span> </p>  
//                   <p>Account Number : <span class="accnum">${accdetail}</span></p>
//                   <p>email : <span class="email">${emaildetail}</span></p>
//                   <p>Account Balance : <span class="bal">$ ${baldetail}</span></p> 
//                   </div> `
// }
//  const detailreg = JSON.parse(localStorage.getItem("user_detail"));
//  console.log(detailreg);
//  const detaillog = JSON.parse(localStorage.getItem("user_detail_login"))
//   console.log(detaillog);
//  account_design(detailreg.name,detailreg.account_num,detailreg.loginemail,detailreg.amount);