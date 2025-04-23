import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { SellerSidebar } from "@/components/seller-sidebar"
import { SellerFooter } from "@/components/seller-footer"

export default function ContactSupportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <SellerSidebar />
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-5 pt-6">
            <div className="mb-6">
              <Button variant="outline" size="sm" asChild className="mb-6">
                <Link href="/seller/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Contact Support</h1>
              <p className="text-muted-foreground mt-2">Get help with your seller account and products</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-primary" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">For general inquiries and non-urgent issues</p>
                  <a href="mailto:sellers@zafago.com" className="text-primary hover:underline block mt-2">
                    sellers@zafago.com
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">Response time: 24-48 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-primary" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">For urgent issues requiring immediate assistance</p>
                  <a href="tel:+18005551234" className="text-primary hover:underline block mt-2">
                    +1 (800) 555-1234
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">Available Mon-Fri, 9am-5pm EST</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Live Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">For real-time assistance with your account</p>
                  <Button variant="outline" className="mt-2 w-full">
                    Start Chat
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Available Mon-Fri, 9am-7pm EST</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is your message about?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Please describe your issue in detail" rows={5} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="order-id">Order ID (if applicable)</Label>
                    <Input id="order-id" placeholder="e.g. ORD-12345" />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">How long does it take to get approved as a seller?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    The seller approval process typically takes 1-2 business days. We'll notify you by email once your
                    application has been reviewed.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">When will I receive payment for my sales?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Payments are processed bi-weekly for all sales where the funds have been cleared and the withdrawal
                    threshold of $50 has been met.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">How do I handle customer refund requests?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Customer refund requests can be managed through the Orders section of your Seller Dashboard. You
                    have 48 hours to approve or deny a refund request.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">What file formats are supported for digital products?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We support most common file formats including PDF, ZIP, RAR, EXE, DMG, MP3, MP4, and many others.
                    The maximum file size is 50GB per product.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">How can I promote my products on Zafago?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can use our promotional tools in the Marketing section of your Seller Dashboard to create
                    discount codes, run flash sales, or apply for featured placement on our homepage.
                  </p>
                </div>

                <div className="mt-6">
                  <Link href="/seller/faq" className="text-primary hover:underline">
                    View all FAQs →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Our Office</h2>
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <p className="text-muted-foreground">
                  123 Commerce Street, Suite 500, Wilmington, DE 19801, United States
                </p>
              </div>
              <div className="h-64 w-full rounded-lg overflow-hidden bg-muted">
                {/* This would be a map in a real implementation */}
                <div className="h-full w-full flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Map would be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <SellerFooter />
    </div>
  )
}
