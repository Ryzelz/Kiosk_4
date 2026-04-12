"use client";

import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-md rounded-xl",
          },
        }}
        forceRedirectUrl="/"
        signInUrl="/login"
      />
    </div>
  );
}
