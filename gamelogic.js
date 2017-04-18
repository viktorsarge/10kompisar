"use strict";

function init() {
    var life = "";
    var i = 0;
    var time = 300;
    var timeOffset = 300;

    // Flip life 1-5 to white if not already white
    for (i = 1; i < 6; i += 1) {
        life = document.querySelector("#L" + i.toString());
        if (life.classList.contains("flip")) {
            setTimeout(flipElement, time, "#L" + i.toString());
            time = time + timeOffset;
        }
    }

    // Flip life 6-10 to black if not already black.
    for (i = 6; i < 11; i += 1) {
        life = document.querySelector("#L" + i.toString());
        if (!life.classList.contains("flip")) {
            setTimeout(flipElement, time, "#L" + i.toString());
            time = time + timeOffset;
        }
    }
    askNewQuestion();
}

function gameDataObject() {
    this.question = 0;
    this.lastQuestion = 0;
    this.life = 5;
    this.defaultLifeCount = 5;
    this.winningStreak = 0;
    this.level = 1;
    this.acceptingAnswers = false;
}

function defaultConfig() {
    this.questionId = "question";
    this.starsContainerId = "starsContainer";
    this.answerContainerId = "answerContainer";
}

function askNewQuestion() {
    var questionbox = document.getElementById("question");
    var starsContainer = document.getElementById("starsContainer");
    var question = randomIntFromInterval(1, 9);
    var starContent = "";
    var i = 0;

    updateElementById("sumBubble", 10);
    updateElementById("answerbubble", "?");
    if (stats.life > 0 && stats.life < 10) {
        // Give a new question if life is 1-9
        questionbox.innerHTML = question;
        stats.question = question;
        stats.acceptingAnswers = true;
    } else if (stats.life > 9) {
        // If life is 10+ display star and reset lives with init()
        stats.winningStreak += 1;
        for (i = 0; i < stats.winningStreak; i += 1) {
            starContent = starContent + "&#9733;";
        }
        starsContainer.innerHTML = starContent;
        starsContainer.className += " visible";
        stats.life = stats.defaultLifeCount;
        stats.acceptingAnswers = true;
        init();
    } else {
        // If lives are 0 start a new round
        stats.life = stats.defaultLifeCount;
        stats.acceptingAnswers = true;
        init();
    }
}

function answer(userInput) {
    stats.acceptingAnswers = false;
    updateElementById("sumBubble", userInput + stats.question);
    if (stats.question + userInput === 10) {
        stats.life += 1;
        playSound("audio/success.wav");
        flipElement("#L" + stats.life);
    } else {
        flipElement("#L" + stats.life);
        stats.life -= 1;
    }
    stats.lastQuestion = stats.question;
    if (userInput + stats.question === 10) {
        setTimeout(askNewQuestion, 500);
    } else {
        setTimeout(askNewQuestion, 2000);
    }
}

function randomIntFromInterval(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1) + min);
    if (number === stats.lastQuestion) {
        number = randomIntFromInterval(min, max);
    }
    return number;
}

function updateAnswerBubble(id) {
    if (stats.acceptingAnswers) {
        var element = document.getElementById("answerbubble");
        element.innerHTML = id;
    }
}

function clearAnswerBubble() {
    if (stats.acceptingAnswers) {
        var element = document.getElementById("answerbubble");
        element.innerHTML = "?";
    }
}

function updateElementById(id, newContent) {
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
