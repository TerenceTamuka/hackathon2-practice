const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progresBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
       question: 'What is the capital of France?',
       choice1: 'Paris',
       choice2: 'Madrid',
       choice3: 'Berlin',
       choice4: 'London',
       answer: 1,
    },
    {
        question: 'Which country is known as the Land of the Rising Sun?',
        choice1: 'China',
        choice2: 'Japan',
        choice3: 'India',
        choice4: 'Thailand',
        answer: 2,
     },
     {
        question: 'What is the chemical symbol for water?',
        choice1: 'H2O',
        choice2: 'O2',
        choice3: 'CO2',
        choice4: 'NaCl',
        answer: 1,
     },
     {
        question: 'Who wrote the play "Romeo and Juliet"?',
        choice1: 'William Shakespeare',
        choice2: 'Charles Dickens',
        choice3: 'Mark Twain',
        choice4: 'Jane Austen',
        answer: 1,
     },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {

    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progresBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {

    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)

        
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()