export async function POST(req) {
  const { type, role, experience, focus } = await req.json();
  if (!type || !role || !experience) {
    return new Response(
      JSON.stringify(
        {
          error: "Not enough information to generate prompt from Bedrock",
        },
        { status: 400 }
      )
    );
  }
  try{
    const prompt = `Return a single JSON object with the structure:
    {
      "question": "<interview question>",
      "title": "<brief topic title>"
    }
    Ask a ${type} mock interview question for a ${role} targeting a(n) ${experience} candidate. This question's depth will be relative to their experience. ${type === "behavioral" && focus ? `Make it a focus on ${focus}` : ""}`;

    const lambdaResponse = await fetch(process.env.LAMBDA_BEDROCK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });
    console.log(lambdaResponse);
    const data = await lambdaResponse.json();
    if (!lambdaResponse){
      throw new Error(data.error || "Failed to fetch question from Lambda response");
    }
    
    return new Response(JSON.stringify({
      message: "Successful question gen from Lambda",
      data
    }, {status: 200}));
  }
  catch (err){
    console.error(
      "Error trying to gen response from Lambda",
      err.message
    );
    return new Response(
      JSON.stringify({
        error: "Internal Server Error: Failed Gen Question Lambda function",
      }),
      { status: 500 }
    );
  }
}
