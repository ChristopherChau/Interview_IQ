"use client"
import { Progress } from "@/components/ui/progress";

const ScoreChart = ({ results }) => {
  const r = results?.result ?? results ?? {};

  const keys = ["overall", "structuring", "relevance", "depth", "correctness", "delivery"];
  const scores = Object.fromEntries(
    keys.map((k) => [k, Number(r?.[k]) || 0])
  );


  return (
    <div className="flex flex-col gap-6">
      {keys &&
        keys.map((label) => {
          const value = scores[label];
          return (
            <div key={label}>
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span className="text-base font-semibold">
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </span>
                <span>{value}/10</span>
              </div>
              <Progress
                value={(value / 10) * 100}
                className="h-3 bg-gray-200"
              />
            </div>
          );
        })}
    </div>
  );
};

export default ScoreChart;
