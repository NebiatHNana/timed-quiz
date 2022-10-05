
let btnScoreEl = document.querySelector("#btn-score");
let containerEl = document.querySelector(".container");
let textEl = document.querySelector("#text");
let quizEl = document.querySelector("#quiz");
let answerEl = document.querySelector("#answers");
let assesmentEl = document.querySelector("#assesment");
let submitEl = document.querySelector("#submit");
let scoreListEl = document.querySelector(".score-list");
let returnEl = document.querySelector("#return");
let clearScoreEl = document.querySelector("#clear-score");
let finishEl = document.querySelector("#finish-page");
let text2 = document.querySelector("#text2");
let scorePageEl = document.querySelector("#score-page");

let clockEl = document.querySelector(".clockr");
let second = 100;
let countIn;
function startClockr() {
    pause();
    countIn = setInterval(() => { clockr(); }, 1000);
}

function pause() {
    clearInterval(countIn);
}

function reset() {
    second = 100;
    document.getElementById('second').innerText = '100';
}


function clockr() {
    if ((second = second-1) == 0 || second < 0) {
        second = 0;
        window.alert("You ran out of clock! Try again")
        resetState();
        styleReset();
        endPage();
    }
    document.getElementById('second').innerText = returnData(second);
}

function penalty() {
    second = second - 10;
    document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
    return input > 10 ? input : `0${input}`
}

const pages = [
    intro = {
        quiz: "Coding Quiz Challenge",
        text: "Try to answer the following code-related quizs within the clock limit. Keep in mind that incorrect answers will penalize your score/clock by ten seconds",
        answer: "Begin test!"
    },

    end = {
        quiz: "All done!",
        text: "Your final score is",
        text2: "Enter initials:"
    },

    scorePageInfo = {
        quiz: "High scores",
    }
]
const quizs = [
    {
        quiz: "Commonly used data type DO Not Include;",
        answers: [
            { text: "alerts", correct: false },
            { text: "string", correct: false },
            { text: "booleans", correct: true },
            { text: "numbers", correct: false },
        ]
    },

    {
        quiz: "The considiton in an if / else statement is enclosed with ________.",
        answers: [
            { text: "parenthesis", correct: true },
            { text: "quotes", correct: false },
            { text: "curly brackets", correct: false },
            { text: "square brackets", correct: false },
        ]
    },

    {
        quiz: "Arrays in JavaScript can be used to store ________.",
        answers: [
            { text: "other arrays", correct: false },
            { text: "numbers and strings", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true },
        ]
    },

    {
        quiz: "String values must be enclosed within ________ when being assigned to variables.",
        answers: [
            { text: "parenthesis", correct: false },
            { text: "commas", correct: false },
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: true },
        ]
    },

    {
        quiz: "A very useful tool used during development and debugging for printing container to the debugger is:",
        answers: [
            { text: "console.log", correct: true },
            { text: "terminal/bash", correct: false },
            { text: "JavaScript", correct: false },
            { text: "for loops", correct: false },
        ]
    },
]


btnScoreEl.addEventListener("click", function () {
    loadData();
    resetState();
    styleReset();
    finishEl.style.display = "none"
    text2.style.display = "none"
    text.style.display = "none"
    scorePageEl.style.display = "block"
    scorePage();
})



function startPage() {
  
    quizEl.innerHTML = pages[0].quiz;

    textEl.innerHTML = pages[0].text
    textEl.style.display = "block"

    var startBtn = document.createElement("button");
    startBtn.className = "main-btn btn";
    startBtn.id = "startBtn"
    startBtn.innerHTML = pages[0].answer;
    answerEl.appendChild(startBtn);


    containerEl.style.textAlign = "center"
    startBtn.style.textAlign = "center"
    startBtn.style.width = "auto"
    startBtn.style.margin = "auto"


    startBtn.addEventListener("click", styleReset);
    startBtn.addEventListener("click", startClockr);
    startBtn.addEventListener("click", nextquiz);
}


function nextquiz() {
    resetState();
    counter();
}


function resetState() {
    while (answerEl.firstChild) {
        answerEl.removeChild
            (answerEl.firstChild)
    }
}
function styleReset() {
    try {
        containerEl.style.textAlign = ""
        startBtn.style.textAlign = ""
        startBtn.style.width = ""
        startBtn.style.margin = ""
        textEl.style.display = "none"
    } catch (err) {
        containerEl.style.textAlign = ""
        button = display = "none"
        assesmentEl.style.display = "none"
    }

}

var count = 0;

function counter() {
    quizsBuild(count);

    function quizsBuild(value) {
        quizEl.innerHTML = quizs[value].quiz;

        quizs[value].answers.forEach(answer => {
            const button = document.createElement("button")
            button.innerText = answer.text
            button.className = "main-btn btn"
            if (answer.correct) {
                button.dataset.correct = answer.correct
                button.addEventListener("click", checkTrue)
            } else {
                button.addEventListener("click", checkFalse)
            }
            answerEl.appendChild(button)
        })
    }

    function checkTrue() {
        assesmentEl.style.display = "block"
        assesmentEl.innerHTML = "True"
        if (count < 4) {
            count++
            nextquiz();
        } else {
            resetState();
            styleReset();
            endPage();
        }
    }

    function checkFalse() {
        assesmentEl.style.display = "block"
        assesmentEl.innerHTML = "False"
        penalty();
    }

}


function loadData() {
    if ("data" in localStorage) {
        array = localStorage.getItem('data');
        array = JSON.parse(array);
    }
    else {
        array = []
    }
}


function endPage() {
    pause();
    finishEl.style.display = "flex"
    textEl.style.display = "block"

    quizEl.innerHTML = pages[1].quiz;


    textEl.innerHTML = pages[1].text + " " + second + " ."

    textEl.style.textAlign = "left"


    submitEl.addEventListener("click", function () {
        var name = document.querySelector('input').value
        if (!name) {
            window.alert("Please insert your initials to continue")
        }
        else {
            loadData();
            userData = {}
            userData.name = name;
            userData.score = second;
            array.push(userData);
            saveData();
        }
    })
}


function saveData() {
    localStorage.setItem("data", JSON.stringify(array));
    console.log(array);
    scorePage();
}


function clearData() {
    localStorage.clear();
}


function scorePage() {
    quizEl.innerHTML = pages[2].quiz;
    pause();

    btnScoreEl.style.display = "none"

    array = localStorage.getItem('data');
    array = JSON.parse(array);

 
    function compare(a, b) {
        const scoreA = a.score;
        const scoreB = b.score;

        let comparison = 0;
        if (scoreA < scoreB) {
            comparison = 1;
        }
        else if (scoreA > scoreB) {
            comparison = -1;
        }
        return comparison;
    }

    try {
        array.sort(compare);

       
        for (let i = 0; i < array.length; i++) {
            let li = document.createElement("li");
            li.innerText = (i + 1) + "." + array[i].name + "-    " + array[i].score;
            scoreListEl.appendChild(li);
        }

    } catch {
        window.alert("There are no scores!")
    }

    finishEl.style.display = "none"
    text2.style.display = "none"
    scorePageEl.style.display = "block"

    
    clearScoreEl.addEventListener("click", function () {
        clearData();
        restart();
    });

    returnEl.addEventListener("click", function () {
        restart();
    });
}


function restart() {
    location.reload(true)
}


startPage();