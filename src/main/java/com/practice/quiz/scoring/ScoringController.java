package com.practice.quiz.scoring;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScoringController {

    private final ScoringService scoringService;

    public ScoringController(ScoringService scoringService) {
        this.scoringService = scoringService;
    }

    @PostMapping("/api/quiz/score")
    public ScoreResponse score(@RequestBody ScoreRequest request) {
        return scoringService.score(request);
    }
}
