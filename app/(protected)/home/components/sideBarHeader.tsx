"use client";

import { UserButton } from "@clerk/nextjs";

export function SideBarHeader() {
  return (
    <nav className="bg-white border-r border-gray-200 h-screen w-[60px] flex flex-col justify-between py-2.5">
      <div className="flex items-center justify-center">
        <h1 className="font-semibold text-xl text-gray-700">DD</h1>
      </div>
      <div className="flex items-center justify-center">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
} 