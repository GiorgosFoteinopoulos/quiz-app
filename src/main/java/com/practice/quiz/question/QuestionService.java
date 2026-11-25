package com.practice.quiz.question;


import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private final List<Question> questions = List.of(
            new Question(1, "What does the HTTP status code 404 mean?",
                    List.of("Server error", "Not found", "Created", "Unauthorized"), 1,
                    "404 means the server has nothing at that address."),
            new Question(2, "Which JavaScript keyword declares a variable that cannot be reassigned?",
                    List.of("let", "var", "const", "static"), 2,
                    "const fixes the variable, like final in Java."),
            new Question(3, "What does '10' + 5 give in JavaScript?",
                    List.of("15", "'105'", "NaN", "An error"), 1,
                    "With a string on one side, + joins text instead of adding."),
            new Question(4, "Which HTTP method is used to create a new resource in a REST API?",
                    List.of("GET", "POST", "DELETE", "HEAD"), 1,
                    "POST sends a new resource to the server, which usually answers 201 Created."),
            new Question(5, "Which Java collection does not allow duplicate elements?",
                    List.of("ArrayList", "LinkedList", "HashSet", "An array"), 2,
                    "A Set keeps each element only once."),
            new Question(6, "What does event.preventDefault() stop when a form is submitted?",
                    List.of("The event listener", "The page reload", "The fetch request", "The CSS"), 1,
                    "Without it the browser submits the form by loading a new page."),
            new Question(7, "Which annotation makes a Spring class send its method results back as JSON?",
                    List.of("@Service", "@Entity", "@RestController", "@Component"), 2,
                    "@RestController means: the return value is the response body."),
            new Question(8, "Where does Spring Boot serve files like index.html from?",
                    List.of("src/main/java", "src/main/resources/static", "target/test-classes", "The database"), 1,
                    "Everything in static/ is served at the root of the site.")
    );

    public int count() {
        return questions.size();
    }

    public Optional<Question> findById(long id) {
        return questions.stream()
                .filter(question -> question.id() == id)
                .findFirst();
    }

    public List<QuestionView> randomQuestions(int count) {
        if (count < 1 || count > questions.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "count must be between 1 and " +  questions.size());
        }
        List<Question> shuffled = new ArrayList<>(questions);
        Collections.shuffle(shuffled);
        return shuffled.subList(0, count).stream()
                .map(QuestionView::from)
                .toList();
    }

}
