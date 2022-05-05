import { MONTH } from "./config.js";
import { WEEKDAYS } from "./config.js";

const firstName = JSON.parse(localStorage.getItem("firstName"));
const surName = JSON.parse(localStorage.getItem("surName"));
const airClass = JSON.parse(localStorage.getItem("airClass"));
const arrCity = JSON.parse(localStorage.getItem("arrCity"));
const depCity = JSON.parse(localStorage.getItem("depCity"));
const airline = JSON.parse(localStorage.getItem("airline"));
const seatNum = JSON.parse(localStorage.getItem("seatNum"));
const seatRow = JSON.parse(localStorage.getItem("row"));
const depDate = localStorage.getItem("depDate");
const depTime = localStorage.getItem("depTime");
const headerElement = document.querySelector(".header");
const btnElement = document.querySelector(".btn");
const exportPdfbtn = document.getElementById("export-pdf");
const bodyElement = document.body;

const randomBookNum = () =>
  Math.random().toString(36).substr(2, 10).toUpperCase();

const currDate = new Date(depDate);
const depWeekDay = WEEKDAYS[currDate.getDay()];
const depMonth = MONTH[currDate.getMonth()];
const depDay = currDate.getDate();
const depYear = currDate.getFullYear();

const departureDate = `${depWeekDay}, ${depMonth} ${depDay}, ${depYear} ${depTime}`;

const randomRow = (str) => {
  return str[Math.floor(Math.random() * str.length)];
};

const randomSeat = (num, num2) => {
  return Math.round(Math.random() * num) + num2;
};

const seat = seatNum === "" ? randomSeat(90, 10) : seatNum;

const row = seatRow === "" ? randomRow("ABCDEF") : seatRow;

let passFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
let passSurName = surName.charAt(0).toUpperCase() + surName.slice(1);

let seatClass = airClass === "b" ? "Buisness" : "Economy";

let passSeat = `${seat} ${row}`;

let gate = `${randomRow("ABCDEFGHIJ")}${randomSeat(5, 1)}`;

let flightNumGen = () => {
  const flightNum = `${airline.substr(0, 2)} ${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  return flightNum;
};

console.log(flightNumGen());

const render = function () {
  const markup = `
<section class="confirm">
  <div class="bookNum">
    <h3>Booking Number:</h3>
    <p>${randomBookNum()}</p>
  </div>
  <div class="passName">
    <h3>Passenger Name:</h3>
    <p>${passFirstName} ${passSurName}</p>
  </div>
</section>
<section class="fligDet">
  <h2>Flight Details</h2>
  <div class="info">
    <div>
      <h3>From</h3>
      <p>${depCity}</p>
    </div>
    <div>
      <h3>Airline</h3>
      <p>${airline}</p>
    </div>
    <div>
      <h3>Departure Date</h3>
      <p>${departureDate}</p>
    </div>
    <div>
      <h3>Airport</h3>
      <p>Nikola Tesla</p>
    </div>
  </div>
  <div class="info">
    <div>
      <h3>To</h3>
      <p>${arrCity}</p>
    </div>
    <div>
      <h3>Flight Number</h3>
      <p>${flightNumGen()}</p>
    </div>
    <div>
      <h3>Departure Terminal</h3>
      <p>${gate}</p>
    </div>
  </div>
  <div class="info">
    <div>
      <h3>Seat Class</h3>
      <p>${seatClass}</p>
    </div>
    <div>
      <h3>Seat Number</h3>
      <p>${passSeat}</p>
    </div>
  </div>
</section>
`;

  headerElement.insertAdjacentHTML("afterend", markup);
};

render();

let data =
  "\r Booking Number: " +
  randomBookNum() +
  " \r\n " +
  "Passenger Name: " +
  passFirstName +
  " " +
  passSurName +
  " \r\n " +
  "Departure Date: " +
  depDate +
  " \r\n " +
  "Seat: " +
  passSeat +
  " \r\n " +
  "Gate: " +
  gate;

const textToBlob = new Blob([data], { type: "text/plain" });
btnElement.href = URL.createObjectURL(textToBlob);

const opt = {
  filename: "ticket.pdf",
};

html2pdf().set({
  pagebreak: { before: ".wrapper" },
});

exportPdfbtn.addEventListener("click", (e) => {
  e.preventDefault();
  html2pdf(bodyElement, opt);
});
