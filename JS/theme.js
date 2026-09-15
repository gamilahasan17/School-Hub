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