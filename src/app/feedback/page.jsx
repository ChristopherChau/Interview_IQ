"use client";
import { useFeedbackStore } from "../store/feedbackStore";
import { useState, useEffect } from "react";
import ProfileMenu from "@/components/profilemenu/ProfileMenu";
import Details from "./Details";
import { ReaderIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScoreChart from "./ScoreChart";

const FeedbackPage = () => {
  const storeResult = useFeedbackStore((state) => state.result);
  const storeQuestion = useFeedbackStore((state) => state.question);
  const storeResponse = useFeedbackStore((state) => state.response);

  const [result, setResult] = useState(null);
  const [question, setQuestion] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setResult(storeResult);
    setQuestion(storeQuestion);
    setResponse(storeResponse);
  }, [storeResult, storeQuestion, storeResponse]);

  useEffect(() => {
    if (result || question || response) {
      console.log("Updated values:");
      console.log("Question:", question);
      console.log("Response:", response);
      console.log("Result:", result);
    }
  }, [result, question, response]);

  return (
    <>
      <main className="relative flex flex-col z-10 w-full h-full justify-center">
        <div className="absolute top-4 right-4">
          <ProfileMenu />
        </div>
        <div className="flex w-full h-auto mt-24">
          <p className="flex-[2] text-2xl">{question}</p>
          <p className="flex-[1]"></p>
        </div>
        <div className="grid w-full h-full mt-10 gap-4 grid-cols-1 md:grid-cols-3">
          <div className="col-span-2 w-full">
            <Tabs defaultValue="feedback">
              <TabsList className="">
                <TabsTrigger value="feedback">
                  <ReaderIcon />
                  Feedback
                </TabsTrigger>
              </TabsList>
              <hr></hr>
              <TabsContent value="feedback">
                <Details results={result} />
              </TabsContent>
            </Tabs>
          </div>
          <div className="py-12 px-4 flex-[1] w-full">
            <ScoreChart results={result} />
          </div>
        </div>
      </main>
    </>
  );
};

export default FeedbackPage;
