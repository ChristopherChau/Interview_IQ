'use client';
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from 'next/navigation';
import supabaseAnon from "@/lib/supabaseAnon";

export default function AuthGuard({children}) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const hasInsertedUser = useRef(false); 


  async function insertUser(user_id, username) {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        user_id: user_id,
          user_name: username,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error when inserting to users table, response status: ${response.status}`
        );
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to insert user into user table:", err.message);
      throw err;
    }
  }

  async function getUser(user_id) {
    try {
      const response = await fetch(`/api/users?user_id=${user_id}`);

      if (!response.ok) {
        throw new Error(
          `Error getting user from user table, response status: ${response.status}`
        );
      }
      const data = await response.json();
      return data.data;
    } catch (err) {
      console.error("Failed to insert user into user table:", err.message);
      throw err;
    }
  }

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabaseAnon.auth.getSession();
      setSession(data.session);
      setIsLoading(false);

      const isGuest = localStorage.getItem("isGuest");
      if (isGuest === "true"){
        setIsLoading(false);
        return;
      }

      if (!data.session && pathname !== '/login'){
        router.push('/login');
        return
      }

      if (data.session && !hasInsertedUser.current) {
        hasInsertedUser.current = true;

        const user_id = data.session.user.id;
        const username = data.session.user.user_metadata.name;
        const existingUsers = await getUser(user_id);
        if (!existingUsers || existingUsers.length === 0) {
          await insertUser(user_id, username);
        }
      }
    }

    getSession();

    const {
      data: { subscription },
    } = supabaseAnon.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (isLoading) return null;

  const isGuest = localStorage.getItem("isGuest") === "true";


  if (session || isGuest || pathname == "/login") {
    return children;
  }

  if (!session) return null;
  
  if (!session && localStorage.getItem("isGuest") !== "true") {
    return (
      <Auth
        supabaseClient={supabaseAnon}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
      />
    );
  }

  return children;

};