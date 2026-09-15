// ==========================================
// Search Feature
// ==========================================

let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

function runSearch() {

  // get what the user typed, lowercase so matching isn't case-sensitive
  let searchValue = searchInput.value.toLowerCase();

  // get every store card and product card on the page
  let storeCards = document.querySelectorAll(".store-card");
  let productCards = document.querySelectorAll(".product-card");

  let matchFound = false;

  // loop through store cards and show/hide based on the title text
  storeCards.forEach(function (card) {
    let title = card.querySelector(".card-title").innerText.toLowerCase();

    if (title.includes(searchValue)) {
      card.closest(".col-md-6").style.display = "block";
      if (searchValue !== "") {
        matchFound = true;
      }
    } else {
      card.closest(".col-md-6").style.display = "none";
    }
  });

  // loop through product cards and show/hide based on the title text
  productCards.forEach(function (card) {
    let title = card.querySelector(".card-title").innerText.toLowerCase();

    if (title.includes(searchValue)) {
      card.closest(".col-6").style.display = "block";
      if (searchValue !== "") {
        matchFound = true;
      }
    } else {
      card.closest(".col-6").style.display = "none";
    }
  });

  // if the search box is empty, show everything again
  if (searchValue === "") {
    storeCards.forEach(function (card) {
      card.closest(".col-md-6").style.display = "block";
    });
    productCards.forEach(function (card) {
      card.closest(".col-6").style.display = "block";
    });
  }

  // scroll down to the results if something was typed
  if (searchValue !== "") {
    document.getElementById("stores-section").scrollIntoView({ behavior: "smooth" });
  }
}

// run the search when the button is clicked
searchBtn.addEventListener("click", runSearch);

// also run the search when the user presses Enter in the input
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    runSearch();
  }
});