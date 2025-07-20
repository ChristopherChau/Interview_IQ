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

const NotesInput = () => {
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
          <Button type="submit" className="w-full">
            Record Response
          </Button>
        </CardFooter>
      </CardContent>
    </>
  );
};

export default NotesInput;
