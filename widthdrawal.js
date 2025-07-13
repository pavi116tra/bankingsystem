const input1 = document.querySelector(".inp1");
const submit_inp = document.querySelector(".bn-submit");


const loggedUser = JSON.parse(localStorage.getItem("user_detail_login")) || {};
const userList = JSON.parse(localStorage.getItem("user_detail")) || [];
submit_inp.addEventListener("click",function(e){
    e.preventDefault();

    let dep_price  = input1.value.trim();
    let depositAmount =parseInt(dep_price);
     if(isNaN(depositAmount) || depositAmount<0)
     {
        alert("Please enter a valid deposit amount.")
        return;
     }
     if (loggedUser && loggedUser.loginacc_num) {
        const matchUser = userList.find(u => 
            u.account_num === loggedUser.loginacc_num &&
            u.password === loggedUser.loginpassword
     );
     if (matchUser) {
        matchUser.amount = parseInt(matchUser.amount)- depositAmount;
        localStorage.setItem("user_detail",JSON.stringify(userList))
        alert("Successfully deposited");
        window.location.href = "./accdetail.html";
     }
    else {
           alert("No matching user found.");
     }
   } 
  else {
     alert("User not logged in.");
     window.location.href = "./login.html";
    }
})
