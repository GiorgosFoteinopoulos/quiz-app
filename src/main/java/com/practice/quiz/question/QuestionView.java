package com.practice.quiz.question;

import java.util.List;

public record QuestionView(long id, String text, List<String> choices) {

    public static QuestionView from(Question question) {
        return new QuestionView(question.id(), question.text(), question.choices());
    }
}
