"use client";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md active:scale-95"
    >
      <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-5 w-5" alt="G" />
      Sign in with Google
    </button>
  );
}