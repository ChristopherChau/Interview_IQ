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
import { AvatarFallback } from "@radix-ui/react-avatar";

export default function ProfileMenu() {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [hasSession, setHasSession] = useState(false);
  const [hasAvatar, setHasAvatar] = useState(true);
  const [initials, setInitials] = useState("");
  
  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      const { data } = await supabaseAnon.auth.getSession();
      if (data.session) {
        setAvatarUrl(data.session.user.user_metadata.avatar_url);
        setUsername(data.session.user.user_metadata.name);
        setHasSession(true);
        console.log(data);
        const parts = data.session.user.user_metadata.name.split(" ");
        setInitials(parts[0][0].toUpperCase() + parts[1][0].toUpperCase());
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
        className="text-sm cursor-pointer"
      >
        Login
      </Button>
    );
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <Avatar className="border-2 items-center justify-center h-9 w-9 overflow-hidden">
            {hasAvatar && avatarUrl ? (
              <AvatarImage
                src={avatarUrl}
                className="h-full w-full object-cover"
                onError={(e) => {
                  setHasAvatar(false);
                }}
              />
            ) : (
            <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="px-4">
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
