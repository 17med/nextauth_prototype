"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true); 
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(false); 
    }
  };
  return (
    <button
      onClick={handleSignIn}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md active:scale-95"
    >
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        className="h-5 w-5"
        alt="G" 
      />
      {isLoading ? "Chargement..." : "Se connecter avec Google"}{" "}
    </button>
  );
}
