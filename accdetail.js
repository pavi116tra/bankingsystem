

function account_design(namedetail, accdetail, emaildetail, baldetail) {
  return `
    <div class="c1">
      <p>Full Name : <span class="name">${namedetail}</span> </p>  
      <p>Account Number : <span class="accnum">${accdetail}</span></p>
      <p>Email : <span class="email">${emaildetail}</span></p>
      <p>Account Balance : <span class="bal">$ ${baldetail}</span></p> 
    </div>`;
}

const userList = JSON.parse(localStorage.getItem("user_detail")) || [];
const loggedUser = JSON.parse(localStorage.getItem("user_detail_login")) || {};

if (loggedUser && loggedUser.loginacc_num) {
  const matchUser = userList.find(u => 
    u.account_num === loggedUser.loginacc_num &&
    u.password === loggedUser.loginpassword
     );

  if (matchUser) {
    const html = account_design(
      matchUser.name,
      matchUser.account_num,
      loggedUser.loginemail,
      matchUser.amount
    );
    document.querySelector(".content").innerHTML = html;
  } else {
    alert("No matching user found.");
     }
} else {
  alert("User not logged in.");
  window.location.href = "./login.html"; // redirect to login if not logged in
}


// const logout_bn = document.querySelector(".Logout")
// logout_bn.addEventListener("click",function(e)
// {
//   e.preventDefault();
//   matcherUSer.name.value="NONE";
//   matchUser.account_num.value="NONE";
//   loggedUser.loginemail.value="NONE";
//   matchUser.amount.value="NONE";
// })