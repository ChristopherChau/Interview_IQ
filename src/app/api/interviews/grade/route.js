export async function POST(req) {
  const { question, response } = await req.json();
  if (!question || !response) {
    return new Response(
      JSON.stringify(
        {
          error: "Not enough information to generate feedback from Bedrock",
        },
        { status: 400 }
      )
    );
  }
  try {
    const prompt = `Evaluate the response and return ONLY a valid JSON object in the format:
      {
        "structuring": <1-10> rate it 1-10 so return a number,
        "relevance": <1-10> rate it 1-10 so return a number,
        "depth": <1-10> rate it 1-10 so return a number,
        "delivery": <1-10> rate it 1-10 so return a number,
        "correctness": <1-10> rate it 1-10 so return a number,
        "overall": <1-10> rate it 1-10 so return a number,
        "notes": {
          "structuring": "<what was done well or could be improved>",
          "relevance": "<what was done well or could be improved>",
          "depth": "<what was done well or could be improved>",
          "delivery": "<what was done well or could be improved>",
          "correctness": "<what was done well or could be improved>",
          "overall": "<brief overall feedback>"
        }
      }
      No commentary, markdown, or extra text. Grade strictly to each criteria
      "question": "Can you explain the difference between session and cookie based authentication in web development?",
    "response": "I dont knopw but i think its testing"`;

    const lambdaResponse = await fetch(process.env.LAMBDA_BEDROCK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await lambdaResponse.json();
    if (!lambdaResponse) {
      throw new Error(data.error || "Failed to fetch from Lambda response");
    }
    console.log("Lambda response from raw grading endpoint: ", lambdaResponse);
    console.log("Data.json() from raw endpoint: ", data);

    return new Response(
      JSON.stringify(
        {
          message: "Successful grading response from Lambda",
          data,
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Error trying to grade response from Lambda", err.message);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error: Failed Grading Lambda function",
      }),
      { status: 500 }
    );
  }
}
