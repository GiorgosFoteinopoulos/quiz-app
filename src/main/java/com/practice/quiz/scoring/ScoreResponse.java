package com.practice.quiz.scoring;

import java.util.List;

public record ScoreResponse(int correct, int total, List<AnswerResult> results) {

}
