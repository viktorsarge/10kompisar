function randomIntFromInterval (min, max) {
    var number = Math.floor(Math.random() * (max - min + 1) + min);
    if (number === stats.lastQuestion) {
        number = randomIntFromInterval (min, max);
    }
    return number
}

function init() {
    var i = 0;
    var life = ""
    for (i = 1; i < 6; i += 1){
        life = document.getElementById(i);
        life.innerHTML = "&#9898;";
    }
    for (i = 10; i > 5; i -= 1){
        life = document.getElementById(i);
        life.innerHTML = "&#9899;";
    }
    ask();
   
} 

function world() {
    this.question = 0;
    this.lastQuestion = 0;
    this.life = 5;
}

function ask() {
    if (stats.life > 0 && stats.life < 10){
        var questionbox = document.getElementById("question");
        var question = randomIntFromInterval (1,9);
        questionbox.innerHTML = question;
        stats.question = question;
    } else {
        stats.life = 5;
        init();
    }
}

function answer(userInput) {
    if (stats.question + userInput == 10) {
        stats.life += 1;
    } else {
        stats.life -= 1;
    }
    renderLife();
    stats.lastQuestion = stats.question;
    ask();
}

function renderLife() {
    var i = 0; 
    var life = ""
    for (i = 1; i < 11; i += 1) {
        life = document.getElementById(i);
        life.innerHTML = "&#9899;"        
    }
    for (i = 1; i < stats.life + 1; i += 1) {
        life = document.getElementById(i);
        life.innerHTML = "&#9898;"        
    }
} 