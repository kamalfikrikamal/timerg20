"use strict";

const sound = document.getElementById("sound");
const buttons = document.querySelectorAll("[data-seconds]");
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const remainingTime = document.querySelector(".display-remaining-time");
const endTime = document.querySelector(".display-end-time");
const api_url = "http://localhost:8080/scenario";
let countdown;

getapi(api_url);

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayRemainingTime(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const remainingSeconds = Math.round((then - Date.now()) / 1000);
    if (remainingSeconds < 0) {
      clearInterval(countdown);
      return;
    }
    if (remainingTime.innerText === "00:00") {
      sound.pause();
    }
    displayRemainingTime(remainingSeconds);
  });
}

function displayRemainingTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const time = `${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
  remainingTime.textContent = time;
  remainingTime.style.fontSize = "22rem";
  document.title = time;
}

function displayEndTime(then) {
  const end = new Date(then);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  const time = `Kembali pukul ${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  endTime.textContent = time;
}

function startTimer1() {
  sound.play();
  const seconds = this.dataset.seconds;
  timer(seconds);
}

async function getapi(url) {
    
  // Storing response
  const response = await fetch(url);
  
  // Storing data in form of JSON
  var data = await response.json();
  show(data);
}

function show(data) {
  console.log(data);
  let tab = 
    `<tr>
      <th>Skenario</th>
      <th>Status</th>
      <th>Waktu</th>
    </tr>`;
  
  // Loop to access all rows 
  for (let r of data.list) {
    tab += `<tr> 
    <td>${r.skenario} </td>
    <td>${r.status}</td>
    <td>${r.waktu}</td>         
    </tr>`;
  }
  // Setting innerHTML as tab variable
  document.getElementById("scenarios").innerHTML = tab;
}

buttons.forEach((button) => button.addEventListener("click", startTimer1));
