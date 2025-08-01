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
    const prompt = `Return a single JSON object with the structure and short notes like below:
    {
      "structuring": <grade (out of 10)>,
      "relevance": <grade (out of 10)>,
      "depth": <grade (out of 10)>,
      "delivery": <grade (out of 10)>,
      "correctness": <grade (out of 10)>,
      "overall": <grade (out of 10)>,
      "notes": {
        "structuring": <Is the answer logically organized and easy to follow?>,
        "relevance": <Does it stay on topic>,
        "depth": <Do they go past the surface level>,
        "delivery": <Is it concise? Ignore grammer. Minimal filler or vague terms?>,
        "correctness": <Is their response applicable / accurate? Is their solution valid/sound or is their scenario appropriate>,
        "overall": "<notes>"
      }
    }
    Only return valid JSON. Do not include any commentary, markdown, or formatting. Grade my response to this question: ${question}. This is my response: ${response}`;

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
    console.log("Lambda response from raw endpoint: ", lambdaResponse);
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
