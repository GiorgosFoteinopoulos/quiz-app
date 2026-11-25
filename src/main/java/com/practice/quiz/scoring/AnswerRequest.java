package com.practice.quiz.scoring;

public record AnswerRequest(long questionId, Integer choiceIndex) {
}
