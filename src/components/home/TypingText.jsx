import { useEffect, useState } from "react";

export default function TypingText({ text, speed = 40 , setIsAnimatingText}) {
  const [typedQuestion, setTypedQuestion] = useState("");
  useEffect(() => {
    if (!text) return;
    setIsAnimatingText(true);

    let index = 0;
    const interval = setInterval(() => {
      const nextChar = text[index];
      setTypedQuestion((prev) => prev + nextChar);
      index++;
      if (index >= text.length){
      setIsAnimatingText(false);  
      clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval); 
  }, [text]);

  return <p className="text-2xl text-center font-medium whitespace-pre-wrap">{typedQuestion}</p>;
}
