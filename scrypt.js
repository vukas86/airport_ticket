const btnElement = document.querySelector(".btn");
const formElement = document.getElementById("ticketForm");
const nameElement = document.getElementById("fname");
const surnameElement = document.getElementById("surName");
const expDateElement = document.getElementById("expDate");
const classElement = document.getElementById("tClass");
const depCity = document.getElementById("depCity");
const arrCity = document.getElementById("arrCity");
const compElement = document.getElementById("airline");
const seatNumElement = document.getElementById("seatNum");
const seatRowElement = document.getElementById("row");
const depDateElement = document.getElementById("depDate");
const depTimeElement = document.getElementById("depTime");

const currentDate = new Date().getFullYear();

btnElement.addEventListener("click", (e) => {
  e.preventDefault();
  const expDate = new Date(expDateElement.value).getFullYear();
  console.log(typeof expDate);

  if (expDate < currentDate) {
    alert("Passport exp. date cannot be before current date");
    btnElement.setAttribute("disabled");
  } else {
    btnElement.removeAttribute("disabled");
  }

  if (
    /^[a-zA-Z]+$/.test(nameElement.value) &&
    /^[a-zA-Z]+$/.test(surnameElement.value)
  ) {
    window.localStorage.setItem("firstName", JSON.stringify(nameElement.value));
    window.localStorage.setItem(
      "surName",
      JSON.stringify(surnameElement.value)
    );
    btnElement.removeAttribute("disabled");
  } else {
    alert("Accepted only alphabetic letters!");
    btnElement.setAttribute("disabled");
  }

  if (depCity.value !== arrCity.value) {
    window.localStorage.setItem("arrCity", JSON.stringify(arrCity.value));
    window.localStorage.setItem("depCity", JSON.stringify(depCity.value));
    btnElement.removeAttribute("disabled");
  } else {
    alert("dep and arr city cannot be the same");
    btnElement.setAttribute("disabled");
  }

  window.localStorage.setItem("expDateElement", expDateElement.value);

  window.localStorage.setItem("airClass", JSON.stringify(classElement.value));

  window.localStorage.setItem("airline", JSON.stringify(compElement.value));

  window.localStorage.setItem("seatNum", JSON.stringify(seatNumElement.value));

  window.localStorage.setItem("row", JSON.stringify(seatRowElement.value));

  window.localStorage.setItem("depDate", depDateElement.value);

  window.localStorage.setItem("depTime", depTimeElement.value);

  formElement.submit();
});
