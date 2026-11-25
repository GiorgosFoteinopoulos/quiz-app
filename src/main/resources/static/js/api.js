async function errorFrom(response) {
    const problem = await response.json().catch(() => ({}));
    return new Error(problem.message || 'the server answered ' + response.status);
}

export async function fetchQuestions(count) {
    const response = await fetch(`/api/questions?count=${count}`);
    if (!response.ok) {
        throw await errorFrom(response);
    }
    return response.json();
}

export async function submitAnswers(answers) {
    const response = await fetch('/api/quiz/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answers }),
    });
    if (!response.ok) {
        throw await errorFrom(response);
    }
    return response.json();
}