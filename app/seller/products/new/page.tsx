"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Save, ArrowLeft, Upload, Plus, Minus, HelpCircle, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { SellerSidebar } from "@/components/seller-sidebar"
import { SellerFooter } from "@/components/seller-footer"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platform: "",
    category: "",
    price: "",
    discount: "0",
    stock: "unlimited",
    stockQuantity: "100",
    status: "draft",
    codes: [],
    images: [],
    features: [],
    requirements: {
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
    },
    seo: {
      title: "",
      description: "",
      keywords: "",
    },
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleAddCode = () => {
    setFormData((prev) => ({
      ...prev,
      codes: [...prev.codes, { code: "", platform: prev.platform || "" }],
    }))
  }

  const handleRemoveCode = (index) => {
    setFormData((prev) => ({
      ...prev,
      codes: prev.codes.filter((_, i) => i !== index),
    }))
  }

  const handleCodeChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      codes: prev.codes.map((code, i) => (i === index ? { ...code, [field]: value } : code)),
    }))
  }

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleFeatureChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) => (i === index ? value : feature)),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.platform || !formData.price) {
        toast({
          title: "Missing required fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        setIsSaving(false)
        return
      }

      // In a real app, this would be an API call to save the product
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Product saved",
        description: `${formData.name} has been saved successfully.`,
      })

      // Redirect to products page
      router.push("/seller/products")
    } catch (error) {
      console.error("Error saving product:", error)
      toast({
        title: "Error saving product",
        description: "An error occurred while saving the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
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
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/seller/products">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => router.push("/seller/products")}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Product
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="codes">Product Codes</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Enter the basic details about your digital product.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Product Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Elden Ring"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Describe your product in detail"
                          rows={5}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="platform">
                            Platform <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={formData.platform}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, platform: value }))}
                          >
                            <SelectTrigger id="platform">
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Steam">Steam</SelectItem>
                              <SelectItem value="Epic Games">Epic Games</SelectItem>
                              <SelectItem value="Windows">Windows</SelectItem>
                              <SelectItem value="Windows/Mac">Windows/Mac</SelectItem>
                              <SelectItem value="Java">Java</SelectItem>
                              <SelectItem value="PlayStation">PlayStation</SelectItem>
                              <SelectItem value="Xbox">Xbox</SelectItem>
                              <SelectItem value="Nintendo">Nintendo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">
                            Category <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="games">Games</SelectItem>
                              <SelectItem value="software">Software</SelectItem>
                              <SelectItem value="gift-cards">Gift Cards</SelectItem>
                              <SelectItem value="subscriptions">Subscriptions</SelectItem>
                              <SelectItem value="dlc">DLC</SelectItem>
                              <SelectItem value="in-game-items">In-Game Items</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Key Features</h3>
                        <p className="text-sm text-muted-foreground">
                          Add key features or selling points of your product
                        </p>

                        {formData.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={feature}
                              onChange={(e) => handleFeatureChange(index, e.target.value)}
                              placeholder={`Feature ${index + 1}`}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveFeature(index)}
                              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                        <Button variant="outline" onClick={handleAddFeature} className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Feature
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Media</CardTitle>
                      <CardDescription>Upload images and media files for your product.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Product Images</Label>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                            <div className="mb-4 rounded-full bg-primary/10 p-2">
                              <Upload className="h-6 w-6 text-primary" />
                            </div>
                            <p className="mb-2 text-sm font-medium">Drag & drop or click to upload</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG or GIF, up to 5MB each</p>
                            <Button variant="outline" size="sm" className="mt-4">
                              Select Files
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Product Files</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload any additional files that customers will receive with the product
                        </p>
                        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                          <div className="mb-4 rounded-full bg-primary/10 p-2">
                            <Upload className="h-6 w-6 text-primary" />
                          </div>
                          <p className="mb-2 text-sm font-medium">Drag & drop or click to upload</p>
                          <p className="text-xs text-muted-foreground">PDF, ZIP, or other files, up to 100MB each</p>
                          <Button variant="outline" size="sm" className="mt-4">
                            Select Files
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Product Codes Tab */}
                <TabsContent value="codes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Codes</CardTitle>
                      <CardDescription>
                        Add the digital codes that customers will receive after purchase.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{formData.platform || "No platform selected"}</Badge>
                        <p className="text-sm text-muted-foreground">Adding codes for the selected platform</p>
                      </div>

                      {formData.codes.length === 0 ? (
                        <div className="rounded-md bg-muted p-8 text-center">
                          <p className="text-sm font-medium mb-2">No codes added yet</p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Add the digital codes that customers will receive after purchase
                          </p>
                          <Button variant="outline" onClick={handleAddCode}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Code
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {formData.codes.map((code, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="flex-1 space-y-2">
                                <Label htmlFor={`code-${index}`}>Code {index + 1}</Label>
                                <Input
                                  id={`code-${index}`}
                                  value={code.code}
                                  onChange={(e) => handleCodeChange(index, "code", e.target.value)}
                                  placeholder="Enter product code"
                                />
                              </div>
                              <div className="flex-1 space-y-2">
                                <Label htmlFor={`platform-${index}`}>Platform</Label>
                                <Select
                                  value={code.platform}
                                  onValueChange={(value) => handleCodeChange(index, "platform", value)}
                                >
                                  <SelectTrigger id={`platform-${index}`}>
                                    <SelectValue placeholder="Select platform" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Steam">Steam</SelectItem>
                                    <SelectItem value="Epic Games">Epic Games</SelectItem>
                                    <SelectItem value="Windows">Windows</SelectItem>
                                    <SelectItem value="Windows/Mac">Windows/Mac</SelectItem>
                                    <SelectItem value="Java">Java</SelectItem>
                                    <SelectItem value="PlayStation">PlayStation</SelectItem>
                                    <SelectItem value="Xbox">Xbox</SelectItem>
                                    <SelectItem value="Nintendo">Nintendo</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveCode(index)}
                                className="mt-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}

                          <Button variant="outline" onClick={handleAddCode} className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Another Code
                          </Button>
                        </div>
                      )}

                      <Separator />

                      <div className="space-y-2">
                        <Label>Bulk Upload</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                          You can also upload a CSV file with your product codes
                        </p>
                        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6 text-center">
                          <div className="mb-2 rounded-full bg-primary/10 p-2">
                            <Upload className="h-5 w-5 text-primary" />
                          </div>
                          <p className="mb-2 text-sm font-medium">Upload CSV file</p>
                          <p className="text-xs text-muted-foreground mb-4">CSV format: code,platform</p>
                          <Button variant="outline" size="sm">
                            Select File
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Advanced Tab */}
                <TabsContent value="advanced" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Requirements</CardTitle>
                      <CardDescription>Specify the system requirements for your digital product.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="os">Operating System</Label>
                          <Input
                            id="os"
                            value={formData.requirements.os}
                            onChange={(e) => handleNestedChange("requirements", "os", e.target.value)}
                            placeholder="e.g. Windows 10 64-bit"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="processor">Processor</Label>
                          <Input
                            id="processor"
                            value={formData.requirements.processor}
                            onChange={(e) => handleNestedChange("requirements", "processor", e.target.value)}
                            placeholder="e.g. Intel Core i5-8400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="memory">Memory</Label>
                          <Input
                            id="memory"
                            value={formData.requirements.memory}
                            onChange={(e) => handleNestedChange("requirements", "memory", e.target.value)}
                            placeholder="e.g. 8 GB RAM"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="graphics">Graphics</Label>
                          <Input
                            id="graphics"
                            value={formData.requirements.graphics}
                            onChange={(e) => handleNestedChange("requirements", "graphics", e.target.value)}
                            placeholder="e.g. NVIDIA GTX 1060"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="storage">Storage</Label>
                          <Input
                            id="storage"
                            value={formData.requirements.storage}
                            onChange={(e) => handleNestedChange("requirements", "storage", e.target.value)}
                            placeholder="e.g. 50 GB available space"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Settings</CardTitle>
                      <CardDescription>Optimize your product for search engines.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="seo-title">SEO Title</Label>
                        <Input
                          id="seo-title"
                          value={formData.seo.title}
                          onChange={(e) => handleNestedChange("seo", "title", e.target.value)}
                          placeholder="SEO optimized title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="seo-description">Meta Description</Label>
                        <Textarea
                          id="seo-description"
                          value={formData.seo.description}
                          onChange={(e) => handleNestedChange("seo", "description", e.target.value)}
                          placeholder="Brief description for search engines"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="seo-keywords">Keywords</Label>
                        <Input
                          id="seo-keywords"
                          value={formData.seo.keywords}
                          onChange={(e) => handleNestedChange("seo", "keywords", e.target.value)}
                          placeholder="Comma separated keywords"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                  <CardDescription>Set the price and inventory for your product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price ($) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      name="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="stock">Stock Type</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Choose "Unlimited" for digital products with unlimited inventory, or "Limited" if you have
                              a specific number of codes available.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select
                      value={formData.stock}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, stock: value }))}
                    >
                      <SelectTrigger id="stock">
                        <SelectValue placeholder="Select stock type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.stock === "limited" && (
                    <div className="space-y-2">
                      <Label htmlFor="stockQuantity">Stock Quantity</Label>
                      <Input
                        id="stockQuantity"
                        name="stockQuantity"
                        type="number"
                        min="1"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        placeholder="100"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                  <CardDescription>Set the visibility and status of your product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.status === "draft"
                        ? "Draft products are not visible to customers."
                        : formData.status === "active"
                          ? "Active products are visible and available for purchase."
                          : "Archived products are hidden from customers."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between space-y-0 pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="featured">Featured Product</Label>
                      <p className="text-xs text-muted-foreground">Featured products appear on the homepage</p>
                    </div>
                    <Switch id="featured" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-2 rounded-md bg-muted p-3">
                    <Info className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="text-xs">
                      <p className="font-medium">Product Review</p>
                      <p className="text-muted-foreground">
                        All new products are subject to review before they are published on the marketplace.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <SellerFooter />
    </div>
  )
}
