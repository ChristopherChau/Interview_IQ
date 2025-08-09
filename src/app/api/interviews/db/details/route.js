// app/api/interviews/details.route.js

import supabaseClient from "@/lib/supabaseServiceClient";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const interview_id = searchParams.get("interview_id");
  if (!interview_id) {
    return new Response(JSON.stringify({ error: "No interview_id provided" }), {
      status: 400,
    });
  }

  try {
    const { data, error } = await supabaseClient
      .from("interview_details")
      .select()
      .eq("interview_id", interview_id);

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ message: "Succesfully got interview details", data }),
      { status: 200 }
    );
  } catch (err) {
    console.error(
      "Error trying to make a GET req for interview details",
      err.message
    );
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const { interview_id, question, response, feedback } = await req.json();
  if (!interview_id || !question || !response || !feedback) {
    console.log(`Printing request data in order: ${feedback}`);
    return new Response(
      JSON.stringify({
        error:
          "Not all details are given to insert into the interview details table",
      }),
      { status: 400 }
    );
  }
  try {
    const { data, error } = await supabaseClient
      .from("interview_details")
      .insert({
        interview_id: interview_id,
        question: question,
        response: response,
        feedback: feedback,
      })
      .select("interview_id");
    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        message: "Successfully inserted details for interview",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(
      "Error trying to insert into the interview details table",
      err.message
    );
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}
// {
//   "interview_id": 1,
//   "question": "Interview question 1",
//   "response": "Some response",
//   "feedback": {
//       "clarity": 5,
//       "overall": 5
//   }
// }
