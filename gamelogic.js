function randomIntFromInterval (min, max) {
    var number = Math.floor(Math.random() * (max - min + 1) + min);
    if (number === stats.lastQuestion) {
        number = randomIntFromInterval (min, max);
    }
    return number
}

function init() {
    var life = "";
    var i = 0;
    var time = 300;
    var offset = 300;
    // Set first five to white if the have been flipped to black
    for (i = 1; i < 6; i += 1) {
        life = document.querySelector("#L" + i.toString());
        if (life.classList.contains("flip")){
            setTimeout(flipLife, time, i);
            time = time + offset;
        }
    }

    // Set life 6-10 to black if they are not already
    for (i = 6; i < 11; i +=1) {
        life = document.querySelector("#L" + i.toString());
        if (!life.classList.contains("flip")){
            setTimeout(flipLife, time, i);
            time = time + offset;
        }
    }
    ask();
} 

function world() {
    this.question = 0;
    this.lastQuestion = 0;
    this.life = 5;
    this.defaultLifeCount = 5;
    this.winningStreak = 0;
    this.level = 1; 
}

function ask() {
    var questionbox = document.getElementById("question");
    var question = randomIntFromInterval (1,9);
    var starSpans = document.getElementsByClassName("stars");
    var starContent = "";
    var i = 0;
    var j = 0;
    if (stats.life > 0 && stats.life < 10){
        questionbox.innerHTML = question;
        stats.question = question;
    } else if (stats.life > 9) {
        stats.winningStreak += 1;
        for (i = 0; i < stats.winningStreak;  i += 1) {
            starContent = starContent + "&#9733;";
        }
        for (j = 0; j < starSpans.length; j += 1 ) {
            starSpans[j].innerHTML = starContent;
            starSpans[j].className += " visible";
        }
        stats.life = stats.defaultLifeCount;
        init();
    } else 
    {
        stats.life = stats.defaultLifeCount;;
        init();
    }
}

function answer(userInput) {
    if (stats.question + userInput == 10) {
        stats.life += 1;
        var snd = new Audio("audio/success.wav");
        snd.play();
        flipLife(stats.life);
    } else {
        flipLife(stats.life);
        stats.life -= 1;
    }
    //renderLife();
    stats.lastQuestion = stats.question;
    ask();
}

/*
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
*/ 

function flipLife(id) {
    var bullet = "";
    bullet = document.querySelector("#L" + id.toString());
    bullet.classList.toggle("flip");
    console.log(id);
}
