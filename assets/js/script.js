// buttons start
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById('next-btn');
var answerButtonsElement = document.getElementById('answer-buttons');
var sbtScore = document.getElementById('btn-sbt');
// buttons end
// containers/text start
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var mainBack = document.getElementById('main');
var timerElement = document.getElementById("timer-count");
var textGame = document.getElementById('gameText');
var finish = document.getElementById('endGame');
var theTitle = document.getElementById('result-text');
var displaySCore = document.getElementById('score-count');
var userInitials = document.getElementById('initials');
var mainC = document.getElementById('main-container');
// containers/text end

var timer;
var timerCount;
var questionDelay;
var score;

console.log(timerElement);

// once button start click it will invoke the start function
startButton.addEventListener('click', startGame);
// submit score button
sbtScore.addEventListener("click" ,setScore);

var shuffledQuestions, currentQuestionIndex

// start game function
function startGame(){
    console.log("Started");
    // hides about game text
    textGame.classList.add('hide');
    // this sets score to 0
    score = 0;
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
    // this will set the text red once timer is running out
    if(timerCount < 4){
        timerElement.setAttribute('style', 'color:red;');
    }
    // just fixing text to singular once it gets to one
    if(timerCount === 1){
        timerElement.textContent = timerCount + " second left"; 
    }
    // this will clear the interval once it gets to 0 and change text
    if(timerCount <= 0) {
        // Clears interval
        mainC.classList.add('hide');
        timerElement.textContent = "Time's UP!"; 
        clearInterval(timer);
        loseGame();
        
    }
    }, 1000);
}
function loseGame(){
    resetState();
    finish.classList.remove('hide');
    document.getElementById('endGame').setAttribute("styles", "padding:20px;")

    displaySCore.innerText = score + "/" + questions.length;
    // good score = well done
    theTitle.innerText = "Time's UP!";
    document.querySelector('#result-text').setAttribute("style", "position: unset;")
    
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
    // nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

// this will disable the buttons once answer selected
function stop(){  
    var elems = document.getElementsByClassName("btn");
    for(var i = 0; i < elems.length; i++) {
    elems[i].disabled = true;
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
        
        // nextButton.classList.remove('hide');
        currentQuestionIndex++;        
        setTimeout(setNextQuestion, 1000);
        // if right answer selected adds one point to score
        if(correct){
            score++;
            console.log(score); 
        }else{
            timerCount-= 5;
            console.log(score); 
        }
        
    // end game and show score submit form
    } else {
        // if right answer selected adds one point to score
        if(correct){
            score++;
            console.log(score); 
        }else{
            timerCount-= 5;
            console.log(score); 
        }
        // function when game ends will take one sec to happen
        setTimeout(function(){
            mainC.classList.add('hide');
            // stops timer once all questions have been answered
            clearInterval(timer);            
            resetState();
            // this will bring form of the end game up
            finish.classList.remove('hide');
            // this set the score text
            displaySCore.innerText = score + "/" + questions.length;
            // good score = well done
            if(score > 1){
                theTitle.innerText = 'Well Done!';                
            }else if(timerCount <= 0){
                theTitle.innerText = "Time's UP!";
                document.querySelector('#result-text').setAttribute("style", "position: unset;")
            }

            else {
                theTitle.innerText = 'Better Luck Next Time!';
                document.querySelector('#result-text').setAttribute("style", "left: 210px;")
            }
        }, 300);
    }
}

// this will change background color depending on selected answer
function setStatusClass(mainBack, correct){
    clearStatusClass(mainBack);
//  if correct answer selected, background will turn green
    if (correct){
        mainBack.classList.add('correct');
        stop();            
//  if wrong awnswer selected, background will turn red 
    }else{
        mainBack.classList.add('wrong');
        stop();     
    }
}

// this will save score locally

function setScore(){
    var scoreLocal = {
        initials: userInitials.value.trim(),
        score: score
    };
    localStorage.setItem("scoreLocal", JSON.stringify(scoreLocal));
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
            {text: '22', correct: false},
            {text: '2', correct: false},
            {text: '6', correct: false}
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
