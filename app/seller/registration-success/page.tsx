import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistrationSuccessPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Registration Successful!</CardTitle>
          <CardDescription className="text-center">Your seller account has been created successfully</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>
            Thank you for registering as a seller on Zafago. Your account is now being reviewed by our team. This
            process typically takes 1-2 business days.
          </p>
          <p>
            You'll receive an email notification once your account is approved, and you can start selling your digital
            products on our platform.
          </p>
          <div className="bg-muted p-4 rounded-lg mt-4">
            <p className="font-medium">Next steps:</p>
            <ul className="text-sm text-muted-foreground text-left list-disc list-inside mt-2 space-y-1">
              <li>Complete your seller profile</li>
              <li>Set up your payment information</li>
              <li>Prepare your product listings</li>
              <li>Review our seller guidelines</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/seller/login">Continue to Login</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
