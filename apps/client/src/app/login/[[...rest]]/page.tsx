"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-md rounded-xl",
          },
        }}
        forceRedirectUrl="/"
        signUpUrl="/register"
      />
    </div>
  );
}
