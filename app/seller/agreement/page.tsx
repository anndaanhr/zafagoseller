import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SellerSidebar } from "@/components/seller-sidebar"
import { SellerFooter } from "@/components/seller-footer"

export default function SellerAgreementPage() {
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
              <h1 className="text-3xl font-bold">Seller Agreement</h1>
              <p className="text-muted-foreground mt-2">Last updated: April 23, 2025</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>1. Seller Agreement Overview</CardTitle>
                <CardDescription>Legal relationship between Zafago and Sellers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  This Seller Agreement ("Agreement") is a legally binding contract between you ("Seller") and Zafago
                  Inc. ("Zafago", "we", "us", or "our") that governs your access to and use of the Zafago Seller Portal
                  and services for listing and selling digital products.
                </p>
                <p>
                  By registering for or using the Zafago Seller Portal, you agree to be bound by the terms of this
                  Agreement, our Terms of Service, Privacy Policy, and all applicable policies and guidelines.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>2. Seller Eligibility</CardTitle>
                <CardDescription>Requirements to become a Zafago seller</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>To be eligible to register as a Seller on Zafago, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be at least 18 years of age or the age of majority in your jurisdiction, whichever is greater</li>
                  <li>Have a valid email address and phone number</li>
                  <li>Provide accurate and complete information during the registration process</li>
                  <li>Have a valid tax identification number or business registration</li>
                  <li>Have a valid bank account or other approved payment method for receiving payments</li>
                  <li>Comply with all applicable laws and regulations in your jurisdiction</li>
                  <li>Not have previously been suspended or removed from the Zafago platform</li>
                </ul>
                <p>
                  Zafago reserves the right to reject any Seller application or to terminate any Seller account at any
                  time for any reason, including but not limited to violation of this Agreement.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>3. Product Requirements</CardTitle>
                <CardDescription>Guidelines for products sold on Zafago</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>All products listed on Zafago must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be digital products that can be delivered electronically</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not infringe on any intellectual property rights</li>
                  <li>Not contain malware, viruses, or other harmful code</li>
                  <li>Not promote hate speech, violence, or discrimination</li>
                  <li>Not contain adult content or pornography</li>
                  <li>Not promote illegal activities</li>
                  <li>Be accurately described with clear information about what the customer will receive</li>
                  <li>Have appropriate age ratings if applicable</li>
                </ul>
                <p>
                  Zafago reserves the right to remove any product that violates these requirements or that we determine,
                  in our sole discretion, is inappropriate for our platform.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>4. Commission and Fees</CardTitle>
                <CardDescription>Financial terms for selling on Zafago</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  <strong>Commission Structure:</strong> Zafago charges a commission on each sale made through our
                  platform. The standard commission rate is 15% of the sale price, but this may vary by product category
                  or promotional periods.
                </p>
                <p>
                  <strong>Payment Processing Fees:</strong> A payment processing fee of 2.9% + $0.30 per transaction
                  will be deducted from your earnings.
                </p>
                <p>
                  <strong>Withdrawal Fees:</strong> Withdrawals to your bank account are free for standard processing
                  (3-5 business days). Expedited withdrawals (1-2 business days) incur a fee of $5.00 per withdrawal.
                </p>
                <p>
                  <strong>Tax Responsibilities:</strong> You are responsible for all taxes associated with your sales.
                  Zafago will provide you with necessary tax documentation and may collect and remit taxes on your
                  behalf in certain jurisdictions as required by law.
                </p>
                <p>
                  <strong>Fee Changes:</strong> Zafago reserves the right to change the commission rates and fees at any
                  time. We will provide at least 30 days' notice of any changes to our fee structure.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>5. Payment Terms</CardTitle>
                <CardDescription>How and when sellers get paid</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  <strong>Payment Schedule:</strong> Payments are made to sellers on a bi-weekly basis for all sales
                  where the funds have been cleared and the withdrawal threshold has been met.
                </p>
                <p>
                  <strong>Withdrawal Threshold:</strong> The minimum amount required for withdrawal is $50.00. Balances
                  below this threshold will roll over to the next payment period.
                </p>
                <p>
                  <strong>Payment Methods:</strong> Payments can be made via direct bank transfer, PayPal, or other
                  approved payment methods as specified in your Seller Dashboard.
                </p>
                <p>
                  <strong>Hold Period:</strong> Funds from sales may be subject to a hold period of up to 14 days to
                  allow for potential refunds or chargebacks.
                </p>
                <p>
                  <strong>Refunds and Chargebacks:</strong> If a customer is issued a refund or initiates a chargeback,
                  the corresponding amount will be deducted from your current or future earnings.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>6. Intellectual Property</CardTitle>
                <CardDescription>Rights and responsibilities regarding IP</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  <strong>Your Intellectual Property:</strong> You retain all intellectual property rights to your
                  products. However, you grant Zafago a non-exclusive, worldwide, royalty-free license to use,
                  reproduce, distribute, and display your product listings and related content for the purpose of
                  promoting and selling your products on our platform.
                </p>
                <p>
                  <strong>Zafago's Intellectual Property:</strong> The Zafago name, logo, website, and all content and
                  software associated with our services are protected by intellectual property rights and belong to
                  Zafago or its licensors.
                </p>
                <p>
                  <strong>Third-Party Intellectual Property:</strong> You represent and warrant that your products do
                  not infringe on any third-party intellectual property rights. You agree to indemnify and hold Zafago
                  harmless from any claims arising from alleged infringement of intellectual property rights.
                </p>
                <p>
                  <strong>DMCA Compliance:</strong> Zafago complies with the Digital Millennium Copyright Act (DMCA). If
                  you believe that your intellectual property rights have been infringed, please contact our designated
                  copyright agent as specified in our Terms of Service.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>7. Term and Termination</CardTitle>
                <CardDescription>Duration and ending of the seller relationship</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  <strong>Term:</strong> This Agreement remains in effect until terminated by either party.
                </p>
                <p>
                  <strong>Termination by Seller:</strong> You may terminate this Agreement at any time by providing
                  written notice to Zafago and closing your Seller account.
                </p>
                <p>
                  <strong>Termination by Zafago:</strong> Zafago may terminate this Agreement and your Seller account at
                  any time for any reason, with or without notice.
                </p>
                <p>
                  <strong>Effect of Termination:</strong> Upon termination, you will no longer have access to the Seller
                  Portal, and your products will be removed from the Zafago marketplace. Any pending sales will be
                  processed, and you will receive any outstanding payments according to our payment schedule.
                </p>
                <p>
                  <strong>Survival:</strong> Sections related to intellectual property, indemnification, limitation of
                  liability, and any other provisions that by their nature should survive termination will survive
                  termination of this Agreement.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>8. Dispute Resolution</CardTitle>
                <CardDescription>How conflicts between parties are handled</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  <strong>Governing Law:</strong> This Agreement shall be governed by and construed in accordance with
                  the laws of the State of Delaware, without regard to its conflict of law principles.
                </p>
                <p>
                  <strong>Arbitration:</strong> Any dispute arising out of or relating to this Agreement shall be
                  resolved by binding arbitration in accordance with the rules of the American Arbitration Association.
                  The arbitration shall take place in Delaware, and the language of the arbitration shall be English.
                </p>
                <p>
                  <strong>Class Action Waiver:</strong> You agree to resolve any disputes with Zafago on an individual
                  basis and waive any right to participate in a class action lawsuit or class-wide arbitration.
                </p>
                <p>
                  <strong>Injunctive Relief:</strong> Notwithstanding the foregoing, Zafago may seek injunctive or other
                  equitable relief in any court of competent jurisdiction to prevent the actual or threatened
                  infringement, misappropriation, or violation of our intellectual property rights.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>9. Contact Information</CardTitle>
                <CardDescription>How to reach Zafago</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  If you have any questions about this Seller Agreement, please contact us at{" "}
                  <a href="mailto:sellers@zafago.com" className="text-primary hover:underline">
                    sellers@zafago.com
                  </a>
                  .
                </p>
                <p>
                  For legal notices, please contact us at{" "}
                  <a href="mailto:legal@zafago.com" className="text-primary hover:underline">
                    legal@zafago.com
                  </a>{" "}
                  or at our mailing address:
                </p>
                <p>
                  Zafago Inc.
                  <br />
                  123 Commerce Street
                  <br />
                  Suite 500
                  <br />
                  Wilmington, DE 19801
                  <br />
                  United States
                </p>
              </CardContent>
            </Card>

            <Separator className="my-8" />

            <div className="text-center text-sm text-muted-foreground">
              <p>
                By using the Zafago Seller Portal, you acknowledge that you have read, understood, and agree to be bound
                by this Seller Agreement.
              </p>
            </div>
          </div>
        </main>
      </div>
      <SellerFooter />
    </div>
  )
}
