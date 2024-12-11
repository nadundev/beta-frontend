'use client'

import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, isLoaded: signInLoaded } = useSignIn()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signInLoaded) return
    try {
      setIsLoading(true)
      const result = await signIn.create({
        identifier: email,
        password,
      })
      
      if (result.status === "complete") {
        window.location.href = "/home";
      }
    } catch (error) {
      console.error('Error signing in:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/home"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <span>Loading...</span>}
              Sign In
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div>
          <Button variant="outline" onClick={handleGoogleAuth}>
            Google
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
