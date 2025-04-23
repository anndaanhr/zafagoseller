"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, Download, Filter, Search, Calendar, ArrowUpDown, MoreHorizontal, FileText } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SellerSidebar } from "@/components/seller-sidebar"
import { useToast } from "@/components/ui/use-toast"

// Mock sales data
const mockSales = [
  {
    id: "sale-1",
    orderId: "ORD-12345",
    product: "Elden Ring",
    platform: "Steam",
    customer: "john.doe@example.com",
    date: "2023-04-22",
    amount: 59.99,
    status: "completed",
  },
  {
    id: "sale-2",
    orderId: "ORD-12346",
    product: "Cyberpunk 2077",
    platform: "Epic Games",
    customer: "jane.smith@example.com",
    date: "2023-04-21",
    amount: 49.99,
    status: "completed",
  },
  {
    id: "sale-3",
    orderId: "ORD-12347",
    product: "Microsoft Office 2023",
    platform: "Windows",
    customer: "robert.johnson@example.com",
    date: "2023-04-20",
    amount: 149.99,
    status: "completed",
  },
  {
    id: "sale-4",
    orderId: "ORD-12348",
    product: "Elden Ring",
    platform: "Steam",
    customer: "sarah.williams@example.com",
    date: "2023-04-19",
    amount: 59.99,
    status: "completed",
  },
  {
    id: "sale-5",
    orderId: "ORD-12349",
    product: "Cyberpunk 2077",
    platform: "Epic Games",
    customer: "michael.brown@example.com",
    date: "2023-04-18",
    amount: 49.99,
    status: "completed",
  },
  {
    id: "sale-6",
    orderId: "ORD-12350",
    product: "Adobe Photoshop (1 Year)",
    platform: "Windows/Mac",
    customer: "emily.davis@example.com",
    date: "2023-04-17",
    amount: 239.99,
    status: "completed",
  },
  {
    id: "sale-7",
    orderId: "ORD-12351",
    product: "Minecraft Java Edition",
    platform: "Java",
    customer: "david.miller@example.com",
    date: "2023-04-16",
    amount: 29.99,
    status: "completed",
  },
  {
    id: "sale-8",
    orderId: "ORD-12352",
    product: "Steam Wallet $50",
    platform: "Steam",
    customer: "jennifer.wilson@example.com",
    date: "2023-04-15",
    amount: 50.0,
    status: "completed",
  },
  {
    id: "sale-9",
    orderId: "ORD-12353",
    product: "Elden Ring",
    platform: "Steam",
    customer: "thomas.anderson@example.com",
    date: "2023-04-14",
    amount: 59.99,
    status: "completed",
  },
  {
    id: "sale-10",
    orderId: "ORD-12354",
    product: "Microsoft Office 2023",
    platform: "Windows",
    customer: "lisa.taylor@example.com",
    date: "2023-04-13",
    amount: 149.99,
    status: "completed",
  },
]

export default function SalesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [sales, setSales] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  useEffect(() => {
    // Check if seller is logged in
    const sellerInfo = localStorage.getItem("zafago_seller")
    if (!sellerInfo) {
      router.push("/seller/login")
      return
    }

    // Load sales
    setSales(mockSales)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "Your sales report has been downloaded successfully.",
    })
  }

  // Filter and sort sales
  const filteredSales = sales
    .filter((sale) => {
      const matchesSearch =
        sale.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.customer.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || sale.status === statusFilter
      const matchesPlatform = platformFilter === "all" || sale.platform === platformFilter

      let matchesDate = true
      const saleDate = new Date(sale.date)
      const now = new Date()

      if (dateFilter === "today") {
        const today = new Date()
        matchesDate = saleDate.toDateString() === today.toDateString()
      } else if (dateFilter === "yesterday") {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        matchesDate = saleDate.toDateString() === yesterday.toDateString()
      } else if (dateFilter === "thisWeek") {
        const weekStart = new Date()
        weekStart.setDate(weekStart.getDate() - weekStart.getDay())
        matchesDate = saleDate >= weekStart
      } else if (dateFilter === "thisMonth") {
        matchesDate = saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear()
      } else if (dateFilter === "lastMonth") {
        const lastMonth = new Date()
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        matchesDate = saleDate.getMonth() === lastMonth.getMonth() && saleDate.getFullYear() === lastMonth.getFullYear()
      }

      return matchesSearch && matchesStatus && matchesPlatform && matchesDate
    })
    .sort((a, b) => {
      if (sortField === "product") {
        return sortDirection === "asc" ? a.product.localeCompare(b.product) : b.product.localeCompare(a.product)
      } else if (sortField === "amount") {
        return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
      } else if (sortField === "orderId") {
        return sortDirection === "asc" ? a.orderId.localeCompare(b.orderId) : b.orderId.localeCompare(a.orderId)
      } else {
        // Default sort by date
        return sortDirection === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
      }
    })

  // Calculate total sales amount
  const totalSalesAmount = filteredSales.reduce((total, sale) => total + sale.amount, 0)

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDownloadReport}>
                    <FileText className="mr-2 h-4 w-4" />
                    CSV Report
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadReport}>
                    <FileText className="mr-2 h-4 w-4" />
                    Excel Report
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadReport}>
                    <FileText className="mr-2 h-4 w-4" />
                    PDF Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSalesAmount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">{filteredSales.length} transactions</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Sales History</CardTitle>
              <CardDescription>View and manage all your sales transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by product, order ID, or customer..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={platformFilter} onValueChange={setPlatformFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="Steam">Steam</SelectItem>
                      <SelectItem value="Epic Games">Epic Games</SelectItem>
                      <SelectItem value="Windows">Windows</SelectItem>
                      <SelectItem value="Windows/Mac">Windows/Mac</SelectItem>
                      <SelectItem value="Java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="thisWeek">This Week</SelectItem>
                      <SelectItem value="thisMonth">This Month</SelectItem>
                      <SelectItem value="lastMonth">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">
                        <div
                          className="flex items-center space-x-1 cursor-pointer"
                          onClick={() => handleSort("orderId")}
                        >
                          <span>Order ID</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div
                          className="flex items-center space-x-1 cursor-pointer"
                          onClick={() => handleSort("product")}
                        >
                          <span>Product</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>
                        <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("date")}>
                          <span>Date</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div
                          className="flex items-center space-x-1 cursor-pointer"
                          onClick={() => handleSort("amount")}
                        >
                          <span>Amount</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSales.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <BarChart3 className="h-8 w-8 mb-2" />
                            <p>No sales found</p>
                            {(searchQuery ||
                              statusFilter !== "all" ||
                              platformFilter !== "all" ||
                              dateFilter !== "all") && <p className="text-sm">Try adjusting your search or filters</p>}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSales.map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell className="font-medium">{sale.orderId}</TableCell>
                          <TableCell>{sale.product}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{sale.platform}</Badge>
                          </TableCell>
                          <TableCell>{sale.customer}</TableCell>
                          <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                          <TableCell>${sale.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                sale.status === "completed"
                                  ? "success"
                                  : sale.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {sale.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
