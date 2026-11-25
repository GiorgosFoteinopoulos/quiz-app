package com.practice.quiz.scoring;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.practice.quiz.question.Question;
import com.practice.quiz.question.QuestionService;

@Service
public class ScoringService {

    private final QuestionService questionService;

    public ScoringService(QuestionService questionService) {
        this.questionService = questionService;
    }

    public ScoreResponse score(ScoreRequest request) {
        if (request.answers() == null || request.answers().isEmpty()) {
            throw badRequest("Send at least one answer");
        }

        Set<Long> answeredIds = new HashSet<>();
        List<AnswerResult> results = new ArrayList<>();
        int correctCount = 0;

        for (AnswerRequest answer : request.answers()) {
            if (!answeredIds.add(answer.questionId())) {
                throw badRequest("Question " + answer.questionId() + " was answered twice");
            }
            Question question = questionService.findById(answer.questionId())
                    .orElseThrow(() -> badRequest("Unknown question " + answer.questionId()));

            AnswerResult result = check(question, answer.choiceIndex());
            if (result.correct()) {
                correctCount = correctCount + 1;
            }
            results.add(result);
        }

        return new ScoreResponse(correctCount, results.size(), results);
    }

    private AnswerResult check(Question question, Integer choiceIndex) {
        String correctAnswer = question.choices().get(question.correctIndex());

        if (choiceIndex == null) {
            return new AnswerResult(question.id(), question.text(), null, correctAnswer,
                    false, question.explanation());
        }
        if (choiceIndex < 0 || choiceIndex >= question.choices().size()) {
            throw badRequest("Question " + question.id() + " has no choice " + choiceIndex);
        }

        boolean correct = choiceIndex == question.correctIndex();
        return new AnswerResult(question.id(), question.text(), question.choices().get(choiceIndex), correctAnswer,
                correct, question.explanation());
    }

    private static ResponseStatusException badRequest(String message) {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
    }
}