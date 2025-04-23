"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

export function SellerSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [sellerName, setSellerName] = useState("")

  useEffect(() => {
    // Get seller info from localStorage
    const sellerInfo = localStorage.getItem("zafago_seller")
    if (sellerInfo) {
      const seller = JSON.parse(sellerInfo)
      setSellerName(seller.name || "Seller")
    }
  }, [])

  const handleLogout = () => {
    // Clear seller info from localStorage
    localStorage.removeItem("zafago_seller")

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })

    // Redirect to login page
    router.push("/seller/login")
  }

  const isActive = (path) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const navigationItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/seller/dashboard",
    },
    {
      title: "Products",
      icon: <Package className="h-5 w-5" />,
      href: "/seller/products",
    },
    {
      title: "Sales",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/seller/sales",
    },
    {
      title: "Withdrawals",
      icon: <DollarSign className="h-5 w-5" />,
      href: "/seller/withdrawals",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/seller/settings",
    },
  ]

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div
      className={`hidden md:flex flex-col h-screen bg-card border-r p-4 ${
        isCollapsed ? "w-[70px]" : "w-[250px]"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        <Link href="/seller/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            Z
          </div>
          {!isCollapsed && <span className="font-bold text-xl">Zafago</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 rounded-full"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="space-y-1">
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive(item.href) ? "default" : "ghost"}
              className={`w-full justify-start ${isCollapsed ? "px-2" : ""}`}
            >
              {item.icon}
              {!isCollapsed && <span className="ml-2">{item.title}</span>}
            </Button>
          </Link>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <Button
          variant="ghost"
          className={`w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 ${
            isCollapsed ? "px-2" : ""
          }`}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>

        {!isCollapsed && (
          <div className="mt-4 p-3 rounded-lg bg-muted">
            <p className="text-sm font-medium">Logged in as</p>
            <p className="text-sm text-muted-foreground truncate">{sellerName}</p>
          </div>
        )}
      </div>
    </div>
  )

  // Mobile sidebar (using Sheet component)
  const MobileSidebar = () => (
    <div className="md:hidden">
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex flex-col h-full bg-card p-4">
            <div className="flex items-center justify-between mb-6">
              <Link href="/seller/dashboard" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  Z
                </div>
                <span className="font-bold text-xl">Zafago</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                  <Button variant={isActive(item.href) ? "default" : "ghost"} className="w-full justify-start">
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Button>
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2">Logout</span>
              </Button>

              <div className="mt-4 p-3 rounded-lg bg-muted">
                <p className="text-sm font-medium">Logged in as</p>
                <p className="text-sm text-muted-foreground truncate">{sellerName}</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

// ChevronLeft icon component
function ChevronLeft({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}
