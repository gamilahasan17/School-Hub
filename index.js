let phone = document.getElementById("phone");
let uname = document.getElementById("name");
let email = document.getElementById("email");

let rephone = /^01[1520][0-9]{8}$/;
let rename = /^[A-Za-z]+\s[A-Za-z][a-z]+$/;
let reemail = /^[A-Za-z0-9_$#]{5,15}@gmail\.com$/;

let btn = document.getElementById("button");

btn.onclick = function () {
    let span = document.querySelectorAll(".sp");
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

   if(rename.test(namevalue)&&reemail.test(emailvalue)){
       
      window.alert(`Your Data Has Been Stored Successfuly `);
      window.location.href = "index.html";
     
    }
  

};

 let register = document.getElementById("register");
 register.addEventListener("click",function(e){
     e.preventDefault();
      document.body.innerHTML = `
      <h1>school hub</h1>
  <div class="container-form">
        <div class="form-group">
        <h3 class="log-form text-center" data-en="Registration form" data-ar="نموذج تسجيل الدخول">Registration form</h3> 
        <!-- <div > -->
 <label data-en="Name :" data-ar="الاسم :">Name :</label>
 <input   required id="name" placeholder="Enter your name" type="text" class="form-control" data-en-placeholder="Enter your name" data-ar-placeholder="أدخل اسمك">
  <!-- </div> -->
  <span class="sp" data-en="Invalid inputs" data-ar="بيانات غير صحيحة">Invalid inputs</span>
        <!-- </div> -->
  <div>
 <label data-en="Email :" data-ar="البريد الإلكتروني :">Email :</label>
 <input required id="email" placeholder="Enter your email" class="form-control" type="email" data-en-placeholder="Enter your email" data-ar-placeholder="أدخل بريدك الإلكتروني">
  </div>
  <span class="sp" data-en="Invalid inputs" data-ar="بيانات غير صحيحة">Invalid inputs</span>

  <div>
 <label data-en="Phone number :" data-ar="رقم الهاتف :">Phone number :</label>
 <input required placeholder="enter your number" id="phone" class="form-control" type="text" data-en-placeholder="enter your number" data-ar-placeholder="أدخل رقم هاتفك">
  </div>
  <span class="sp" data-en="Invalid inputs" data-ar="بيانات غير صحيحة">Invalid inputs</span>
  <div>
  <button class="btn btn-success" id="button" type="button" data-en="Confirm" data-ar="تأكيد">Confirm</button>
  </div>
   <p class="text-center">you already have an account <a id="login" href="form.html">sign in</a></p>
   </div>
    </div>
  `
 

 let phone = document.getElementById("phone");
    let uname = document.getElementById("name");
    let email = document.getElementById("email");
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
    if(rename.test(namevalue)&&reemail.test(emailvalue)&&rephone.test(phonevalue)){
       
      window.alert("Your Data Has Been Stored Successfuly");
      window.location.href = "index.html";
     
    }
}

});


 
 


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