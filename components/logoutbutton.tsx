"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })} 
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-red-300 bg-red-600 px-4 py-3 font-medium text-white transition-all hover:bg-red-500 hover:shadow-md active:scale-95"
    >
      Sign out
    </button>
  );
}
