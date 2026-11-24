const titleHeading = document.getElementById('title');
const statusLabel = document.getElementById('status');
const startButton = document.getElementById('start-button');
const questionArea = document.getElementById('question-area');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const choicesBox = document.getElementById('choices');
const nextButton = document.getElementById('next-button');


export function setTitle(text) {
    titleHeading.textContent = text;
    document.title = text;
}

export function setStatus(status) {
    statusLabel.textContent = status;
}

export function setStartEnabled(enabled) {
    startButton.disabled = !enabled;
}

export function setStartLabel(text) {
    startButton.textContent = text;
}

export function onStart(handler) {
    startButton.addEventListener('click', handler);
}

export function showQuestion(question, number, total) {
    questionNumber.textContent = `Question ${number} of ${total}`;
    questionText.textContent = question.text;

    choicesBox.replaceChildren();
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'choice';
        button.dataset.index = index;
        button.textContent = `${index + 1}. ${choice}`;
        choicesBox.append(button);
    });

    questionArea.hidden = false;
}

export function hideQuestion() {
    questionArea.hidden = true;
}

export function onChoice(handler) {
    choicesBox.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-index]');
        if (!button) {
            return;
        }
        handler(Number(button.dataset.index));
    });
}

export function markSelected(index) {
    for (const button of choicesBox.querySelectorAll('.choice')) {
        button.classList.toggle('selected', Number(button.dataset.index) === index);
    }
}

export function setNextEnabled(enabled) {
    nextButton.disabled = !enabled;
}


export function setNextLabel(text) {
    nextButton.textContent = text;
}

export function onNext(handler) {
    nextButton.addEventListener('click', handler);
}




