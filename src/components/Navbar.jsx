"use client";
import { HomeIcon, PinLeftIcon } from "@radix-ui/react-icons";
import PreviousChatCard from "./PreviousChatCard";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const previousChats = [
    {
      chat_name: "Interview 1dsadsadsadasdasdsa",
      chat_id: "/chat/1",
    },
    {
      chat_name: "Interview 2",
      chat_id: "/chat/2",
    },
    {
      chat_name: "Interview 3",
      chat_id: "/chat/3",
    },
  ];

  const navBarItems = [
    {
      icon: <HomeIcon className="size-4" />,
      name: "Interview",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex bg-white relative border-r-2">
        {/* Navbar Content */}
        <div
          className={`h-screen overflow-y-auto flex flex-col transition-all duration-300 ${
            isCollapsed ? "w-0" : "min-w-[160px] max-w-[225px] w-auto"
          }`}
        >
          <div className="text-center sticky top-0 z-10 text-xl font-semibold py-6">
            InterviewIQ
          </div>
          {!isCollapsed && (
            <div>
              {navBarItems.map((item, index) => (
                <div key={index} className="px-2 flex items-center space-x-2">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              ))}
              <div className="text-sm mt-6">
                <p className="px-2 text-gray-300">Recent</p>
                {previousChats &&
                  previousChats.length > 0 &&
                  previousChats.map((value, index) => (
                    <PreviousChatCard
                      link={value.chat_id}
                      title={value.chat_name}
                      key={index}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={toggleCollapse}
            className={`relative cursor-pointer p-2 hover:bg-gray-300 rounded-lg`}
          >
            <PinLeftIcon
              className={`transform transition-transform duration-300 size-4 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
}
