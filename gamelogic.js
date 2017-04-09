"use strict";

function init() {
    var life = "";
    var i = 0;
    var time = 300;
    var timeOffset = 300;

    // Flip life 1-5 to white if they are not already
    for (i = 1; i < 6; i += 1) {
        life = document.querySelector("#L" + i.toString());
        if (life.classList.contains("flip")) {
            setTimeout(flipElement, time, "#L" + i.toString());
            time = time + timeOffset;
        }
    }

    // Flip life 6-10 to black if they are not already
    for (i = 6; i < 11; i += 1) {
        life = document.querySelector("#L" + i.toString());
        if (!life.classList.contains("flip")) {
            setTimeout(flipElement, time, "#L" + i.toString());
            time = time + timeOffset;
        }
    }
    ask();
}

function gameDataObject() {
    this.question = 0;
    this.lastQuestion = 0;
    this.life = 5;
    this.defaultLifeCount = 5;
    this.winningStreak = 0;
    this.level = 1;
}

function defaultConfig() {
    this.questionId = "question";
    this.starsContainerId = "starsContainer";
    this.answerContainerId = "answerContainer";
}

function ask() {
    var questionbox = document.getElementById("question");
    var starsContainer = document.getElementById("starsContainer");
    var question = randomIntFromInterval(1, 9);
    var starContent = "";
    var i = 0;

    updateElementById(10, "sumBubble");
    updateElementById("?", "answerbubble");
    if (stats.life > 0 && stats.life < 10) {
        // Give a new question if life is 1-9
        questionbox.innerHTML = question;
        stats.question = question;
    } else if (stats.life > 9) {
        // If life is 10+ display star and reset lives with init()
        stats.winningStreak += 1;
        for (i = 0; i < stats.winningStreak; i += 1) {
            starContent = starContent + "&#9733;";
        }
        starsContainer.innerHTML = starContent;
        starsContainer.className += " visible";
        stats.life = stats.defaultLifeCount;
        init();
    } else {
        // If lives are 0 start a new round
        stats.life = stats.defaultLifeCount;
        console.log(stats.life);
        console.log("Entered 0 lives case");
        init();
    }
}

function answer(userInput) {
    updateElementById(userInput + stats.question, "sumBubble");
    if (stats.question + userInput === 10) {
        stats.life += 1;
        playSound("audio/success.wav");
        flipElement("#L" + stats.life);
    } else {
        flipElement("#L" + stats.life);
        stats.life -= 1;
    }
    stats.lastQuestion = stats.question;
    setTimeout(ask, 2000);
}

function randomIntFromInterval(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1) + min);
    if (number === stats.lastQuestion) {
        number = randomIntFromInterval(min, max);
    }
    return number;
}

function updateAnswerBubble(id) {
    var element = document.getElementById("answerbubble");
    element.innerHTML = id;
}

function clearAnswerBubble() {
    var element = document.getElementById("answerbubble");
    element.innerHTML = "?";
}

function updateElementById(newContent, id) {
    var element = document.getElementById(id);
    element.innerHTML = newContent;
}

function playSound(file) {
    var snd = new Audio(file);
    snd.play();
}

function flipElement(id) {
    var element = "";
    element = document.querySelector(id.toString());
    element.classList.toggle("flip");
}
