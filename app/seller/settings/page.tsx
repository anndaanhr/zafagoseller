"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Upload, Save, Building, Mail, Globe, Phone, User, Lock, Bell, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SellerSidebar } from "@/components/seller-sidebar"
import { useToast } from "@/components/ui/use-toast"

export default function SellerSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // Profile settings
  const [profile, setProfile] = useState({
    companyName: "Digital Games Inc.",
    email: "contact@digitalgames.com",
    website: "https://digitalgames.com",
    phone: "+1 (555) 123-4567",
    description: "We are a leading provider of digital games and software products.",
    logo: "/placeholder.svg?height=100&width=100&text=DG",
  })

  // Security settings
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailSales: true,
    emailWithdrawals: true,
    emailProducts: true,
    emailMarketing: false,
    browserNotifications: true,
  })

  // Payment settings
  const [payment, setPayment] = useState({
    defaultPaymentMethod: "bank",
    autoWithdrawal: false,
    autoWithdrawalThreshold: "500",
    autoWithdrawalDay: "1",
  })

  useEffect(() => {
    // Check if seller is logged in
    const sellerInfo = localStorage.getItem("zafago_seller")
    if (!sellerInfo) {
      router.push("/seller/login")
      return
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSecurityChange = (e) => {
    const { name, value } = e.target
    setSecurity((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (name, value) => {
    setNotifications((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    setPayment((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
      setIsSaving(false)
    }, 1000)
  }

  const handleSaveSecurity = () => {
    // Validate passwords
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      })
      return
    }

    if (security.newPassword && security.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Security settings updated",
        description: "Your security settings have been updated successfully.",
      })
      setSecurity((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
      setIsSaving(false)
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been updated successfully.",
      })
      setIsSaving(false)
    }, 1000)
  }

  const handleSavePayment = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Payment settings updated",
        description: "Your payment settings have been updated successfully.",
      })
      setIsSaving(false)
    }, 1000)
  }

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
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="payment">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your seller profile information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={profile.logo || "/placeholder.svg"}
                          alt="Company Logo"
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full"
                      >
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload logo</span>
                      </Button>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="font-medium">Company Logo</h3>
                      <p className="text-sm text-muted-foreground">
                        This will be displayed on your seller profile and product listings.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Change Logo
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="companyName">
                        <Building className="h-4 w-4 inline mr-1" />
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={profile.companyName}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="website">
                        <Globe className="h-4 w-4 inline mr-1" />
                        Website (Optional)
                      </Label>
                      <Input id="website" name="website" value={profile.website} onChange={handleProfileChange} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone">
                        <Phone className="h-4 w-4 inline mr-1" />
                        Phone (Optional)
                      </Label>
                      <Input id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Company Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={profile.description}
                        onChange={handleProfileChange}
                        rows={4}
                      />
                    </div>

                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={security.currentPassword}
                      onChange={handleSecurityChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={security.newPassword}
                      onChange={handleSecurityChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long and include a number and a special character.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={security.confirmPassword}
                      onChange={handleSecurityChange}
                    />
                  </div>
                  <Button onClick={handleSaveSecurity} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Update Password"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactorEnabled">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require a verification code when logging in.</p>
                    </div>
                    <Switch
                      id="twoFactorEnabled"
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, twoFactorEnabled: checked }))}
                    />
                  </div>
                  {security.twoFactorEnabled && <Button variant="outline">Configure Two-Factor Authentication</Button>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                  <CardDescription>Manage your active login sessions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • New York, USA</p>
                        <p className="text-xs text-muted-foreground">Started 2 hours ago</p>
                      </div>
                      <Badge>Current</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Sign Out of All Other Sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Manage the emails you receive from us.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailSales">Sales Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive emails when you make a sale.</p>
                    </div>
                    <Switch
                      id="emailSales"
                      checked={notifications.emailSales}
                      onCheckedChange={(checked) => handleNotificationChange("emailSales", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailWithdrawals">Withdrawal Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about your withdrawal requests.</p>
                    </div>
                    <Switch
                      id="emailWithdrawals"
                      checked={notifications.emailWithdrawals}
                      onCheckedChange={(checked) => handleNotificationChange("emailWithdrawals", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailProducts">Product Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about your product status changes.</p>
                    </div>
                    <Switch
                      id="emailProducts"
                      checked={notifications.emailProducts}
                      onCheckedChange={(checked) => handleNotificationChange("emailProducts", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailMarketing">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive marketing emails and newsletters.</p>
                    </div>
                    <Switch
                      id="emailMarketing"
                      checked={notifications.emailMarketing}
                      onCheckedChange={(checked) => handleNotificationChange("emailMarketing", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Browser Notifications</CardTitle>
                  <CardDescription>Manage browser notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browserNotifications">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications in your browser when you're on the site.
                      </p>
                    </div>
                    <Switch
                      id="browserNotifications"
                      checked={notifications.browserNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("browserNotifications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleSaveNotifications} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Notification Preferences"}
              </Button>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods for withdrawals.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Bank of America</p>
                        <p className="text-sm text-muted-foreground">Account ending in 4567</p>
                        <Badge variant="outline" className="mt-1">
                          Default
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Automatic Withdrawals</CardTitle>
                  <CardDescription>Configure automatic withdrawal settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoWithdrawal">Automatic Withdrawals</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically withdraw your earnings to your default payment method.
                      </p>
                    </div>
                    <Switch
                      id="autoWithdrawal"
                      checked={payment.autoWithdrawal}
                      onCheckedChange={(checked) => setPayment((prev) => ({ ...prev, autoWithdrawal: checked }))}
                    />
                  </div>

                  {payment.autoWithdrawal && (
                    <div className="space-y-4 pt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="autoWithdrawalThreshold">Minimum Threshold ($)</Label>
                        <Input
                          id="autoWithdrawalThreshold"
                          name="autoWithdrawalThreshold"
                          type="number"
                          min="50"
                          step="50"
                          value={payment.autoWithdrawalThreshold}
                          onChange={handlePaymentChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Minimum amount required for automatic withdrawal (minimum $50).
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="autoWithdrawalDay">Withdrawal Day</Label>
                        <select
                          id="autoWithdrawalDay"
                          name="autoWithdrawalDay"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={payment.autoWithdrawalDay}
                          onChange={handlePaymentChange}
                        >
                          <option value="1">1st of the month</option>
                          <option value="15">15th of the month</option>
                          <option value="last">Last day of the month</option>
                        </select>
                        <p className="text-xs text-muted-foreground">
                          Day of the month when automatic withdrawals will be processed.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button onClick={handleSavePayment} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Payment Settings"}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
