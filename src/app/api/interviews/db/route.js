// app/api/interviews/db.route.js

import supabaseClient from "@/lib/supabaseServiceClient";

// This will get all interview ids/titles associated with current user
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  if (!user_id) {
    return new Response(
      JSON.stringify({
        error: "No user_id given to insert into the interviews table",
      }),
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabaseClient
      .from("interviews")
      .select("interview_id, title")
      .eq("user_id", user_id);

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        message: "Got all interviews for inputted user_id",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error trying to make a GET req for users", err.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const { user_id, title } = await req.json();
  if (!user_id) {
    return new Response(
      JSON.stringify({
        error: "No user_id given to insert into the interviews table",
      }),
      { status: 400 }
    );
  }
  try {
    const { data, error } = await supabaseClient
      .from("interviews")
      .insert({ user_id: user_id, title: title });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ message: "Interview instance added", data }),
      { status: 200 }
    );
  } catch (err) {
    console.error(
      "Error trying to insert into the interviews table",
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
