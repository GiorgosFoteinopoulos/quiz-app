import { APP_NAME, QUESTION_COUNT, SECONDS_PER_QUESTION } from './config.js';
import { fetchQuestions, submitAnswers } from './api.js';
import { Quiz } from './quiz.js';
import { startCountdown } from './timer.js';
import {
    hideQuestion, hideResult, markSelected, onChoice, onKey, onNext, onStart, setNextEnabled, setNextLabel,
    setStartEnabled, setStartLabel, setStatus, setTitle, showQuestion, showResult, showTimeLeft
} from './ui.js';

let quiz = null;
let stopTimer = null;

async function startQuiz() {
    setStartEnabled(false);
    hideResult();
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

    stopCurrentTimer();
    stopTimer = startCountdown(SECONDS_PER_QUESTION, showTimeLeft, handleTimeUp);
}

function stopCurrentTimer() {
    if (stopTimer !== null) {
        stopTimer();
        stopTimer = null;
    }
}

function handleChoice(index) {
    quiz.select(index);
    markSelected(index);
    setNextEnabled(true);
}

function handleNext() {
    stopCurrentTimer();
    quiz.next();
    if (quiz.isFinished()) {
        finishQuiz();
    } else {
        renderQuestion();
    }
}

function handleTimeUp() {
    stopTimer = null;
    quiz.timeUp();
    if (quiz.isFinished()) {
        finishQuiz();
    } else {
        renderQuestion();
    }
}

function handleKey(event) {
    if (quiz === null || quiz.isFinished()) {
        return;
    }
    if (event.ctrlKey || event.altKey || event.metaKey || event.repeat) {
        return;
    }

    const choiceNumber = Number(event.key);
    if (choiceNumber >= 1 && choiceNumber <= quiz.currentQuestion().choices.length) {
        event.preventDefault();
        handleChoice(choiceNumber - 1);
        return;
    }

    if (event.key === 'Enter' && quiz.hasSelection()) {
        event.preventDefault();
        handleNext();
    }
}

async function finishQuiz() {
    hideQuestion();
    setStatus('Checking your answers...');

    try {
        const result = await submitAnswers(quiz.answers);
        showResult(result);
        setStatus('Here is how you did.');
    } catch (error) {
        setStatus('Could not check your answers: ' + error.message);
    }

    setStartLabel('Start again');
    setStartEnabled(true);
}

setTitle(APP_NAME);
setStatus(`Ready. ${QUESTION_COUNT} questions, ${SECONDS_PER_QUESTION} seconds each.`);
onStart(startQuiz);
onChoice(handleChoice);
onNext(handleNext);
onKey(handleKey);
setStartEnabled(true);