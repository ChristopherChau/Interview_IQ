"use client";
import { HomeIcon, PinLeftIcon } from "@radix-ui/react-icons";
import PreviousChatCard from "../PreviousChatCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import supabaseAnon from "@/lib/supabaseAnon";
import LoadingSpinner from "../LoadingSpinner";
import { fetchRecentInterviews } from "./utils";

export default function Navbar() {
  // const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const isGuest = localStorage.getItem("isGuest");
    if (isGuest == "false") {
      setIsLoading(true);
      (async () => {
        try {
          const {
            data: { user },
          } = await supabaseAnon.auth.getUser();
          const recentInterviews = await fetchRecentInterviews(user.id);
          console.log(recentInterviews);
          setPreviousChats(recentInterviews);
          setIsLoading(false);
        } catch (err) {
          console.error("Error getting recent interviews: ", err)
        }
      })();
    }
  }, []);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const navBarItems = [
    {
      icon: <HomeIcon className="size-5" />,
      name: "Interview",
      href: "/#",
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
      <div className="flex bg-white relative border-r-2 mr-8">
        {/* Navbar Content */}
        <div
          className={`h-screen overflow-y-auto flex flex-col transition-all duration-300 ${
            isCollapsed ? "w-0" : "min-w-[160px] max-w-[225px] w-auto"
          }`}
        >
          <div className="text-center sticky top-0 z-10 text-4xl font-medium py-6">
            <Link href={"/#"}>InterviewIQ</Link>
          </div>
          {!isCollapsed && (
            <div>
              {navBarItems.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="p-2 flex items-center space-x-2 hover:bg-gray-300 rounded-lg text-xl"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="text-xl mt-6">
                <p className="px-2 text-gray-400">Recent</p>
                {isLoading ? (
                  <div className="pt-6">
                    <LoadingSpinner showDots={false} />
                  </div>
                ) : previousChats.length == 0 ? (
                  <div className="px-2 py-1 text-left">
                    <p className="truncate overflow-hidden text-base whitespace-nowrap">
                      No previous interviews
                    </p>
                  </div>
                ) : (
                  previousChats &&
                  previousChats.length > 0 &&
                  previousChats.map((value, index) => (
                    <PreviousChatCard
                      link={`/feedback/${value.interview_id}`}
                      title={value.title}
                      key={index}
                    />
                  ))
                )}
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
