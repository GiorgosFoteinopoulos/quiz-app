export class Quiz {

    constructor(questions) {
        this.questions = questions;
        this.currentIndex = 0;
        this.selectedIndex = null;
        this.answers = [];
    }

    currentQuestion() {
        return this.questions[this.currentIndex];
    }

    questionNumber() {
        return this.currentIndex + 1;
    }

    total() {
        return this.questions.length;
    }

    isLastQuestion() {
        return this.currentIndex === this.questions.length - 1;
    }

    isFinished() {
        return this.currentIndex >= this.questions.length;
    }

    select(choiceIndex) {
        this.selectedIndex = choiceIndex;
    }

    hasSelection() {
        return this.selectedIndex !== null;
    }

    next() {
        if (!this.hasSelection()) {
            throw new Error('Pick an answer first');
        }

        this.answers.push({questionId: this.currentQuestion().id, choiceIndex: this.selectedIndex });
        this.currentIndex = this.currentIndex + 1;
        this.selectedIndex = null;
    }
}