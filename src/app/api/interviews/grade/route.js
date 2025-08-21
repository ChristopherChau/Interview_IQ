export async function POST(req) {
  const { question, response } = await req.json();
  console.log("Question: ", question)
  console.log("Response: ", response)
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
    const prompt = `Evaluate the response and return ONLY a valid JSON object in the format here. Also feedback in this case is "what was done well or could be improved" and score is <1-10> rate it 1-10 with 1 being bad 10 being good, return a number for score:
      {
        "structuring": <score>,
        "relevance": <score>,
        "depth": <score>,
        "delivery": <score>,
        "correctness": <score>,
        "overall": <score>,
        "notes": {
          "structuring": "<feedback>",
          "relevance": "<feedback>",
          "depth": "<feedback>",
          "delivery": "<feedback>",
          "correctness": "<feedback>",
          "overall": "<brief overall feedback>"
        }
      }
      "question": ${question},
    "response": ${response}`;

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
