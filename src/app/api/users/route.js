// app/api/users/route.js

import supabaseClient from "@/lib/supabaseServiceClient";

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
      .from("users")
      .select()
      .eq("user_id", user_id);

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ message: "Successful fetch of user", data }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error trying to make a POST req for users", err.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const { user_id } = await req.json();
  if (!user_id) {
    return new Response(
      JSON.stringify({
        error: "User ID required to make this POST req",
      }),
      { status: 400 }
    );
  }
  try {
    const { data, error } = await supabaseClient
      .from("users")
      .insert([{ user_id: user_id }]);
    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ message: "User added", data }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error trying to make a POST req for users", err.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
