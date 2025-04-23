"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function SellerLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

    try {
      // In a real app, this would be an API call to authenticate the seller
      // For demo purposes, we'll simulate a successful login with any credentials
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (!email.includes("@") || password.length < 6) {
        setLoginError("Invalid email or password")
        setIsLoading(false)
        return
      }

      // Store seller info in localStorage for demo purposes
      localStorage.setItem(
        "zafago_seller",
        JSON.stringify({
          id: "s-" + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split("@")[0],
          isLoggedIn: true,
        }),
      )

      toast({
        title: "Login successful",
        description: "Welcome to your seller dashboard.",
      })

      router.push("/seller/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setLoginError("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image
              src="/placeholder.svg?height=40&width=40&text=Z"
              alt="Zafago Logo"
              width={40}
              height={40}
              className="rounded-full bg-primary"
            />
          </div>
          <CardTitle className="text-2xl text-center">Seller Login</CardTitle>
          <CardDescription className="text-center">
            Sign in to your seller account to manage your products and sales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/seller/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            {loginError && <div className="text-sm text-destructive">{loginError}</div>}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me
              </Label>
            </div>
            <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground">
            Don't have a seller account?{" "}
            <Link href="/seller/register" className="text-primary hover:underline">
              Register now
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
