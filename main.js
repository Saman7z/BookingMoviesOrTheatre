const updateThePrice = () => {
  document.querySelector(".submit-btn").style.display = "block";
  document.querySelector(".seat-count").innerText = document.querySelectorAll(
    ".row-seats .selected"
  ).length;
  document.querySelector(".total-price").innerText =
    document.querySelectorAll(".row-seats .selected").length *
    Number(document.getElementById("movies").value);
  document.querySelector(".book-count").innerText = document.querySelectorAll(
    ".row-seats .selected"
  ).length;
  if (document.querySelectorAll(".row-seats .selected").length == 0) {
    document.querySelector(".submit-btn").style.display = "none";
  } else {
    document.querySelector(".submit-btn").style.display = "block";
  }
};

const seatClicked = (e) => {
  e.target.classList.toggle("selected");
  updateThePrice();
};
const showAlertMsg = (msg) => {
    document.getElementById("alert-msg").innerText = msg;
    document.querySelector(".alert-container").style.display = "block";
};
const hideAlert = () => {
    document.querySelector(".alert-container").style.display = "none";
    location.reload();

}
const saveDataInLocalStorage = () => {
  let selectedSeats = document.querySelectorAll(".row-seats .selected");
  let allSeats = document.querySelectorAll(".seats:not(.guide)");
  let theMovieIndex = document.getElementById("movies").selectedIndex;
  let theMovie = document.getElementById("movies").value;
  let theTotalPrice =
    document.querySelectorAll(".row-seats .selected").length * Number(theMovie);
  let selectedOnes = [...selectedSeats].map((item) =>
    [...allSeats].indexOf(item)
  );
  localStorage.setItem("selectedOnes", JSON.stringify(selectedOnes));
  localStorage.setItem("selectedMovie", theMovieIndex);
  localStorage.setItem("selectedMoviePrice", theTotalPrice);
  showAlertMsg("Seats Got Added Successfully !");
  setTimeout( hideAlert, 3000);
};
const initData = () => {
  let allSeats = document.querySelectorAll(".seats:not(.guide)");
  let selectedSeats = JSON.parse(localStorage.getItem("selectedOnes"));
  let selectedMovieIndex = localStorage.getItem("selectedMovie");
  let selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

  if (selectedSeats !== null) {
    //console.log(selectedSeats + " " +selectedMovie + " "+selectedMoviePrice + " ");
    document.querySelector(".seat-count").innerText = selectedSeats.length;
    document.querySelector(".total-price").innerText = selectedMoviePrice;
    //console.log(allSeats);
    //[...selectedSeats].forEach(item => [...allSeats]. )
    if (selectedSeats !== null && selectedSeats.length > 0) {
      allSeats.forEach((item, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          item.classList.add("selected");
        }
      });
    }
    console.log(selectedMovieIndex);
    document.getElementById("movies").selectedIndex = selectedMovieIndex;
  }
};
document.getElementById("movies").addEventListener("change", updateThePrice);

document
  .querySelectorAll(".seats:not(.guide):not(.occupied)")
  .forEach((item) => item.addEventListener("click", seatClicked));

document
  .querySelector(".submit-btn")
  .addEventListener("click", saveDataInLocalStorage);

window.addEventListener("DOMContentLoaded", initData);

//console.log(document.getElementById("movies").selectedOptions[0].text)

const clearCache = () => {
  localStorage.clear();
 // 
 
  showAlertMsg("We Removed The Cache For You !");
  setTimeout( hideAlert, 2000);
};
const closeAlert = () => {
  document.querySelector(".alert-container").style.display = "none";
};
document.querySelector(".clear-btn").addEventListener("click", clearCache);

document
  .querySelector(".alert-close-btn")
  .addEventListener("click", closeAlert);
