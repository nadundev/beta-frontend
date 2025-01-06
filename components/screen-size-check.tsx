"use client";

import { useEffect, useState } from "react";

export function ScreenSizeCheck({ children }: { children: React.ReactNode }) {
  const [isValidScreen, setIsValidScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsValidScreen(window.innerWidth >= 1024);
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isValidScreen) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Screen Size Not Supported
          </h1>
          <p className="text-gray-600">
            This application requires a minimum screen width of 1024 pixels. 
            Please use a larger device or resize your browser window.
          </p>
        </div>
      </div>
    );
  }

  return children;
} 