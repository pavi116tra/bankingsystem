const firstname = document.querySelector(".inp1");
const acc_num = document.querySelector(".inp2");
const amount_inp = document.querySelector(".inp3");
const pasword_inp = document.querySelector(".inp4");
const submit_bn = document.querySelector(".bn");
function passwordcheck(password){
        if(password!==password.toLowerCase() && password!==password.toUpperCase()&& password.toString().length==10)
    {
        for(let i=0;i<password.length;i++)
        {
          if(!isNaN(password[i]))
          {
               return true;
          }
          }
          return false;
    }
    else{
        return false;
    }
}
submit_bn.addEventListener("click",function(e)
{
     e.preventDefault(); 
    let  name = firstname.value.trim();
    let account_num =acc_num.value.trim();
    let amount = amount_inp.value.trim();
    let password = pasword_inp.value.trim();
     if(name!=""&& account_num!="" && amount!="" && password!="")
      {
         if(account_num.toString().length==10)
         {
             if(passwordcheck(password))
              {
                    const user={
                                name : name,
                                account_num : account_num,
                                 amount : amount,
                               password : password
                           };
                     let user_detail = JSON.parse(localStorage.getItem("user_detail"))||[];
                      if (!Array.isArray(user_detail)) {
                                user_detail = [];
                        }
                    const accexists = user_detail.some(u=>u.account_num===account_num);
                      if(accexists)
                      {
                        alert ("this acount number is already registered");
                        return;
                      }
                      user_detail.push(user);
                     localStorage.setItem("user_detail",JSON.stringify(user_detail));
                    //  let s = JSON.parse(localStorage.getItem("user_detail"))
                    //  console.log(s);
                    console.log("All Registered Users:");
                         user_detail.forEach((u, i) => {
                          console.log(`User ${i + 1}:`, u);
                       });
                     alert(" User detail saved successfull");
                     window.location.href="./login.html";
                    firstname.value="";
                    acc_num.value="";
                    amount_inp.value="";
                    pasword_inp.value="";
              }
              else{
                  alert("Enter the valid Password");
              }     
         }
        else {
               alert("Enter the valid account number");
        }
      }
      else{
          alert("Please fill in all fields.");
      }

    })

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