import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SellerSidebar } from "@/components/seller-sidebar"
import { SellerFooter } from "@/components/seller-footer"

export default function PrivacyPolicyPage() {
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
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground mt-2">Last updated: April 23, 2025</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
                <CardDescription>Our commitment to your privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  At Zafago, we respect your privacy and are committed to protecting your personal data. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard your information when you use our Seller
                  Portal.
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                  please do not access the Seller Portal.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>2. Information We Collect</CardTitle>
                <CardDescription>Types of data we gather from sellers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>We collect several types of information from and about sellers, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Personal Identification Information:</strong> Name, email address, postal address, phone
                    number, and other similar contact data.
                  </li>
                  <li>
                    <strong>Business Information:</strong> Company name, business type, tax identification numbers, and
                    other business-related data.
                  </li>
                  <li>
                    <strong>Financial Information:</strong> Bank account details, payment card details, and transaction
                    history.
                  </li>
                  <li>
                    <strong>Product Information:</strong> Details about the products you list, including descriptions,
                    images, pricing, and inventory.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you use our Seller Portal, including log data,
                    device information, location data, and cookies.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>3. How We Use Your Information</CardTitle>
                <CardDescription>Purposes for which we process your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>We use the information we collect for various purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and maintain our Seller Portal</li>
                  <li>To process and fulfill orders</li>
                  <li>To manage your seller account</li>
                  <li>To process payments and transfers</li>
                  <li>To communicate with you about your account, products, or orders</li>
                  <li>To provide customer support</li>
                  <li>To personalize your experience</li>
                  <li>To improve our Seller Portal</li>
                  <li>To protect against fraud and unauthorized transactions</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>4. Disclosure of Your Information</CardTitle>
                <CardDescription>When and with whom we share your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>We may disclose your personal information to the following categories of recipients:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as
                    payment processing, data analysis, email delivery, hosting services, and customer service.
                  </li>
                  <li>
                    <strong>Business Partners:</strong> Partners with whom we jointly offer products or services.
                  </li>
                  <li>
                    <strong>Buyers:</strong> Limited information may be shared with buyers to facilitate transactions.
                  </li>
                  <li>
                    <strong>Legal Authorities:</strong> We may disclose your information if required to do so by law or
                    in response to valid requests by public authorities.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with any merger, sale of company assets,
                    financing, or acquisition of all or a portion of our business.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>5. Data Security</CardTitle>
                <CardDescription>How we protect your information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  We have implemented appropriate technical and organizational security measures designed to protect the
                  security of any personal information we process. However, please note that no electronic transmission
                  or storage of information can be entirely secure, and we cannot guarantee absolute security.
                </p>
                <p>
                  We will take reasonable steps to ensure the secure processing of your personal information, including
                  using encryption, access controls, and regular security assessments.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>6. Your Data Protection Rights</CardTitle>
                <CardDescription>Control over your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The right to access the personal information we hold about you</li>
                  <li>The right to request correction of inaccurate personal information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to object to processing of your personal information</li>
                  <li>The right to request restriction of processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{" "}
                  <a href="mailto:privacy@zafago.com" className="text-primary hover:underline">
                    privacy@zafago.com
                  </a>
                  .
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>7. Changes to This Privacy Policy</CardTitle>
                <CardDescription>How we update our privacy practices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy
                  Policy.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                  Policy are effective when they are posted on this page.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>8. Contact Us</CardTitle>
                <CardDescription>How to reach our privacy team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@zafago.com" className="text-primary hover:underline">
                    privacy@zafago.com
                  </a>
                  .
                </p>
              </CardContent>
            </Card>

            <Separator className="my-8" />

            <div className="text-center text-sm text-muted-foreground">
              <p>
                By using the Zafago Seller Portal, you acknowledge that you have read and understood this Privacy Policy
                and agree to its terms.
              </p>
            </div>
          </div>
        </main>
      </div>
      <SellerFooter />
    </div>
  )
}
