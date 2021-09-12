var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');

var mainBack = document.getElementById('main');

var timerElement = document.getElementById("timer-count");
var timer;
var timerCount;

console.log(timerElement);


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () =>{
    currentQuestionIndex++;
    setNextQuestion();
})

var shuffledQuestions, currentQuestionIndex

function startGame(){
    console.log("Started");
    timerCount = 10;
    startButton.classList.add('hide');
    timerElement.classList.remove('hide');
    startTimer();

    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount + " seconds left";
    //   if (timerCount >= 0) {
    //     // Tests if win condition is met
    //     if (isWin && timerCount > 0) {
    //       // Clears interval and stops timer
    //       clearInterval(timer);
    //     //   winGame();
    //     }
    //   }
    //   // Tests if time has run out
    if(timerCount < 4){
        timerElement.setAttribute('style', 'color:red;');
    }
    if(timerCount === 1){
        timerElement.textContent = timerCount + " second left"; 
    }
    if(timerCount === 0) {
        // Clears interval
        timerElement.textContent = "Time's UP!"; 
        clearInterval(timer);
        // loseGame();
        
    }
    }, 1000);
  }

function setNextQuestion(){

    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
//  this displays questions
    questionElement.innerText = question.question;

    // this displays answers
    question.answers.forEach(answer =>{
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })

}

function resetState(){
    clearStatusClass(mainBack);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}



function selectAnswer(e){
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(mainBack, correct);
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    });

    if(shuffledQuestions.length > currentQuestionIndex +1){
        
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart'; 
        startButton.classList.remove('hide');
    }
}

function setStatusClass(mainBack, correct){
    clearStatusClass(mainBack);
    if (correct){
        mainBack.classList.add('correct');               
    }else{
        mainBack.classList.add('wrong');        
    }
}

function clearStatusClass(mainBack){
    mainBack.classList.remove('correct');
    mainBack.classList.remove('wrong'); 
}


var questions = [
    {
        question: 'What is 2 + 2 ?',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    },
    {
        question: 'What is 4 * 2 ?',
        answers: [
            {text: '22', correct: false},
            {text: '42', correct: false},
            {text: '8', correct: true},
            {text: '20', correct: false}
        ]
    }
];
