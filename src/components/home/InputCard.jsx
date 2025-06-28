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

  const onSubmit = (data) => {
    console.log("Implement submit button");
    console.log(data);
  };

  const [selectedTab, setSelectedTab] = useState("behavioral");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedFocus, setSelectedFocus] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);

  useEffect(() => {
    console.log(
      `Role: ${selectedRole}, Experience: ${selectedExperience}, Focus: ${selectedFocus}`
    );
  }, [selectedRole, selectedExperience, selectedFocus]);

  useEffect(() => {
    setValue("tab", selectedTab);
  }, [selectedTab]);

  const resetForm = (tab) => {
    reset({
      tab,
      behavioral_role: "",
      behavioral_experience: "",
      behavioral_focus: "",
      technical_role: "",
      technical_experience: "",
    });
    setSelectedRole("");
    setSelectedExperience("");
    setSelectedFocus("");
    setRoleOpen(false);
    setExperienceOpen(false);
    setFocusOpen(false);
  };
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) =>
        console.log("Validation errors:", errors)
      )}
    >
      <Card>
        <CardHeader>
          <CardDescription className="font-semibold text-base text-black ">Choose your interview style</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center">
          <Tabs defaultValue="behavioral" className="w-[400px]">
            <TabsList>
              <TabsTrigger
                className="px-16 h-full rounded-xl data-[state=active]:bg-[#171717] data-[state=active]:text-white"
                value="behavioral"
                onClick={() => {
                  setSelectedTab("behavioral");
                  resetForm("behavioral");
              }}
              >
                Behavioral
              </TabsTrigger>
              <TabsTrigger
                className="px-16 h-full rounded-xl data-[state=active]:bg-[#171717] data-[state=active]:text-white"
                value="technical"
                onClick={() => {
                  setSelectedTab("technical");
                  resetForm("technical")
                }}
              >
                Technical
              </TabsTrigger>
            </TabsList>
            <TabsContent value="behavioral" className="flex flex-col gap-2">
              <Dropdown
                errors={errors}
                type="behavioral"
                label="Industry"
                name="behavioral_role"
                control={control}
                setOpen={setRoleOpen}
                setSelected={setSelectedRole}
                open={roleOpen}
              />
              <Dropdown
                errors={errors}
                type="experience"
                label="Experience"
                name="behavioral_experience"
                control={control}
                setOpen={setExperienceOpen}
                setSelected={setSelectedExperience}
                open={experienceOpen}
              />
              <Dropdown
                errors={errors}
                type="focus"
                label="Focus"
                name="behavioral_focus"
                control={control}
                setOpen={setFocusOpen}
                setSelected={setSelectedFocus}
                open={focusOpen}
              />
            </TabsContent>
            <TabsContent value="technical" className="flex flex-col gap-2">
              <Dropdown
                errors={errors}
                type="technical"
                label="Role"
                name="technical_role"
                control={control}
                setOpen={setRoleOpen}
                setSelected={setSelectedRole}
                open={roleOpen}
              />
              <Dropdown
                errors={errors}
                type="experience"
                label="Experience"
                name="technical_experience"
                control={control}
                setOpen={setExperienceOpen}
                setSelected={setSelectedExperience}
                open={experienceOpen}
              />
            </TabsContent>
          </Tabs>
          <CardFooter className="mt-6 px-0">
            <Button type="submit" className="w-full">
              Start Interview
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </form>
  );
}
