'use client';
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import supabase from "@/lib/supabaseServiceClient";

export default function AuthGuard({children}) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);

      if (!data.session && pathname !== '/login'){
        router.push('/login');
      }
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [pathname]);

  if (isLoading) return null;

  if (!session && pathname === '/login') {
    return children;
  }

  if (!session) return null;

  return children;

};