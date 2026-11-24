package com.practice.quiz.question;

import java.util.List;

public record Question(long id, String text, List<String> choices, int correctIndex, String explanation) {

    public Question {
        if (choices.size() < 2  || choices.size() > 4) {
            throw new IllegalArgumentException("A question needs 2 to 4 choices, but question " + id + " has " + choices.size());
        }
        if (correctIndex < 0 || correctIndex >= choices.size()) {
            throw new IllegalArgumentException("Question " + id + " points to choice " + correctIndex + ", which does not exist");
        }
        choices = List.copyOf(choices);
    }
}
