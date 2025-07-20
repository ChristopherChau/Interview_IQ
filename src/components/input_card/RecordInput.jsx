import { Textarea } from "@/components/ui/textarea";
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
import { useState, useEffect } from "react";
import { insertDetails } from "./apiFunctions/SubmitResponse";



const RecordInput = ({interview_id, isAnimatingText}) => {
  const [buttonText, setButtonText] = useState("Record Response")

  const onSubmit = () => {
    console.log(interview_id)
  }

  useEffect(() => {
    console.log(isAnimatingText)
  }, [isAnimatingText])
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
          <Button type="submit" onClick={onSubmit} className="w-full" disabled={isAnimatingText}>
            {isAnimatingText ? "Loading Question" : buttonText}
          </Button>
        </CardFooter>
      </CardContent>
    </>
  );
};

export default RecordInput;
