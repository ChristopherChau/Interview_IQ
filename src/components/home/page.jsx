"use client";

import supabaseAnon from "@/lib/supabaseAnon";
import ProfileMenu from "../profilemenu/ProfileMenu";
import ModelCard from "./components/ModelCard";
import InputCard from "../input_card/InputCard";

export default function HomePage() {
  return (
    <main className="bg-blue-500 relative flex flex-col z-10 w-full h-full items-center justify-center">
      <div className="absolute top-4 right-4">
        <ProfileMenu />
      </div>
      <div className="text-center">
        <h1 className="text-2xl">Welcome to InterviewIQ!</h1>
        <p className="text-gray-400 mt-2">
          Click start interview to hop into your mock interview!
        </p>
      </div>
      <div className="flex gap-4">
        <ModelCard />
        <InputCard />
      </div>
    </main>
  );
}
