import { APP_NAME, QUESTION_COUNT, SECONDS_PER_QUESTION } from './config.js';
import { fetchQuestions } from './api.js';
import { onStart, setStartEnabled, setStatus, setTitle, showQuestion } from './ui.js';

async function startQuiz() {
    setStartEnabled(false);
    setStatus('Loading the questions...');

    try {
        const questions = await fetchQuestions(QUESTION_COUNT);
        showQuestion(questions[0], 1, questions.length);
        setStatus(`You have ${SECONDS_PER_QUESTION} seconds per question.`);
    } catch (error) {
        setStatus('Could not load the questions: ' + error.message);
        setStartEnabled(true);
    }
}

setTitle(APP_NAME);
setStatus(`Ready. ${QUESTION_COUNT} questions, ${SECONDS_PER_QUESTION} seconds each.`);
onStart(startQuiz);
setStartEnabled(true);