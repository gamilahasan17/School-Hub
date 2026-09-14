// ==========================================
// Language Toggle (English / Arabic)
// ==========================================

let toggleBtn = document.getElementById("lang-toggle");
let html = document.documentElement;
let currentLang = "en"; // default language when page loads

toggleBtn.addEventListener("click", function () {

  // switch the language variable
  if (currentLang === "en") {
    currentLang = "ar";
  } else {
    currentLang = "en";
  }

  // get every element that has a data-en attribute
  let textElements = document.querySelectorAll("[data-en]");

  // loop through them and swap the text
  textElements.forEach(function (el) {
    el.innerText = el.getAttribute("data-" + currentLang);
  });

  // do the same thing for input placeholders
  let placeholderElements = document.querySelectorAll("[data-en-placeholder]");

  placeholderElements.forEach(function (el) {
    el.setAttribute("placeholder", el.getAttribute("data-" + currentLang + "-placeholder"));
  });

  // flip the page direction (left-to-right vs right-to-left)
  if (currentLang === "ar") {
    html.setAttribute("lang", "ar");
    html.setAttribute("dir", "rtl");
    document.body.classList.add("rtl-mode");
  } else {
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
    document.body.classList.remove("rtl-mode");
  }

});