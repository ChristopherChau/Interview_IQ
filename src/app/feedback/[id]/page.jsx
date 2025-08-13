"use client";
import { useFeedbackStore } from "../../store/feedbackStore";
import { useState, useEffect } from "react";
import ProfileMenu from "@/components/profilemenu/ProfileMenu";
import Details from "../Details";
import { ReaderIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScoreChart from "../ScoreChart";
import { useParams } from "next/navigation";
import getInterviewDetails from "./utils";
import LoadingSpinner from "@/components/LoadingSpinner";

const FeedbackPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await getInterviewDetails(id);
        setResult(result.feedback);
        setQuestion(result.question);
        setIsLoading(false);
      } catch (err) {
        console.error(`Error trying to get details for ${id}: `, err);
      }
    })();
  }, []);

  return (
    <>
      <main className="relative flex flex-col z-10 w-full h-full justify-center">
        {isLoading ? (
          <LoadingSpinner text="Loading" />
        ) : (
          <>
            <div className="absolute top-4 right-4">
              <ProfileMenu />
            </div>
            <div className="flex w-full h-auto mt-24">
              <p className="flex-[2] text-2xl">
                {question || "No response given or no interview found"}
              </p>
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
          </>
        )}
      </main>
    </>
  );
};

export default FeedbackPage;
