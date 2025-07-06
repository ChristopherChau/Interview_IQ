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
  try{
    const prompt = `Return a single JSON object with the structure and short notes like below:
    {
      "communication": <grade>,
      "clarity": <grade>,
      "conciseness": <grade>,
      "overall": <grade>,
      "notes": {
        "communication": "Good structure, slight ramble",
        "clarity": "<notes>",
        "conciseness": "<notes>",
        "overall": "<notes>"
      }
    }
    Only return valid JSON. Do not include any commentary, markdown, or formatting. Grade my response to this question: ${question}. This is my response: ${response}`;

    const lambdaResponse = await fetch(process.env.LAMBDA_BEDROCK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({prompt}),
    });
    console.log(lambdaResponse);
    const data = await lambdaResponse.json();
    if (!lambdaResponse){
      throw new Error(data.error || "Failed to fetch from Lambda response");
    }
    
    return new Response(JSON.stringify({
      message: "Successful grading response from Lambda",
      data
    }, {status: 200}));
  }
  catch (err){
    console.error(
      "Error trying to grade response from Lambda",
      err.message
    );
    return new Response(
      JSON.stringify({
        error: "Internal Server Error: Failed Grading Lambda function",
      }),
      { status: 500 }
    );
  }
}
