// ==========================================
// Return to Top Button
// ==========================================

const returnTop = document.getElementById("returnTop");


window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        returnTop.style.display = "block";
    } else {
        returnTop.style.display = "none";
    }
});

returnTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});