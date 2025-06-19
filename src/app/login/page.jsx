'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '@/lib/supabaseServiceClient';

export default function LoginPage() {

  return (
    <div>
      <p className="bg-red-300">Set up the front end of the login page </p>
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
      />
    </div>
  )
  
}