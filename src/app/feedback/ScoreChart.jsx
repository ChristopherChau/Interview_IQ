import { Progress } from "@/components/ui/progress";

const ScoreChart = ({ results }) => {
  const newResults = {
    overall: 0,
    structuring: 0,
    relevance: 0,
    depth: 0,
    correctness: 0,
    delivery: 0
  };
  if (results && typeof results === "object") {
    for (const [key, value] of Object.entries(results)) {
      if (key === "overall" || key === "notes") continue;
      newResults[key] = value;
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {newResults &&
        Object.entries(newResults).map(([label, value]) => {
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
