var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');

var mainBack = document.getElementById('main');

console.log(mainBack)

startButton.addEventListener('click', startGame);

var shuffledQuestions, currentQuestionIndex

function startGame(){
    console.log("Started");
    startButton.classList.add('hide');

    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();

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
}

function setStatusClass(mainBack, correct){
    clearStatussClass(mainBack);
    if (correct){
        mainBack.classList.add('correct');
    }else{
        mainBack.classList.add('wrong');
    }
}

function clearStatussClass(mainBack){
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
    }
]

console.log(document);