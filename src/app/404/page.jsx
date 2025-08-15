'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const ErrorPage = () => {
  const router = useRouter();

  const redirect = () => {
    router.push('/')
  }

  return (
    <main className="flex flex-col justify-center items-center h-full w-full gap-6">
      <h1 className="font-bold text-6xl">
        404 Error
      </h1>
      <div className="font-semibold text-4xl">
        Page not found or unauthorized
      </div>
      <Button className="text-xl cursor-pointer" onClick={redirect}>
        Return to Home
      </Button>
    </main>
  )
}

export default ErrorPage;