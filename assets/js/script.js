// buttons start
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById('next-btn');
var answerButtonsElement = document.getElementById('answer-buttons');
// buttons end
// containers/text start
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var mainBack = document.getElementById('main');
var timerElement = document.getElementById("timer-count");
// containers/text end

var timer;
var timerCount;
var questionDelay;

console.log(timerElement);

// once button start click it will invoke the start function
startButton.addEventListener('click', startGame);

// no need for next button for now! but keep the code in mind
// nextButton.addEventListener('click', () =>{
//     currentQuestionIndex++;
//     setNextQuestion();
// })

var shuffledQuestions, currentQuestionIndex

// start game function
function startGame(){
    console.log("Started");
    // this will set timer to 10 sec once game started
    timerCount = 10;
    // this will hide the start button game
    startButton.classList.add('hide');
    // this will display timer once game started
    timerElement.classList.remove('hide');
    // this will start the timer
    startTimer();
    // this will get a random question out of the questions array
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    // this will make the questions and answers visible
    questionContainerElement.classList.remove('hide');
    // this will get the next question ready
    setNextQuestion();
}

// timer function, still not quite ready
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
    // this will set the text red once timer is running out
    if(timerCount < 4){
        timerElement.setAttribute('style', 'color:red;');
    }
    // just fixing text to singular once it gets to one
    if(timerCount === 1){
        timerElement.textContent = timerCount + " second left"; 
    }
    // this will clear the interval once it gets to 0 and change text
    if(timerCount === 0) {
        // Clears interval
        timerElement.textContent = "Time's UP!"; 
        clearInterval(timer);
        // loseGame();
        
    }
    }, 1000);
  }

//  this sets the next question
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

// this reset questions/answers buttons
function resetState(){
    clearStatusClass(mainBack);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}


// this will get a question/answer from array
function selectAnswer(e){
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(mainBack, correct);
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    });

    // this will get next question(if available) once answer selected
    if(shuffledQuestions.length > currentQuestionIndex +1){
        
        nextButton.classList.remove('hide');
        currentQuestionIndex++;
        setTimeout(setNextQuestion, 1000);
        
    // restart button will show up once question is answered and
    //  there's no more questions  left  
    } else {
        startButton.innerText = 'Restart'; 
        startButton.classList.remove('hide');
    }
}

// this will change background color depending on selected answer
function setStatusClass(mainBack, correct){
    clearStatusClass(mainBack);
//  if correct answer selected, background will turn green
    if (correct){
        mainBack.classList.add('correct');            
//  if wrong awnswer selected, background will turn red 
    }else{
        mainBack.classList.add('wrong');     
    }
}

// this resets the background to original color by removing the classes
function clearStatusClass(mainBack){
    mainBack.classList.remove('correct');
    mainBack.classList.remove('wrong'); 
}

// array with questions and answers
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
