let startBtn = document.querySelector(".start-btn"),
instructionCard = document.querySelector(".instruction"),
instructionExit = document.querySelectorAll(".instruction button")[0],
startQuizBtn = document.querySelectorAll(".instruction button")[1],
wrapper = document.querySelector(".wrapper"),
nxtBtn = document.querySelector(".btn button"),
resultCard = document.querySelector(".result-card"),
time = document.querySelectorAll(".Timer p")[1],
progressBar = document.querySelector(".inner"),
questionEl = document.querySelector(".question-container"),
answerContainer = document.querySelector(".option-container"),
currentQuestionNum = document.querySelector(".current-question"),
totalQuestion = document.querySelector(".total-question"),
totalScore = document.querySelector(".total-score .value"),
yourScore = document.querySelector(".user-score .value"),
unattempted = document.querySelector(".unattempted .value"),
attempted = document.querySelector(".attempted .value"),
wrong = document.querySelector(".wrong .value"),
replayQuiz = document.querySelectorAll(".score-btn button")[0]
exitQuiz = document.querySelectorAll(".score-btn button")[1];

let currentQuestion = 0;
let userAnswers = [];
let timer,
  progressInterval,
  width = 1,
  score = 0,
  attemptQuestion = 0,
  unattemptedQuestion = 0,
  wrongQuestion = 0;

replayQuiz.addEventListener("click",()=>{
  resultCard.style.width = "0"
  resultCard.style.transform = "scale(0)"
  wrapper.style.transform = "scale(1)"
  wrapper.style.width = "100%"
  currentQuestion = 0
  score = 0,
    attemptQuestion = 0,
    unattemptedQuestion = 0,
    wrongQuestion = 0;
  startQuiz();
})
exitQuiz.addEventListener("click",()=>{
  resultCard.style.width = "0"
  resultCard.style.transform = "scale(0)"
  currentQuestion = 0
  score = 0,
    attemptQuestion = 0,
    unattemptedQuestion = 0,
    wrongQuestion = 0;
    startBtn.style.transform = "scale(1)"
    startBtn.style.width = "100%"
})

startBtn.addEventListener("click",()=>{
  instructionCard.style.transform="scale(1)"
  instructionCard.style.width="100%"
  instructionCard.style.opacity="1"
  startBtn.style.transform="scale(0)"
  startBtn.style.width="0"
})

instructionExit.addEventListener("click",()=>{
  instructionCard.style.transform = "scale(0)"
  instructionCard.style.width = "0%"
  startBtn.style.transform = "scale(1)"
  startBtn.style.width = "100%"
})

startQuizBtn.addEventListener("click",()=>{
  
  wrapper.style.transform="scale(1)"
  wrapper.style.width="100%"
  instructionCard.style.transform = "scale(0)"
  instructionCard.style.width = "0%"
  startQuiz()
})

const questions = [  
  { question: "What is the capital city of Australia?",    
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "2"
  },
  {
    question: "Who wrote the Harry Potter book series?",
    options: ["J.K. Rowling", "George R.R. Martin", "Stephen King", "Dan Brown"],
    answer: "0"
  },
  {
    question: "What is the smallest planet in our solar system?",
    options: ["Mars", "Venus", "Mercury", "Jupiter"],
    answer: "2"
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue whale", "Giraffe", "Hippopotamus"],
    answer: "1"
  },
  {
    question: "Who painted the famous artwork 'The Starry Night'?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
    answer: "1"
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Lungs"],
    answer: "2"
  },
  {
    question: "Which planet is closest to the sun?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    answer: "1"
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Sahara Desert", "Gobi Desert", "Arabian Desert", "Antarctic Desert"],
    answer: "3"
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Lion", "Tiger", "Leopard", "Jaguar"],
    answer: "0"
  },
  {
    question: "Who is the current President of the United States?",
    options: ["Barack Obama", "Donald Trump", "Joe Biden", "George W. Bush"],
    answer: "1"
  }
];

function startQuiz() {
    displayQuestion(currentQuestion);
    timer = setInterval(updateTimer, 1000);
    updateProgress();
}

function displayQuestion(questionIndex) {
  updateProgress()
    let question = questions[questionIndex].question;
    let options = questions[questionIndex].options;
    questionEl.innerHTML = question;
    for (let i = 0; i < options.length; i++) {
        let option = `<option onclick = checkAnswer(${i})>${options[i]} </option>`
        answerContainer.insertAdjacentHTML("beforeend",option)
    }
}

function checkAnswer(selectedIndex) {
    attemptQuestion++;
    answerContainer.style.pointerEvents="none"
    clearInterval(timer);
    let selectedAnswer = questions[currentQuestion].options[selectedIndex];
    let correctAnswer = questions[currentQuestion].options[questions[currentQuestion].answer];
    if (selectedAnswer === correctAnswer) {
      score++;
     setTimeout(()=>{
       document.querySelectorAll("option")[selectedIndex].style.backgroundColor = "#37BB1169"
       document.querySelectorAll("option")[selectedIndex].style.color = "#fff"
       document.querySelectorAll("option")[selectedIndex].style.borderColor = "green"
     },100)
       userAnswers[currentQuestion] = selectedIndex; 
    } else {
      wrongQuestion++;
       setTimeout(()=>{
       document.querySelectorAll("option")[selectedIndex].style.backgroundColor = "#B6141469"
       document.querySelectorAll("option")[selectedIndex].style.color = "#fff"
       document.querySelectorAll("option")[selectedIndex].style.borderColor = "red"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.backgroundColor="#37BB1169"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.color="#fff"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.borderColor="green"
     },100)
    }
}

function nextQuestion() {
    answerContainer.style.pointerEvents="initial"
    time.innerHTML="15"
    updateProgress()
    timer = setInterval(updateTimer, 1000);
    answerContainer.innerHTML=""
    if (currentQuestion === questions.length - 1) {
      resultCard.style.width="300px"
      resultCard.style.transform="scale(1)"
      totalScore.innerHTML = questions.length
      yourScore.innerHTML = score
      attempted.innerHTML = attemptQuestion
      unattempted.innerHTML = unattemptedQuestion
      wrong.innerHTML = wrongQuestion
      wrapper.style.width="0"
      wrapper.style.transform="scale(0)"
        endQuiz();
    } else {
        currentQuestion++;
        currentQuestionNum.innerHTML=currentQuestion + 1
        displayQuestion(currentQuestion);
    }
}

function updateTimer() {
    let remainingTime = parseInt(time.innerHTML) - 1;
    time.innerHTML = remainingTime > 9 ? remainingTime : "0" + remainingTime;
    if (remainingTime === 0) {
      unattemptedQuestion++;
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.backgroundColor = "#37BB1169"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.color = "#fff"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.borderColor = "green"
      answerContainer.style.pointerEvents="none"
        endQuiz();
    }
}

function updateProgress() {
 progressBar.style.width = (currentQuestion + 1)/questions.length * 100 + "%";
 
 ;
}

function endQuiz() {
    clearInterval(timer); 
}

nxtBtn.addEventListener("click",nextQuestion);
totalQuestion.innerHTML = questions.length
currentQuestionNum.innerHTML=currentQuestion + 1
