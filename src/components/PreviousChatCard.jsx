"use client";
import Link from "next/link";

// passed in as the props will be props.previousChats = array of chats, each element has .chat_name and .link
export default function PreviousChatCard({ title, link }) {
  return (
    <Link href={link}>
      <div className="px-2 py-1 text-left rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer">
        <p className="truncate overflow-hidden whitespace-nowrap">{title}</p>
      </div>
    </Link>
  );
}
