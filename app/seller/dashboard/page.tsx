"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SellerSidebar } from "@/components/seller-sidebar"
import { SellerFooter } from "@/components/seller-footer"

// Mock data for the dashboard
const mockSalesData = [
  { id: 1, product: "Elden Ring", platform: "Steam", date: "2023-04-22", amount: 59.99, status: "completed" },
  { id: 2, product: "Cyberpunk 2077", platform: "Epic Games", date: "2023-04-21", amount: 49.99, status: "completed" },
  {
    id: 3,
    product: "Microsoft Office 2023",
    platform: "Windows",
    date: "2023-04-20",
    amount: 149.99,
    status: "completed",
  },
  { id: 4, product: "Elden Ring", platform: "Steam", date: "2023-04-19", amount: 59.99, status: "completed" },
  { id: 5, product: "Cyberpunk 2077", platform: "Epic Games", date: "2023-04-18", amount: 49.99, status: "completed" },
]

export default function SellerDashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [sellerData, setSellerData] = useState(null)

  useEffect(() => {
    // Check if seller is logged in
    const sellerInfo = localStorage.getItem("zafago_seller")
    if (!sellerInfo) {
      router.push("/seller/login")
      return
    }

    // Load seller data
    setSellerData(JSON.parse(sellerInfo))

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <SellerSidebar />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Reports
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Sales Report (CSV)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Revenue Report (CSV)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Product Performance (PDF)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>
                <Link href="/seller/products/new">Add New Product</Link>
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$4,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">+201 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+3 new this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2%</div>
                    <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                      <BarChart3 className="h-16 w-16 text-muted" />
                      <span className="ml-2 text-muted-foreground">Revenue chart will appear here</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>You made 23 sales this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {mockSalesData.slice(0, 5).map((sale) => (
                        <div key={sale.id} className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{sale.product}</p>
                            <p className="text-sm text-muted-foreground">{sale.platform}</p>
                          </div>
                          <div className="ml-auto font-medium">${sale.amount.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Your best performing products this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Elden Ring</p>
                          <div className="text-xs text-muted-foreground">Steam</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                          <div className="text-sm font-medium text-green-500">+32%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Cyberpunk 2077</p>
                          <div className="text-xs text-muted-foreground">Epic Games</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                          <div className="text-sm font-medium text-green-500">+18%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Microsoft Office 2023</p>
                          <div className="text-xs text-muted-foreground">Windows</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                          <div className="text-sm font-medium text-red-500">-5%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Platform Distribution</CardTitle>
                    <CardDescription>Sales distribution across platforms.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Steam</p>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[65%] rounded-full bg-primary"></div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">65%</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Epic Games</p>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[25%] rounded-full bg-primary"></div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">25%</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Windows</p>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[10%] rounded-full bg-primary"></div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">10%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent seller account activity.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">New product added</p>
                          <p className="text-xs text-muted-foreground">You added "Elden Ring DLC" to your products</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Withdrawal processed</p>
                          <p className="text-xs text-muted-foreground">Your withdrawal of $750.00 has been processed</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Detailed analytics for your seller account.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-16 w-16 text-muted" />
                    <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Detailed analytics will be displayed here with charts and metrics.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Generate and download reports for your seller account.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <Download className="mx-auto h-16 w-16 text-muted" />
                    <h3 className="mt-4 text-lg font-medium">Reports Center</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Generate custom reports for sales, revenue, and product performance.
                    </p>
                    <Button className="mt-4">Generate Report</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Stay updated with your seller account activity.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New Sale</p>
                        <p className="text-sm text-muted-foreground">
                          You have a new sale for "Elden Ring" on Steam platform.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Product Review</p>
                        <p className="text-sm text-muted-foreground">
                          A customer left a 5-star review for "Cyberpunk 2077".
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Payout Processed</p>
                        <p className="text-sm text-muted-foreground">
                          Your payout of $750.00 has been processed and will arrive in 2-3 business days.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Notifications
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <SellerFooter />
    </div>
  )
}
