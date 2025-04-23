"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  DollarSign,
  CreditCard,
  BanknoteIcon as Bank,
  Plus,
  ArrowUpDown,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SellerSidebar } from "@/components/seller-sidebar"
import { useToast } from "@/components/ui/use-toast"

// Mock withdrawal data
const mockWithdrawals = [
  {
    id: "w-1",
    amount: 500.0,
    method: "Bank Transfer",
    status: "completed",
    date: "2023-04-10",
    reference: "WD-12345",
  },
  {
    id: "w-2",
    amount: 750.0,
    method: "PayPal",
    status: "processing",
    date: "2023-04-22",
    reference: "WD-12346",
  },
  {
    id: "w-3",
    amount: 1200.0,
    method: "Bank Transfer",
    status: "completed",
    date: "2023-03-15",
    reference: "WD-12347",
  },
  {
    id: "w-4",
    amount: 350.0,
    method: "PayPal",
    status: "completed",
    date: "2023-03-01",
    reference: "WD-12348",
  },
  {
    id: "w-5",
    amount: 900.0,
    method: "Bank Transfer",
    status: "rejected",
    date: "2023-02-20",
    reference: "WD-12349",
    reason: "Invalid bank account details",
  },
]

// Mock payment methods
const mockPaymentMethods = [
  {
    id: "pm-1",
    type: "bank",
    name: "Bank of America",
    details: "Account ending in 4567",
    isDefault: true,
  },
  {
    id: "pm-2",
    type: "paypal",
    name: "PayPal",
    details: "john.doe@example.com",
    isDefault: false,
  },
]

export default function WithdrawalsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [withdrawals, setWithdrawals] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [balance, setBalance] = useState(2450.75)
  const [pendingBalance, setPendingBalance] = useState(750.25)
  const [availableBalance, setAvailableBalance] = useState(1700.5)
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false)
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  useEffect(() => {
    // Check if seller is logged in
    const sellerInfo = localStorage.getItem("zafago_seller")
    if (!sellerInfo) {
      router.push("/seller/login")
      return
    }

    // Load withdrawals and payment methods
    setWithdrawals(mockWithdrawals)
    setPaymentMethods(mockPaymentMethods)
    setSelectedPaymentMethod(mockPaymentMethods[0].id)

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

  const handleWithdrawalRequest = () => {
    // Validate withdrawal amount
    const amount = Number.parseFloat(withdrawalAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      })
      return
    }

    if (amount > availableBalance) {
      toast({
        title: "Insufficient funds",
        description: "Your withdrawal amount exceeds your available balance.",
        variant: "destructive",
      })
      return
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method for your withdrawal.",
        variant: "destructive",
      })
      return
    }

    // Create new withdrawal request
    const newWithdrawal = {
      id: `w-${withdrawals.length + 1}`,
      amount,
      method: paymentMethods.find((pm) => pm.id === selectedPaymentMethod).type === "bank" ? "Bank Transfer" : "PayPal",
      status: "processing",
      date: new Date().toISOString().split("T")[0],
      reference: `WD-${Math.floor(10000 + Math.random() * 90000)}`,
    }

    // Update withdrawals list
    setWithdrawals([newWithdrawal, ...withdrawals])

    // Update balances
    setAvailableBalance((prev) => prev - amount)
    setPendingBalance((prev) => prev + amount)

    // Close dialog and show success message
    setIsWithdrawalDialogOpen(false)
    setWithdrawalAmount("")

    toast({
      title: "Withdrawal requested",
      description: `Your withdrawal request for ${amount.toFixed(2)} has been submitted successfully.`,
    })
  }

  // Sort withdrawals
  const sortedWithdrawals = [...withdrawals].sort((a, b) => {
    if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
    } else if (sortField === "method") {
      return sortDirection === "asc" ? a.method.localeCompare(b.method) : b.method.localeCompare(a.method)
    } else if (sortField === "status") {
      return sortDirection === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
    } else {
      // Default sort by date
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

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
            <h2 className="text-3xl font-bold tracking-tight">Withdrawals</h2>
            <Dialog open={isWithdrawalDialogOpen} onOpenChange={setIsWithdrawalDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Request Withdrawal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Withdrawal</DialogTitle>
                  <DialogDescription>
                    Enter the amount you want to withdraw and select your payment method.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="amount"
                        type="number"
                        min="1"
                        step="0.01"
                        className="pl-8"
                        placeholder="0.00"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Available balance: ${availableBalance.toFixed(2)}</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                      <SelectTrigger id="payment-method">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            <div className="flex items-center">
                              {method.type === "bank" ? (
                                <Bank className="mr-2 h-4 w-4" />
                              ) : (
                                <CreditCard className="mr-2 h-4 w-4" />
                              )}
                              <span>
                                {method.name} ({method.details}){method.isDefault && " (Default)"}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsWithdrawalDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleWithdrawalRequest}>Request Withdrawal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Total earnings from your sales</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${availableBalance.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Available for withdrawal</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${pendingBalance.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Pending clearance or withdrawal</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="withdrawals" className="space-y-4">
            <TabsList>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            </TabsList>
            <TabsContent value="withdrawals">
              <Card>
                <CardHeader>
                  <CardTitle>Withdrawal History</CardTitle>
                  <CardDescription>View and manage your withdrawal requests.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reference</TableHead>
                          <TableHead>
                            <div
                              className="flex items-center space-x-1 cursor-pointer"
                              onClick={() => handleSort("date")}
                            >
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
                          <TableHead>
                            <div
                              className="flex items-center space-x-1 cursor-pointer"
                              onClick={() => handleSort("method")}
                            >
                              <span>Method</span>
                              <ArrowUpDown className="h-4 w-4" />
                            </div>
                          </TableHead>
                          <TableHead>
                            <div
                              className="flex items-center space-x-1 cursor-pointer"
                              onClick={() => handleSort("status")}
                            >
                              <span>Status</span>
                              <ArrowUpDown className="h-4 w-4" />
                            </div>
                          </TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedWithdrawals.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <DollarSign className="h-8 w-8 mb-2" />
                                <p>No withdrawals found</p>
                                <p className="text-sm">Request a withdrawal to see your history</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          sortedWithdrawals.map((withdrawal) => (
                            <TableRow key={withdrawal.id}>
                              <TableCell className="font-medium">{withdrawal.reference}</TableCell>
                              <TableCell>{new Date(withdrawal.date).toLocaleDateString()}</TableCell>
                              <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                              <TableCell>{withdrawal.method}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    withdrawal.status === "completed"
                                      ? "success"
                                      : withdrawal.status === "processing"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                >
                                  {withdrawal.status}
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
                                    {withdrawal.status === "processing" && (
                                      <DropdownMenuItem className="text-destructive">Cancel Request</DropdownMenuItem>
                                    )}
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
            </TabsContent>
            <TabsContent value="payment-methods">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods for withdrawals.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            {method.type === "bank" ? (
                              <Bank className="h-5 w-5 text-primary" />
                            ) : (
                              <CreditCard className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.details}</p>
                            {method.isDefault && (
                              <Badge variant="outline" className="mt-1">
                                Default
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {!method.isDefault && (
                            <Button variant="outline" size="sm">
                              Set as Default
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Withdrawal Settings</CardTitle>
                  <CardDescription>Configure your withdrawal preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Minimum Withdrawal Amount</p>
                      <p className="text-sm text-muted-foreground">The minimum amount you can withdraw at once</p>
                    </div>
                    <div className="font-medium">$50.00</div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Withdrawal Processing Time</p>
                      <p className="text-sm text-muted-foreground">Estimated time for withdrawal processing</p>
                    </div>
                    <div className="font-medium">1-3 business days</div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Withdrawal Fee</p>
                      <p className="text-sm text-muted-foreground">Fee charged for each withdrawal</p>
                    </div>
                    <div className="font-medium">$0.00</div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <div className="flex items-start space-x-2 rounded-md bg-muted p-3 w-full">
                    <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="text-xs">
                      <p className="font-medium">Important Note</p>
                      <p className="text-muted-foreground">
                        Withdrawals requested before 2:00 PM EST on business days are processed the same day.
                        Withdrawals requested after 2:00 PM EST or on weekends/holidays are processed the next business
                        day.
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
