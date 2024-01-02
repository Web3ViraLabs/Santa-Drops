"use client";

import Login from "@/components/connect/authenticate";
import LoginModal from "@/modals/login-modal";

export default function Home() {
  return (
    <div className="w-full h-full bg-main overflow-y-auto p-6 space-y-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Featured</h1>
      </div>
    </div>
  );
}
