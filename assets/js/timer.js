"use strict";

const sound = document.getElementById("sound");
const buttons = document.querySelectorAll("[data-seconds]");
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const remainingTime = document.querySelector(".display-remaining-time");
const pause = document.querySelector(".pause");
let countdown;


getDefaultTime("00:00");

function getDefaultTime(time){
  remainingTime.textContent = time;
  remainingTime.style.fontSize = "10rem";
}

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayRemainingTime(seconds);
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
  remainingTime.style.fontSize = "10rem";
  document.title = time;
}

function startTimer1() {
  sound.play();
  const seconds = this.dataset.seconds;
  timer(seconds);
}

function startTimer2(e) {
  e.preventDefault();
  sound.play();
  const minutes = input.value;
  const seconds = minutes * 60;

  if (minutes / 1 != minutes) {
    sound.pause();
    clearInterval(countdown);
    remainingTime.textContent = "Please enter only numbers.";
    remainingTime.style.fontSize = window.innerWidth < 500 ? "4rem" : "7rem";
    document.title = "Countdown Timer";
    endTime.textContent = "";
    this.reset();
    return;
  }

  if (minutes < 0) {
    sound.pause();
    clearInterval(countdown);
    remainingTime.textContent = "Please enter a positive number.";
    remainingTime.style.fontSize = window.innerWidth < 500 ? "3.9rem" : "7rem";
    document.title = "Countdown Timer";
    endTime.textContent = "";
    this.reset();
    return;
  }

  if (minutes == 0) {
    sound.pause();
    clearInterval(countdown);
    remainingTime.textContent = "Oh, no! Zero?";
    remainingTime.style.fontSize = "7rem";
    document.title = "Zero?";
    endTime.textContent = "";
    this.reset();
    return;
  }

  timer(seconds);
  this.reset();
}

buttons.forEach((button) => button.addEventListener("click", startTimer1));
form.addEventListener("submit", startTimer2);
pause.addEventListener("click", function() {
  clearInterval(countdown);
  sound.pause();
})

async function updateScenario(data) {
  let status;
  console.log(data);
  if(remainingTime.textContent === "00:00"){
      status = "Gagal"
  } else {
      status = "Berhasil"
  }
  await fetch('http://128.199.214.132:8080/scenario?id='+data.id, {
      method: 'PUT',
      body: new URLSearchParams({
          'skenario': data.scenario,
          'status': status,
          'waktu': remainingTime.textContent
      }),
      headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
  })
  .then(response => response.json())
  .then(json => window.location.href='index.html')
}