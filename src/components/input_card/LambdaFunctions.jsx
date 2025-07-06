export async function fetchQuestions(prompt) {
  try {
    const response = await fetch("/api/interviews/generate", {
      method: "POST",
      headers: "application/json",
      body: JSON.stringify({ prompt: prompt }),
    });
    if (!response.ok) {
      throw new Error(
        `Error when fetching questions, response status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch questions:", err.message);
    throw err;
  }
}

export async function rateResponse(question, user_response) {
  try {
    const response = await fetch("api/interviews/grade", {
      method: "POST",
      headers: "application/json",
      body: JSON.stringify({
        question: question,
        response: user_response,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error when rating response, status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to rate response:", err.message);
    throw err;
  }
}
