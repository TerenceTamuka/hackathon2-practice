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
        question: 'What is the largest ocean on Earth?',
        choice1: 'Atlantic Ocean',
        choice2: 'Indian Ocean',
        choice3: 'Arctic Ocean',
        choice4: 'Pacific Ocean',
        answer: 4,
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
        question: 'What is the powerhouse of the cell?',
        choice1: 'Nucleus',
        choice2: 'Mitochondria',
        choice3: 'Ribosome',
        choice4: 'Endoplasmic Reticulum',
        answer: 2,
     },
     {
        question: 'Who painted the Mona Lisa?',
        choice1: 'Vincent van Gogh',
        choice2: 'Leonardo da Vinci',
        choice3: 'Pablo Picasso',
        choice4: 'Claude Monet',
        answer: 2,
    },
    {
        question: 'Who discovered penicillin?',
        choice1: 'Marie Curie',
        choice2: 'Alexander Fleming',
        choice3: 'Isaac Newton',
        choice4: 'Albert Einstein',
        answer: 2,
    },
    {
        question: 'In which year did the Titanic sink?',
        choice1: '1905',
        choice2: '1912',
        choice3: '1920',
        choice4: '1935',
        answer: 2,
    },
    {
        question: 'What is the largest desert in the world?',
        choice1: 'Sahara Desert',
        choice2: 'Arabian Desert',
        choice3: 'Gobi Desert',
        choice4: 'Antarctic Desert',
        answer: 4,
    },
    {
        question: 'Who is known as the "Father of Computers"?',
        choice1: 'Alan Turing',
        choice2: 'Charles Babbage',
        choice3: 'John von Neumann',
        choice4: 'Bill Gates',
        answer: 2,
    },
    {
        question: 'Which physicist developed the theory of relativity?',
        choice1: 'Isaac Newton',
        choice2: 'Niels Bohr',
        choice3: 'Albert Einstein',
        choice4: 'Galileo Galilei',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {

    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
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