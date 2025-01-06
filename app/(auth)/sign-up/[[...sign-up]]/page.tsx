"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded) return;
    try {
      setIsLoading(true);
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      if (result.status === "complete") {
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    signUp?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/home",
    });
  };

  return (
    <Card className="w-full min-w-[400px] mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex justify-center pb-4">
          <Image
            src="/app-logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-auto h-5"
          />
        </div>
        <CardTitle className="text-xl font-medium tracking-tight text-center text-gray-700">
          Create an account
        </CardTitle>
        <CardDescription className="text-center text-gray-500">
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <span>loading...</span>}
              Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="flex w-full">
          <Button 
            variant="outline" 
            onClick={handleGoogleAuth}
            className="flex items-center justify-center gap-2 w-full"
          >
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google logo"
              width={20}
              height={20}
            />
            Continue with Google
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
