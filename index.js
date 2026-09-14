let phone = document.getElementById("phone");
let uname = document.getElementById("name");
let email = document.getElementById("email");

let rephone = /^01[1520][0-9]{8}$/;
let rename = /^[A-Za-z]+\s[A-Za-z][a-z]+$/;
let reemail = /^[A-Za-z0-9_$#]{5,15}@gmail\.com$/;

let btn = document.getElementById("button");

btn.onclick = function () {
    let span = document.querySelectorAll(".sp");
    let phonevalue = phone.value;
    let namevalue = uname.value;
    let emailvalue = email.value;

   
    if (rename.test(namevalue)) {
        span[0].style.display = "none";
        uname.classList.add("is-valid");
        uname.classList.remove("is-invalid");
    } else {
        span[0].style.display = "block";
        uname.classList.add("is-invalid");
        uname.classList.remove("is-valid");
    }

   
    if (reemail.test(emailvalue)) {
        span[1].style.display = "none";
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
    } else {
        span[1].style.display = "block";
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
    }

    
    if (rephone.test(phonevalue)) {
        span[2].style.display = "none";
        phone.classList.add("is-valid");
        phone.classList.remove("is-invalid");
    } else {
        span[2].style.display = "block";
        phone.classList.add("is-invalid");
        phone.classList.remove("is-valid");
    }

};

// Dark / Light Mode

let themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.innerHTML = "☀️ Light";
    } else {
        themeBtn.innerHTML = "🌙 Dark";
    }

};