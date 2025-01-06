"use client";

import { UserButton } from "@clerk/nextjs";
import { CookingPot, Home, Dumbbell } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Sidebar() {
  const [apiStatus, setApiStatus] = useState<
    "available" | "unavailable" | "checking"
  >("checking");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const pathname = usePathname();

  const checkApiStatus = async () => {
    try {
      const response = await fetch("/api/health-check");
      const data = await response.json();
      setApiStatus(data.status);
      if (data.status === "available") {
        setShowErrorDialog(false);
      } else {
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error("API Status check failed:", error);
      setApiStatus("unavailable");
      setShowErrorDialog(true);
    }
  };

  useEffect(() => {
    checkApiStatus();
    const interval = setInterval(checkApiStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="bg-white border-r border-gray-200 h-screen w-[60px] flex flex-col justify-between py-2.5">
        <div className="flex flex-col items-center gap-4">
          <TooltipProvider>
            <div className="flex items-center justify-center">
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src="/app-logo-small.svg"
                    alt="App Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </TooltipTrigger>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/home">
                  <span
                    className={`flex items-center justify-center p-2 rounded-full ${
                      pathname === "/home" ? "bg-gray-100" : "bg-gray-50"
                    } border border-gray-200`}
                  >
                    <Home className="h-4 w-4 text-gray-700" />
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Home</p>
              </TooltipContent>
            </Tooltip>

            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/dietPlanner">
                    <span
                      className={`flex items-center justify-center p-2 rounded-full ${
                        pathname.includes("/dietPlanner")
                          ? "bg-gray-100"
                          : "bg-gray-50"
                      } border border-gray-200`}
                    >
                      <CookingPot className="h-4 w-4 text-gray-700" />
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Diet Planner</p>
                </TooltipContent>
              </Tooltip>
              <span
                className={`absolute -bottom-[0px] -right-[0px] h-2 w-2 rounded-full ${
                  apiStatus === "available"
                    ? "bg-green-500"
                    : apiStatus === "unavailable"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              />
            </div>
          </TooltipProvider>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center">
                <UserButton afterSignOutUrl="/sign-in" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Account Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Connection Error</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Unable to connect to the API. This is required for generating diet
              plans.
            </p>
            <Button onClick={checkApiStatus} className="w-full">
              Retry Connection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
