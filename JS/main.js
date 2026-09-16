// نمسك لينكات الأيقونات بس (مش اللوجو)
const navLinks = document.querySelectorAll('.top-icons a');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', targetId);
    }
  });
});

fetch('../html/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });