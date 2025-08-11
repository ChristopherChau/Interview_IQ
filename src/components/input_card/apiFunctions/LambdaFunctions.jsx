export async function fetchQuestions(type, role, experience, focus, previousChats) {
  try {
    const response = await fetch("/api/interviews/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, role, experience, focus, previousChats }),
    });
    if (!response.ok) {
      throw new Error(
        `Error when fetching questions, response status: ${response.status}`
      );
    }

    const lambdaResponse = await response.json();
    let result = lambdaResponse.data.result;
    console.log(lambdaResponse);

    if (typeof result === "string") {
      // Try to match ```json ... ```
      const match = result.match(/```json\s*([\s\S]*?)\s*```/);
      if (match) {
        result = match[1]; // Extract inner JSON string
      }

      // Step 2: Try parsing
      try {
        result = JSON.parse(result);
      } catch (e) {
        console.warn("Failed to parse result:", e.message);
        result = {};
      }
    }
    return {
      question: lambdaResponse.data.result.question,
      title: lambdaResponse.data.result.title,
    };
  } catch (err) {
    console.error("Failed to fetch questions:", err.message);
    throw err;
  }
}

export async function rateResponse(question, user_response) {
  try {
    const response = await fetch("api/interviews/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: question,
        response: user_response,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error when rating response, status: ${response.status}`);
    }
    const lambdaResponse = await response.json();
    return lambdaResponse;
  } catch (err) {
    console.error("Failed to rate response:", err.message);
    throw err;
  }
}
