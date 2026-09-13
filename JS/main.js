// نمسك كل لينكات الناف بار (اللوجو + الأيقونات)
const navLinks = document.querySelectorAll('.logo, .top-icons a');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // نوقف السلوك الافتراضي (اللي بيضيف history entry)

    const targetId = this.getAttribute('href'); // مثلاً "#section1"
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', targetId); // نستبدل بدل ما نضيف
    }
  });
});




fetch('../html/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  })