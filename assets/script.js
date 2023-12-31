const questions = [
    {
        question: "Commonly used data types DO Not include:",
        answers: [
            "Strings",
            "Booleans",
            "Alerts",
            "Numbers"
        ],
        correctAnswer: 2
    },
    {
        question: "The condition in an if / else statement is enclosed with _______",
        answers: [
            "Quotes",
            "Curly brackets",
            "Parenthesis",
            "Square brackets"
        ],
        correctAnswer: 0
    },
    {
        question: "Arrays in JavaScript can be used to store _______",
        answers: [
            "Numbers and strings",
            "Other arrays",
            "Booleans",
            "All of the above"
        ],
        correctAnswer: 2
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answers: [
            "Commas",
            "Curly brackets",
            "Quotes",
            "Parentheses"
        ],
        correctAnswer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            "JavaScript",
            "Terminal/bash",
            "For loops",
            "console.log"
        ],
        correctAnswer: 3
    },
];

let currentQuestionIndex = 0;
let timer = 60;
let correctAnswers = 0;
let totalQuestions = questions.length;

const timerElement = document.getElementById("timer");
const questionText = document.getElementById("question-text");
const options = document.getElementById("options");
const wrongAnswer = document.getElementById("wrong-answer");
const viewScores = document.getElementById("view-scores");

const beginQuizSection = document.querySelector(".begin-quiz");
const startQuizButton = document.getElementById("start-quiz");
const questionsSection = document.querySelector(".questions");
const scoreSection = document.getElementById("game-over");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const highScoresSection = document.querySelector(".high-scores");
const highScoresList = document.getElementById("high-scores-list");
const goBackButton = document.getElementById("go-back");
const clearScoresButton = document.getElementById("clear-scores");

let highScores = []; 

startQuizButton.addEventListener("click", startQuiz);

        function startQuiz() {
            beginQuizSection.style.display = "none"; // Hide the "begin-quiz" section
            questionsSection.style.display = "block";
            startTimer();
            showQuestion(currentQuestionIndex);
}

function showQuestion(questionIndex) {
            const question = questions[questionIndex];
            questionText.textContent = question.question;

            options.innerHTML = '';

            question.answers.forEach((answer, index) => {
                const button = document.createElement("button");
                button.classList.add("option");
                button.textContent = `${index + 1}. ${answer}`;
                button.dataset.index = index;
                button.addEventListener("click", handleAnswerClick);
                options.appendChild(button);
            });
}

function handleAnswerClick(event) {
            const selectedAnswerIndex = parseInt(event.target.dataset.index);
            if (selectedAnswerIndex === questions[currentQuestionIndex].correctAnswer) {
                correctAnswers++;
                wrongAnswer.style.display = "block";
                wrongAnswer.textContent = "Right!";
            } else {
                timer -= 10; // Deduct 10 seconds for an incorrect answer
                wrongAnswer.style.display = "block";
                wrongAnswer.textContent = "Wrong!";
                if (timer < 0) {
                    timer = 0;
                }
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < totalQuestions) {
                showQuestion(currentQuestionIndex);
            } else {
                finalTimerValue = timer;
                endGame();
            }
}

let finalTimerValue = 0;

function startTimer() {
    const countdown = setInterval(function () {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(countdown);
            finalTimerValue = timer;
            endGame();
        }
    }, 1000);
}

function endGame() {
    questionsSection.style.display = "none";
    scoreSection.style.display = "block";
    document.getElementById("final-score").textContent = correctAnswers;
}


submitScoreButton.addEventListener("click", function () {
    const initials = initialsInput.value;
    if (initials) {
        const score = {
            initials: initials,
            score: correctAnswers
        };
        highScores.push(score); 
        updateHighScoresList(); 
        showHighScores();
    }
});

goBackButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    timer = 60;
    correctAnswers = 0;
    highScoresSection.style.display = "none";
    showQuestion(currentQuestionIndex);
    startQuiz();
});


viewScores.addEventListener("click", function () {
    timer = 60;
    timerElement.textContent = timer;

    beginQuizSection.style.display = "none";
    questionsSection.style.display = "none";
    scoreSection.style.display = "none";
    highScoresSection.style.display = "block";
});

clearScoresButton.addEventListener("click", function () {
    highScores = [];
    updateHighScoresList();
});

function updateHighScoresList() {
    highScores.sort((a, b) => b.score - a.score);

    highScoresList.innerHTML = '';

    highScores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highScoresList.appendChild(listItem);
    });
}

function showHighScores() {
    beginQuizSection.style.display = "none";
    questionsSection.style.display = "none";
    scoreSection.style.display = "none";
    highScoresSection.style.display = "block";
}

if (scoreSection.style.display === "block") {
    highScoresSection.style.display = "none";
}

