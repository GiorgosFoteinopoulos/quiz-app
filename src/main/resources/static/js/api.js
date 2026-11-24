export async function fetchQuestions(count) {
    const response = await fetch(`/api/questions?count=${count}`);
    if (!response.ok) {
        const problem = await response.json().catch(() => ({}));
        throw new Error(problem.message || 'the server answered ' + response.status);
    }
    return response.json();
}