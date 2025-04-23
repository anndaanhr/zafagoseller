"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Package, Search, Plus, Filter, MoreHorizontal, Edit, Trash2, ArrowUpDown, Eye } from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"
import { SellerSidebar } from "@/components/seller-sidebar"
import { SellerFooter } from "@/components/seller-footer"
import { useToast } from "@/components/ui/use-toast"

// Mock product data
const mockProducts = [
  {
    id: "prod-1",
    name: "Elden Ring",
    image: "/placeholder.svg?height=40&width=40&text=ER",
    platform: "Steam",
    price: 59.99,
    discount: 15,
    stock: "Unlimited",
    status: "active",
    sales: 245,
    dateAdded: "2023-01-15",
  },
  {
    id: "prod-2",
    name: "Cyberpunk 2077",
    image: "/placeholder.svg?height=40&width=40&text=CP",
    platform: "Epic Games",
    price: 49.99,
    discount: 20,
    stock: "Unlimited",
    status: "active",
    sales: 189,
    dateAdded: "2023-02-10",
  },
  {
    id: "prod-3",
    name: "Microsoft Office 2023",
    image: "/placeholder.svg?height=40&width=40&text=MO",
    platform: "Windows",
    price: 149.99,
    discount: 0,
    stock: "Unlimited",
    status: "active",
    sales: 78,
    dateAdded: "2023-03-05",
  },
  {
    id: "prod-4",
    name: "Adobe Photoshop (1 Year)",
    image: "/placeholder.svg?height=40&width=40&text=AP",
    platform: "Windows/Mac",
    price: 239.99,
    discount: 10,
    stock: "Unlimited",
    status: "active",
    sales: 56,
    dateAdded: "2023-03-20",
  },
  {
    id: "prod-5",
    name: "Minecraft Java Edition",
    image: "/placeholder.svg?height=40&width=40&text=MC",
    platform: "Java",
    price: 29.99,
    discount: 0,
    stock: "Unlimited",
    status: "active",
    sales: 312,
    dateAdded: "2023-01-05",
  },
  {
    id: "prod-6",
    name: "Steam Wallet $50",
    image: "/placeholder.svg?height=40&width=40&text=SW",
    platform: "Steam",
    price: 50.0,
    discount: 0,
    stock: "Unlimited",
    status: "active",
    sales: 423,
    dateAdded: "2023-02-15",
  },
  {
    id: "prod-7",
    name: "Elden Ring DLC",
    image: "/placeholder.svg?height=40&width=40&text=ER",
    platform: "Steam",
    price: 29.99,
    discount: 0,
    stock: "Unlimited",
    status: "draft",
    sales: 0,
    dateAdded: "2023-04-10",
  },
]

export default function ProductsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState([])
  const [sortField, setSortField] = useState("dateAdded")
  const [sortDirection, setSortDirection] = useState("desc")

  useEffect(() => {
    // Check if seller is logged in
    const sellerInfo = localStorage.getItem("zafago_seller")
    if (!sellerInfo) {
      router.push("/seller/login")
      return
    }

    // Load products
    setProducts(mockProducts)

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

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId))

    toast({
      title: "Product deleted",
      description: "The product has been deleted successfully.",
    })
  }

  const handleBulkDelete = () => {
    setProducts(products.filter((product) => !selectedProducts.includes(product.id)))
    setSelectedProducts([])

    toast({
      title: "Products deleted",
      description: `${selectedProducts.length} products have been deleted successfully.`,
    })
  }

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || product.status === statusFilter
      const matchesPlatform = platformFilter === "all" || product.platform === platformFilter
      return matchesSearch && matchesStatus && matchesPlatform
    })
    .sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "price") {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price
      } else if (sortField === "sales") {
        return sortDirection === "asc" ? a.sales - b.sales : b.sales - a.sales
      } else {
        // Default sort by dateAdded
        return sortDirection === "asc"
          ? new Date(a.dateAdded) - new Date(b.dateAdded)
          : new Date(b.dateAdded) - new Date(a.dateAdded)
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
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <div className="flex items-center space-x-2">
              {selectedProducts.length > 0 && (
                <Button variant="outline" onClick={handleBulkDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              )}
              <Button asChild>
                <Link href="/seller/products/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Manage Products</CardTitle>
              <CardDescription>View and manage all your digital products in one place.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
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
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[300px]">
                        <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("name")}>
                          <span>Product</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("price")}>
                          <span>Price</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>
                        <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("sales")}>
                          <span>Sales</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Package className="h-8 w-8 mb-2" />
                            <p>No products found</p>
                            {searchQuery && <p className="text-sm">Try adjusting your search or filters</p>}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) => handleSelectProduct(product.id, checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 relative rounded overflow-hidden">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Added on {new Date(product.dateAdded).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
                              </span>
                              {product.discount > 0 && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ${product.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.platform}</Badge>
                          </TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                product.status === "active"
                                  ? "success"
                                  : product.status === "draft"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {product.status}
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
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Product
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Product
                                </DropdownMenuItem>
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
      <SellerFooter />
    </div>
  )
}
