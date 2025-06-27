"use client";

import supabaseAnon from "@/lib/supabaseAnon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

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

  return (
    <div className="flex justify-end">
      <DropdownMenu className="cursor-pointer">
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={signOut}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
