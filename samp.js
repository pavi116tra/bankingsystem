const acc_num1 = document.querySelector(".np1"); 
const email = document.querySelector(".np2");
const pasword1 = document.querySelector(".np3");
const Login_button = document.querySelector(".bn-login");

function emailchecker(email) {
    if (email.includes("@gmail.com")) {
        return true;
    } else {
        return false;
    }
}

function passwordcheck(password) {
    if (password !== password.toLowerCase() &&
        password !== password.toUpperCase() &&
        password.toString().length == 10) {
        for (let i = 0; i < password.length; i++) {
            if (!isNaN(password[i])) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}

function limiting() {
    setTimeout(() => {
        alert("Your chances are over. Please wait for 20 minutes before trying again.");
    }, 10);
}

// ✅ NEW: Added variables for locking system
let chance = 1;
let isLocked = false;
let lockTimer = null;

Login_button.addEventListener("click", function (e) {
    e.preventDefault();

    // ✅ NEW: Stop login if currently locked
    if (isLocked) {
        alert("You are locked out. Please wait 20 minutes.");
        return;
    }

    let loginacc_num = acc_num1.value.trim();
    let loginemail = email.value.trim();
    let loginpassword = pasword1.value.trim();
    const user_detail = JSON.parse(localStorage.getItem("user_detail")) || [];

    if (chance >= 6) {
        // ✅ NEW: Lock the login and start 20 min timer
        isLocked = true;
        Login_button.disabled = true;
        limiting();

        lockTimer = setTimeout(() => {
            isLocked = false;
            chance = 1;
            Login_button.disabled = false;
            alert("You can try logging in again now.");
        }, 20 * 60 * 1000); // 20 minutes
        return;
    }

    if (loginacc_num === "" && loginemail === "" && loginpassword === "") {
        alert("Please fill in all fields.");
    }

    if (loginacc_num.toString().length != 10) {
        alert("Enter the valid account number");
    }

    if (!emailchecker(loginemail)) {
        alert("Enter the valid Email");
    }

    if (!passwordcheck(loginpassword)) {
        alert("Enter the valid Password (mix of upper, lower, number,length 10)");
        chance++;
    }

    const matcheruser = user_detail.find(u => {
        return u.account_num === loginacc_num && loginpassword === u.password;
    });

    if (matcheruser) {
        const user1 = {
            loginacc_num: loginacc_num,
            loginemail: loginemail,
            loginpassword: loginpassword
        };
        localStorage.setItem("user_detail_login", JSON.stringify(user1));
        alert("Login successful");
        window.location.href = "./accdetail.html";
        acc_num1.value = "";
        email.value = "";
        pasword1.value = "";
        chance = 1;

        // ✅ NEW: Clear lock if login is successful
        clearTimeout(lockTimer);
        isLocked = false;
        Login_button.disabled = false;
    } else {
        // Wrong account/password
        chance++;
    }
});
