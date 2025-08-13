"use client";
import { Auth } from "@supabase/auth-ui-react";
import Image from "next/image";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "@/lib/supabaseAnon";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  localStorage.setItem("isGuest", "false");

  
  return (
    <>
      <div className="flex h-screen justify-center">
        <div className="flex flex-col justify-center flex-1 max-w-xl min-w-xs px-6">
          <div className="text-center flex flex-col gap-4 relative">
            <Image
              src="/interviewiq.png"
              width={55}
              height={55}
              alt="InterviewIQ Icon"
              className="absolute left-[7rem] top-[-0.55rem]"
            />
            <h1 className="text-3xl font-semibold flex justify-center items-center">
              <p>
                INTERVIEW<span className="text-blue-400">IQ</span>
              </p>
            </h1>
            <h2 className="text-2xl">Welcome</h2>
            <div className="my-2 text-gray-400">
              <p>Please login to start interviewing</p>
              <p>or</p>
              <a
                className="cursor-pointer underline"
                onClick={() => {
                  localStorage.setItem("isGuest", "true");
                  router.push("/");
                }}
              >
                Continue as guest
              </a>
            </div>
          </div>
          <Auth
            supabaseClient={supabase}
            providers={["google"]}
            appearance={{ theme: ThemeSupa }}
            onAuthStateChange={async (event, session) => {
              if (event === "SIGNED_IN" && session) {
                const user_id = session.user.id;
                localStorage.setItem("isGuest", "false")

                const existingUsers = await getUser(user_id);
                if (existingUsers.length === 0) {
                  await insertUser(user_id);
                }

                router.push("/");
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
