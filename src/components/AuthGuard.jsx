'use client';
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import supabaseAnon from "@/lib/supabaseAnon";

export default function AuthGuard({children}) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabaseAnon.auth.getSession();
      setSession(data.session);
      setIsLoading(false);

      console.log(data.session);

      const isGuest = localStorage.getItem("isGuest");
      if (isGuest === "true"){
        setIsLoading(false);
        return;
      }

      if (!data.session && pathname !== '/login'){
        router.push('/login');
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


  if (session || isGuest) {
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