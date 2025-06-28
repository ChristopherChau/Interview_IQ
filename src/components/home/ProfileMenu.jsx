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

export default function ProfileMenu() {
  const router = useRouter();
  async function signOut() {
    const { error } = await supabaseAnon.auth.signOut();
    if (error) {
      console.log(`Error trying to log out ${error.message}`);
    }
    localStorage.setItem("isGuest", "false");
    router.push("/login");
  }
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    let isMounted = true;

    const getSession = async () => {
      const { data } = await supabaseAnon.auth.getSession();
      if (isMounted) {
        setAvatarUrl(data.session.user.user_metadata.avatar_url);
        setUsername(data.session.user.user_metadata.name);
      }
    };

    getSession();
  }, []);

  return (
    <div className="flex justify-end">
      <DropdownMenu className="cursor-pointer">
        <DropdownMenuTrigger>
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
