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
  const [selectedTab, setSelectedTab] = useState("behavioral");
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "",
      experience: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {
    console.log("Implement submit button");
  };
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

  return (
    <form>
      <Card>
        <CardHeader>
          <CardDescription>Choose your interview style</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center">
          <Tabs defaultValue="behavioral" className="w-[400px]">
            <TabsList>
              <TabsTrigger
                className="px-16 h-full rounded-xl data-[state=active]:bg-[#171717] data-[state=active]:text-white"
                value="behavioral"
              >
                Behavioral
              </TabsTrigger>
              <TabsTrigger
                className="px-16 h-full rounded-xl data-[state=active]:bg-[#171717] data-[state=active]:text-white"
                value="technical"
              >
                Technical
              </TabsTrigger>
            </TabsList>
            <TabsContent value="behavioral" className="flex flex-col gap-2">
              <Dropdown
                type="behavioral"
                label="Industry"
                name="behavioral_role"
                control={control}
                setOpen={setRoleOpen}
                setSelected={setSelectedRole}
                open={roleOpen}
              />
              <Dropdown
                type="experience"
                label="Experience"
                name="behavioral_experience"
                control={control}
                setOpen={setExperienceOpen}
                setSelected={setSelectedExperience}
                open={experienceOpen}
              />
              <Dropdown
                type="focus"
                label="Focus"
                name="behavioral_focus"
                control={control}
                setOpen={setFocusOpen}
                setSelected={setSelectedFocus}
                open={focusOpen}
              />
            </TabsContent>
            <TabsContent value="technical"></TabsContent>
          </Tabs>
          <CardFooter className="mt-4 px-0">
            <Button className="w-full">Start Interview</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </form>
  );
}
