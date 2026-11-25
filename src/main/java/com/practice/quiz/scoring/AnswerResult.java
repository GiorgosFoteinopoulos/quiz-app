package com.practice.quiz.scoring;

public record AnswerResult(long questionId, String question, String yourAnswer, String correctAnswer, boolean correct, String explanation) {
}
