export async function insertInterview(user_id, interview_title) {
  try {
    const response = await fetch("/api/interviews/db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user_id,
        title: interview_title,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Error when inserting to interview table, response status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to insert interview title for user :", err.message);
    throw err;
  }
}

export async function insertDetails(
  interview_id,
  question,
  user_response,
  feedback
) {
  try {
    const response = await fetch("/api/interviews/db/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        interview_id: interview_id,
        question: question,
        response: user_response,
        feedback: feedback,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Error when inserting to interview details, response status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to insert interview details:", err.message);
    throw err;
  }
}
