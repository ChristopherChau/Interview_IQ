"use client";

import supabaseAnon from "@/lib/supabaseAnon";
import ProfileMenu from "../profilemenu/ProfileMenu";
import ModelCard from "./components/ModelCard";
import InputCard from "../input_card/InputCard";
import TypingText from "../input_card/TypingText";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [session, setSession] = useState(null);
  const [isAnimatingText, setIsAnimatingText] = useState(false);


  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabaseAnon.auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
        return;
      }
      setSession(data.session);
    }
    fetchSession();

    const {
      data: { subscription },
    } = supabaseAnon.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className="relative flex flex-col z-10 w-full h-full items-center justify-center">
      <div className="absolute top-4 right-4">
        <ProfileMenu />
      </div>
      <div className="text-center">
        <h1 className="text-2xl">Welcome to InterviewIQ!</h1>
        <p className="text-gray-400 mt-2">
          Click start interview to hop into your mock interview!
        </p>
      </div>
      <div className="flex flex-col mt-6 gap-6 max-w-[800px]">
        <div className="flex gap-4">
          <ModelCard />
          <InputCard session={session} setQuestion={setQuestion} isAnimatingText={isAnimatingText} />
        </div>
        <div>
          <TypingText text={question} setIsAnimatingText={setIsAnimatingText}/>
        </div>
      </div>
    </main>
  );
}
