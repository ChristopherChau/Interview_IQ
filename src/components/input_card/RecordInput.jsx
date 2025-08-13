import { Textarea } from "@/components/ui/textarea";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { insertDetails } from "./apiFunctions/SubmitResponse";
import { rateResponse } from "./apiFunctions/LambdaFunctions";
import { useFeedbackStore } from "@/app/store/feedbackStore";
import { useNavStore } from "@/app/store/navRefreshStore";
import { useRouter } from "next/navigation";
import { insertInterview } from "./apiFunctions/SubmitResponse";

const RecordInput = ({
  session,
  isAnimatingText,
  question,
  setIsGrading,
  questionTitle,
}) => {
  const [buttonText, setButtonText] = useState("Record Response");
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [isDoneRecording, setIsDoneRecording] = useState(false);
  const [countdown, setCountdown] = useState(null);
  // const [interviewId, setInterviewId] = useState("");

  const { setQuestion, setResponse, setResult } = useFeedbackStore();
  const router = useRouter();
  const bumpNavbar = useNavStore((s) => s.bump);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          let newTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            newTranscript += event.results[i][0].transcript + " ";
          }

          setSpokenText((prev) => prev + newTranscript.trim());
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          setIsRecording(false);
        };

        recognition.onstart = () => {
          console.log("Speech recognition started");
        };

        recognition.onend = () => {
          console.log("Speech recognition ended");
        };

        recognitionRef.current = recognition;
      } else {
        alert("Speech recognition not supported in this browser.");
      }
    }
  }, []);

  const recordResponse = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      console.log(spokenText);
      setIsDoneRecording(true);
      setIsRecording(false);
      setButtonText("Submit Response");
    } else {
      if (countdown !== null) return;
      recognitionRef.current?.abort();
      setSpokenText("");
      setIsDoneRecording(false);
      setCountdown(3);
      setButtonText("Starting...");
    }
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (countdown === 0) {
      recognitionRef.current?.start();
      setIsRecording(true);
      setButtonText("Stop Recording");
      setCountdown(null);
    }
  }, [countdown]);

  const onSubmit = async () => {
    let result;
    const user_id = session.user.id;
    const insertInterviewResponse = await insertInterview(
      user_id,
      questionTitle
    );
    console.log(insertInterviewResponse.data[0].interview_id);
    // setInterviewId(insertInterviewResponse.data[0].interview_id);

    setIsGrading(true);
    if (!spokenText) {
      setSpokenText("No response");
      result = {}; 
    } else {
      const apiResult = await rateResponse(question, spokenText);
      result = apiResult.data;
    }
    setResult(result);
    console.log(result)
    setQuestion(question);
    setResponse(spokenText);
    const isGuest = localStorage.getItem("isGuest");
    if (isGuest == "false") { //Need to check string literal because the localStorage stored it as string

      const detailsResult = await insertDetails(
        insertInterviewResponse.data[0].interview_id,
        question,
        spokenText,
        result
      );
      bumpNavbar();
    }
    router.push(`/feedback/${insertInterviewResponse.data[0].interview_id}`);
  };

  return (
    <>
      <CardHeader>
        <CardDescription className="font-semibold text-base text-black ">
          Put in any notes you might have here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center">
        <Textarea placeholder="Start typing here." className="h-16" />
        <CardFooter className="mt-6 px-0">
          {isDoneRecording ? (
            <Button type="button" onClick={onSubmit} className="w-full">
              Submit Response
            </Button>
          ) : (
            <Button
              type="button"
              onClick={recordResponse}
              className="w-full"
              disabled={isAnimatingText}
            >
              {countdown !== null
                ? `Starting in ${countdown}...`
                : isAnimatingText
                ? "Loading Question"
                : buttonText}
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </>
  );
};

export default RecordInput;
