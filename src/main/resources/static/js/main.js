import { APP_NAME, QUESTION_COUNT, SECONDS_PER_QUESTION } from './config.js';
import { fetchQuestions } from './api.js';
import { Quiz } from './quiz.js';
import {
    hideQuestion, markSelected, onChoice, onNext, onStart, setNextEnabled, setNextLabel,
    setStartEnabled, setStartLabel, setStatus, setTitle, showQuestion
} from './ui.js';

let quiz = null;


async function startQuiz() {
    setStartEnabled(false);
    setStatus('Loading the questions...');

    try {
        const questions = await fetchQuestions(QUESTION_COUNT);
        quiz = new Quiz(questions);
        setStatus(`You have ${SECONDS_PER_QUESTION} seconds per question.`);
        renderQuestion();
    } catch (error) {
        setStatus('Could not load the questions: ' + error.message);
        setStartEnabled(true);
    }
}

function renderQuestion() {
    showQuestion(quiz.currentQuestion(), quiz.questionNumber(), quiz.total());
    setNextEnabled(false);
    setNextLabel(quiz.isLastQuestion() ? 'Finish' : 'Next');
}

function handleChoice(index) {
    quiz.select(index);
    markSelected(index);
    setNextEnabled(true);
}

function handleNext() {
    quiz.next();
    if (quiz.isFinished()) {
        finishQuiz();
    } else {
        renderQuestion();
    }
}

function finishQuiz() {
    hideQuestion();
    setStatus(`You answered all ${quiz.total()} questions. Scoring comes in QZ-6.`);
    console.log('Answers to send to the server:', quiz.answers);
    setStartLabel('Start again');
    setStartEnabled(true);
}

setTitle(APP_NAME);
setStatus(`Ready. ${QUESTION_COUNT} questions, ${SECONDS_PER_QUESTION} seconds each.`);
onStart(startQuiz);
onChoice(handleChoice);
onNext(handleNext);
setStartEnabled(true);