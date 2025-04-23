import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SellerSidebar } from "@/components/seller-sidebar"
import { SellerFooter } from "@/components/seller-footer"

export default function TermsOfServicePage() {
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
              <h1 className="text-3xl font-bold">Terms of Service</h1>
              <p className="text-muted-foreground mt-2">Last updated: April 23, 2025</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
                <CardDescription>Welcome to Zafago Seller Portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  These Terms of Service ("Terms") govern your access to and use of the Zafago Seller Portal and
                  services ("Services"). By accessing or using our Services, you agree to be bound by these Terms.
                </p>
                <p>
                  Please read these Terms carefully before using our Services. If you do not agree to these Terms, you
                  may not access or use our Services.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>2. Seller Account</CardTitle>
                <CardDescription>Registration and account management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  To use our Services, you must create a seller account. You agree to provide accurate, current, and
                  complete information during the registration process and to update such information to keep it
                  accurate, current, and complete.
                </p>
                <p>
                  You are responsible for safeguarding your account credentials and for all activities that occur under
                  your account. You agree to notify us immediately of any unauthorized use of your account or any other
                  breach of security.
                </p>
                <p>
                  We reserve the right to disable your account if we determine, in our sole discretion, that you have
                  violated these Terms or if we believe your actions may cause financial loss or legal liability for
                  you, our users, or us.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>3. Seller Obligations</CardTitle>
                <CardDescription>Your responsibilities as a seller</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  As a seller on Zafago, you are responsible for ensuring that all products you list comply with
                  applicable laws and regulations. You must have the legal right to sell the products you list.
                </p>
                <p>
                  You agree to provide accurate and complete information about your products, including descriptions,
                  images, pricing, and availability. You are responsible for maintaining the accuracy of this
                  information.
                </p>
                <p>
                  You agree to fulfill all orders promptly and to provide excellent customer service. You are
                  responsible for handling customer inquiries, complaints, and refund requests in a timely and
                  professional manner.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>4. Fees and Payments</CardTitle>
                <CardDescription>Commission structure and payment terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Zafago charges a commission on each sale made through our platform. The commission rate varies by
                  product category and is specified in the Seller Dashboard.
                </p>
                <p>
                  Payments for your sales, less our commission and any applicable fees, will be made to your designated
                  payment method according to the payment schedule specified in the Seller Dashboard.
                </p>
                <p>
                  You are responsible for paying all taxes associated with your sales. Zafago may collect and remit
                  taxes on your behalf in certain jurisdictions, but this does not relieve you of your tax obligations.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>5. Prohibited Activities</CardTitle>
                <CardDescription>Activities that are not allowed on our platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>You agree not to engage in any of the following prohibited activities:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Selling counterfeit, pirated, or unauthorized products</li>
                  <li>Selling products that infringe on intellectual property rights</li>
                  <li>Selling products that are illegal or violate applicable laws or regulations</li>
                  <li>Manipulating ratings or reviews</li>
                  <li>Engaging in deceptive or fraudulent practices</li>
                  <li>Attempting to circumvent our fee structure</li>
                  <li>Using our platform to distribute malware, viruses, or other harmful code</li>
                  <li>Scraping or collecting data from our platform without our express permission</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>6. Termination</CardTitle>
                <CardDescription>Account suspension and termination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  We may suspend or terminate your account at any time for any reason, including but not limited to a
                  violation of these Terms, without notice or liability.
                </p>
                <p>
                  Upon termination, your right to use the Services will immediately cease. All provisions of these Terms
                  that by their nature should survive termination shall survive termination, including, without
                  limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>7. Changes to Terms</CardTitle>
                <CardDescription>How we update our Terms of Service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  We may modify these Terms at any time. If we make changes to these Terms, we will provide notice of
                  such changes, such as by sending an email, providing a notice through our Services, or updating the
                  date at the top of these Terms.
                </p>
                <p>
                  Your continued use of our Services following the posting of revised Terms means that you accept and
                  agree to the changes. We encourage you to review the Terms whenever you access or use our Services.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>8. Contact Information</CardTitle>
                <CardDescription>How to reach us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  If you have any questions about these Terms, please contact us at{" "}
                  <a href="mailto:legal@zafago.com" className="text-primary hover:underline">
                    legal@zafago.com
                  </a>
                  .
                </p>
              </CardContent>
            </Card>

            <Separator className="my-8" />

            <div className="text-center text-sm text-muted-foreground">
              <p>
                By using the Zafago Seller Portal, you acknowledge that you have read, understood, and agree to be bound
                by these Terms of Service.
              </p>
            </div>
          </div>
        </main>
      </div>
      <SellerFooter />
    </div>
  )
}
