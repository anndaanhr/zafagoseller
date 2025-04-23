import Link from "next/link"

export function SellerFooter() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Zafago. All rights reserved.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/seller/terms" className="text-muted-foreground hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/seller/privacy" className="text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/seller/agreement" className="text-muted-foreground hover:text-foreground">
            Seller Agreement
          </Link>
          <Link href="/seller/contact" className="text-muted-foreground hover:text-foreground">
            Contact Support
          </Link>
        </nav>
      </div>
    </footer>
  )
}
