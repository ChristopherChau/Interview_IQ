'use client';
import { useFeedbackStore } from "../store/feedbackStore";
import LoadingSpinner from "@/components/LoadingSpinner";

const FeedbackPage = () => {
  const result = useFeedbackStore((state) => state.result);

  return (
    <>
      <div>Stuff</div>
    </>
  );
};

export default FeedbackPage;
