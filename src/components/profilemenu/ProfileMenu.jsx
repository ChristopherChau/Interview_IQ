"use client";

import supabaseAnon from "@/lib/supabaseAnon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useState, useEffect } from "react";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function ProfileMenu() {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabaseAnon.auth.getSession();
      if (data.session) {
        setAvatarUrl(data.session.user.user_metadata.avatar_url);
        setUsername(data.session.user.user_metadata.name);
        setHasSession(true);
      } else {
        setHasSession(false);
      }
    };

    getSession();
  }, []);

  async function signOut() {
    const { error } = await supabaseAnon.auth.signOut();
    if (error) {
      toast.error("Save failed", {
        description: error.status ? `${error.message} (code: ${error.status})` : error.message,
      });
    }
    localStorage.setItem("isGuest", "false");
    router.push("/login");
  }

  if (!hasSession) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push("/login")}
        className="text-sm"
      >
        Login
      </Button>
    );
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <Avatar>
            <AvatarImage src={avatarUrl} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex items-center gap-2 ml-2 font-medium">
            <PersonIcon />
            {username}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <ExitIcon />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
