import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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

// ✅ DOM elements
const firstname = document.querySelector(".inp1");
const acc_num = document.querySelector(".inp2");
const amount_inp = document.querySelector(".inp3");
const pasword_inp = document.querySelector(".inp4");
const email_inp = document.querySelector(".inp5");
const submit_bn = document.querySelector(".bn");

// ✅ Password checker
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

// ✅ Email checker
function emailchecker(email) {
  return email.includes("@gmail.com");
}

// ✅ Register function
submit_bn.addEventListener("click", async function (e) {
  e.preventDefault();

  const name = firstname.value.trim();
  const account_num_val = acc_num.value.trim();
  const amount = amount_inp.value.trim();
  const password = pasword_inp.value.trim();
  const email = email_inp.value.trim();

  if (name && account_num_val && amount && password && email) {
    if (account_num_val.length === 10) {
      if (passwordcheck(password)) {
        if (emailchecker(email)) {
          if (amount > 0) {
            try {
              const q = query(
                collection(db, "user"),
                where("account_num", "==", account_num_val)
              );
              const querySnapshot = await getDocs(q);

              if (!querySnapshot.empty) {
                alert("This account number is already registered");
                return;
              }

              await addDoc(collection(db, "user"), {
                name: name,
                account_num: account_num_val,
                amount: parseFloat(amount),
                email: email,
                password: password
              });

              alert("User registered successfully!");
              window.location.href = "./login.html";
            } catch (error) {
              console.error("Error saving data:", error);
              alert("Error saving data.");
            }
          } else {
            alert("Amount must be positive.");
          }
        } else {
          alert("Enter a valid email.");
        }
      } else {
        alert("Password must be 10 characters, mix of upper/lowercase and include number.");
      }
    } else {
      alert("Account number must be 10 digits.");
    }
  } else {
    alert("Please fill all fields.");
  }
});


// const firstname = document.querySelector(".inp1");
// const acc_num = document.querySelector(".inp2");
// const amount_inp = document.querySelector(".inp3");
// const pasword_inp = document.querySelector(".inp4");
// const email_inp = document.querySelector(".inp5");
// const submit_bn = document.querySelector(".bn");


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


// import { collection, getDocs } from "firebase/firestore"; 

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

// submit_bn.addEventListener("click",function(e)
// {
//      e.preventDefault(); 
//     let  name = firstname.value.trim();
//     let account_num =acc_num.value.trim();
//     let amount = amount_inp.value.trim();
//     let password = pasword_inp.value.trim();
//     let email = email_inp.value.trim();
//      if(name!=""&& account_num!="" && amount!="" && password!="" && email !="") 
//       {
//          if(account_num.toString().length==10)
//          {
//              if(passwordcheck(password))
//               {
//                    if(emailchecker(email))
//                    {
                      
//                       if(amount>0){
//                      const user={
//                                 name : name,
//                                 account_num : account_num,   
//                                  password : password,
//                                 email:email,
//                                 amount : amount,
//                            };
//                      let user_detail = JSON.parse(localStorage.getItem("user_detail"))||[];
//                       if (!Array.isArray(user_detail)) {
//                                 user_detail = [];
//                         }
//                       const accexists = user_detail.some(u=>u.account_num===account_num);
//                       if(accexists)
//                       {
//                         alert ("this acount number is already registered");
//                         return;
//                       }
//                       user_detail.push(user);
//                      localStorage.setItem("user_detail",JSON.stringify(user_detail));
//                     //  let s = JSON.parse(localStorage.getItem("user_detail"))
//                     //  console.log(s);
//                     console.log("All Registered Users:");
//                          user_detail.forEach((u, i) => {
//                           console.log(`User ${i + 1}:`, u);
//                        });
//                      alert(" User detail saved successfull");
//                      window.location.href="./login.html";
//                     firstname.value="";
//                     acc_num.value="";
//                     amount_inp.value="";
//                     email.value="";
//                     pasword_inp.value="";
//                      }
//                      else{
//                       alert("Amount cannot be negative ")
//                      }
//                    }
//                   else{
//                      alert("Enter the valid email");
//                    }
//               }
//             else{
//                  alert("Enter the valid Password (mix of upper, lower, number,length 10)")
//               }     
//          }
//         else {
//                alert("Enter the valid account number");
//         }
//     }
//     else{
//           alert("Please fill in all fields.");
//       }

//     })

// const acc_num1 = document.querySelector(".np1");
// const email = document.querySelector(".np2");
// const pasword1 = document.querySelector(".np3");
// const Login_button = document.querySelector(".bn-login")
// Login_button.addEventListener("click",function(e)
// {
//     e.preventDefault();
//     let loginacc_num = acc_num1.value.trim();
//     let loginemail = email.value.trim();
//     let loginpassword = pasword1.value.trim();
//   const user_detail = JSON.parse(localStorage.getItem("user_detail"));

//     if(loginacc_num!=="" && loginemail!=="" && loginpassword!=="")
//     {
//         if(loginacc_num.toString().length==10)
//         {
//          if(passwordcheck(loginpassword)){
//                      if(loginacc_num===user_detail.account_num)
//                      {
//                         if(loginpassword===user_detail.password)
//                         {
//                               const user1={
//                                 loginacc_num:loginacc_num,
//                                 loginemail:loginemail,
//                                 loginpassword:loginpassword
//                                };
//                             localStorage.setItem("user_detail_login",JSON.stringify(user1));
//                             alert(" Login successfull");
//                                loginacc_num.value="";
//                                 loginemail.value="";
//                                 loginpassword.value="";
//                         }
//                         else{
//                             alert("Incorrect Password");
//                         }
//                      }
//                      else{
//                         alert("Invalid account number")
//                      }
//             }
//             else{
//                 alert("Enter the valid Password")
//             }
//         }
//         else{
//             alert("Enter the valid account number");
//         }
//     }
//       else{
//           alert("Please fill in all fields.");
//       } 
// })



// const firstname = document.querySelector(".inp1");
// const acc_num = document.querySelector(".inp2");
// const amount_inp = document.querySelector(".inp3");
// const pasword_inp = document.querySelector(".inp4");
// const email_inp = document.querySelector(".inp5");
// const submit_bn = document.querySelector(".bn");

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
// import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAIJQVI5e0qJtVEnLjxeinxqu7TvlFZ8Wo",
//   authDomain: "my-mercury-bank.firebaseapp.com",
//   projectId: "my-mercury-bank",
//   storageBucket: "my-mercury-bank.firebasestorage.app",
//   messagingSenderId: "775063693308",
//   appId: "1:775063693308:web:4adf06df496a832ebab479",
//   measurementId: "G-BP5KPZ8XP3"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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




// submit_bn.addEventListener("click",function(e)
// {
//      e.preventDefault(); 
//     let  name = firstname.value.trim();
//     let account_num =acc_num.value.trim();
//     let amount = amount_inp.value.trim();
//     let password = pasword_inp.value.trim();
//     let email = email_inp.value.trim();
//      if(name!=""&& account_num!="" && amount!="" && password!="" && email !="") 
//       {
//          if(account_num.toString().length==10)
//          {
//              if(passwordcheck(password))
//               {
//                    if(emailchecker(email))
//                    {
                      
//                       if(amount>0){
//                      const user={
//                                 name : name,
//                                 account_num : account_num,   
//                                  password : password,
//                                 email:email,
//                                 amount : amount,
//                            };
//                      let user_detail = JSON.parse(localStorage.getItem("user_detail"))||[];
//                       if (!Array.isArray(user_detail)) {
//                                 user_detail = [];
//                         }
//                       const accexists = user_detail.some(u=>u.account_num===account_num);
//                       if(accexists)
//                       {
//                         alert ("this acount number is already registered");
//                         return;
//                       }
//                       user_detail.push(user);
//                      localStorage.setItem("user_detail",JSON.stringify(user_detail));
//                     //  let s = JSON.parse(localStorage.getItem("user_detail"))
//                     //  console.log(s);
//                     console.log("All Registered Users:");
//                          user_detail.forEach((u, i) => {
//                           console.log(`User ${i + 1}:`, u);
//                        });
//                      alert(" User detail saved successfull");
//                      window.location.href="./login.html";
//                     firstname.value="";
//                     acc_num.value="";
//                     amount_inp.value="";
//                     email.value="";
//                     pasword_inp.value="";
//                      }
//                      else{
//                       alert("Amount cannot be negative ")
//                      }
//                    }
//                   else{
//                      alert("Enter the valid email");
//                    }
//               }
//             else{
//                  alert("Enter the valid Password (mix of upper, lower, number,length 10)")
//               }     
//          }
//         else {
//                alert("Enter the valid account number");
//         }
//     }
//     else{
//           alert("Please fill in all fields.");
//       }

//     })