var startButton = document.getElementById("start-btn");
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');


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

    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){

    questionElement.innerText = question.question;
}

function selectAnswer(){

}

var questions = [
    {
        question: 'What is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    }
]
