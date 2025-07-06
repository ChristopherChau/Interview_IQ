"use client";

import supabaseAnon from "@/lib/supabaseAnon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { formSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropdown from "./Dropdown";
import { fetchQuestions, rateResponse } from "./LambdaFunctions";
import LoadingSpinner from "./LoadingSpinner";
import NotesInput from "./NotesInput"

export default function InputCard() {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tab: "behavioral",
      behavioral_role: "",
      behavioral_experience: "",
      behavioral_focus: "",
      technical_role: "",
      technical_experience: "",
    },
    resolver: zodResolver(formSchema),
  });

  const [selectedTab, setSelectedTab] = useState("behavioral");
  const [openDropdown, setOpenDropdown] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState(false);

  useEffect(() => {
    setValue("tab", selectedTab);
  }, [selectedTab]);

  const DROPDOWN_CONFIGS = {
    behavioral: [
      { type: "behavioral", label: "Industry", name: "behavioral_role" },
      {
        type: "experience",
        label: "Experience",
        name: "behavioral_experience",
      },
      { type: "focus", label: "Focus", name: "behavioral_focus" },
    ],
    technical: [
      { type: "technical", label: "Role", name: "technical_role" },
      { type: "experience", label: "Experience", name: "technical_experience" },
    ],
  };

  const resetForm = (tab) => {
    reset({
      tab,
      behavioral_role: "",
      behavioral_experience: "",
      behavioral_focus: "",
      technical_role: "",
      technical_experience: "",
    });
    setOpenDropdown({});
  };

  const renderDropdowns = (tab) =>
    DROPDOWN_CONFIGS[tab].map((config) => (
      <Dropdown
        key={config.name}
        {...config}
        errors={errors}
        control={control}
        open={openDropdown[config.name] || false}
        setOpen={(val) => {
          setOpenDropdown((prev) => ({ ...prev, [config.name]: val }));
        }}
      />
    ));

  const startInterview = async (data) => {
    setIsLoading(true);
    let type, role, experience, focus;

    if (data.tab === "behavioral") {
      type = "behavioral";
      role = data.behavioral_role;
      experience = data.behavioral_experience;
      focus = data.behavioral_focus;
    } else {
      type = "technical";
      role = data.technical_role;
      experience = data.technical_experience;
    }
    const response = await fetchQuestions(type, role, experience, focus);
    setIsLoading(false);
    console.log("Starting interview:", response);
    setFetchedQuestions(true);
  };

  return (
    <form onSubmit={handleSubmit(startInterview)}>
      <Card className="w-[450px] min-h-[360px]">
        {isLoading ? (
          <LoadingSpinner/>
        ) : fetchedQuestions ? (
          <NotesInput/>
        ) : (
          <>
            <CardHeader>
              <CardDescription className="font-semibold text-base text-black ">
                Choose your interview style
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center">
              <Tabs defaultValue="behavioral" className="w-[400px]">
                <TabsList>
                  {["behavioral", "technical"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      onClick={() => {
                        setSelectedTab(tab);
                        resetForm(tab);
                      }}
                      className="px-16 h-full rounded-xl data-[state=active]:bg-[#171717] data-[state=active]:text-white"
                    >
                      {tab[0].toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {["behavioral", "technical"].map((tab) => (
                  <TabsContent
                    key={tab}
                    value={tab}
                    className="flex flex-col gap-2"
                  >
                    {renderDropdowns(tab)}
                  </TabsContent>
                ))}
              </Tabs>
              <CardFooter className="mt-6 px-0">
                <Button type="submit" className="w-full">
                  Start Interview
                </Button>
              </CardFooter>
            </CardContent>
          </>
        )}
      </Card>
    </form>
  );
}
