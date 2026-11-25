package com.practice.quiz.scoring;

import java.util.List;

public record ScoreRequest(List<AnswerRequest> answers) {
}
