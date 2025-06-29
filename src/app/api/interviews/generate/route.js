export async function POST(req) {
  const { prompt } = await req.json();
  if (!prompt) {
    return new Response(
      JSON.stringify(
        {
          error: "No prompt to send to AWS Bedrock",
        },
        { status: 400 }
      )
    );
  }
  try{
    const lambdaResponse = await fetch(process.env.LAMBDA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });
    
    const data = lambdaResponse.json();
    if (!lambdaResponse){
      throw new Error(data.error || "Failed to fetch from Lambda response");
    }
    
    return new Response({
      message: "Successful response from Lambda",
      data
    }, {status: 200});
  }
  catch (err){
    console.error(
      "Error trying to fetch response from Lambda",
      err.message
    );
    return new Response(
      JSON.stringify({
        error: "Internal Server Error: Failed Lambda function",
      }),
      { status: 500 }
    );
  }
}
