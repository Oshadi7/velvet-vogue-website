"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingBag, Filter, Grid, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Elegant Black Dress",
    price: 299,
    originalPrice: 399,
    image: "/images/products/elegant-black-dress-1.jpg",
    rating: 4.8,
    reviews: 124,
    category: "Dresses",
    gender: "Women",
    colors: ["Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Sale",
  },
  {
    id: 2,
    name: "Golden Silk Blouse",
    price: 189,
    image: "/images/products/golden-silk-blouse-1.jpg",
    rating: 4.9,
    reviews: 89,
    category: "Tops",
    gender: "Women",
    colors: ["Gold", "White"],
    sizes: ["S", "M", "L", "XL"],
    badge: "New",
  },
  {
    id: 3,
    name: "Premium Leather Jacket",
    price: 549,
    image: "/images/products/leather-jacket-1.jpg",
    rating: 4.7,
    reviews: 156,
    category: "Outerwear",
    gender: "Unisex",
    colors: ["Black", "Brown"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Premium",
  },
  {
    id: 4,
    name: "Designer Handbag",
    price: 429,
    image: "/images/products/designer-handbag-1.jpg",
    rating: 4.9,
    reviews: 203,
    category: "Accessories",
    gender: "Women",
    colors: ["Black", "Tan", "Red"],
    sizes: ["One Size"],
    badge: "Trending",
  },
  {
    id: 5,
    name: "Classic White Shirt",
    price: 129,
    image: "/images/products/white-shirt-1.jpg",
    rating: 4.6,
    reviews: 78,
    category: "Shirts",
    gender: "Men",
    colors: ["White", "Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 6,
    name: "Luxury Watch",
    price: 899,
    image: "/images/products/luxury-watch-1.jpg",
    rating: 4.8,
    reviews: 145,
    category: "Accessories",
    gender: "Unisex",
    colors: ["Gold", "Silver"],
    sizes: ["One Size"],
    badge: "Luxury",
  },
]

const categories = ["All", "Dresses", "Tops", "Shirts", "Outerwear", "Accessories"]
const genders = ["All", "Women", "Men", "Unisex"]
const colors = ["Black", "White", "Gold", "Silver", "Navy", "Brown", "Blue", "Tan", "Red"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedGender, setSelectedGender] = useState("All")
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const applyFilters = () => {
    const filtered = products.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
      const genderMatch = selectedGender === "All" || product.gender === selectedGender
      const colorMatch = selectedColors.length === 0 || selectedColors.some((color) => product.colors.includes(color))
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes.includes(size))
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]

      return categoryMatch && genderMatch && colorMatch && sizeMatch && priceMatch
    })

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    setFilteredProducts(filtered)
  }

  // Apply filters whenever filter state changes
  useState(() => {
    applyFilters()
  })

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Collection</h1>
          <p className="text-gray-600">Discover premium fashion pieces crafted for the modern individual</p>
        </div>

        {/* Filters and Sort Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>

          <div className="flex flex-1 gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 ml-auto">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="text-yellow-400"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Gender</h4>
                <div className="space-y-2">
                  {genders.map((gender) => (
                    <label key={gender} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === gender}
                        onChange={() => setSelectedGender(gender)}
                        className="text-yellow-400"
                      />
                      <span className="text-sm">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="mb-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Colors</h4>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={selectedColors.includes(color)}
                        onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Sizes</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button onClick={applyFilters} className="w-full bg-black text-white hover:bg-gray-800">
                Apply Filters
              </Button>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <Link href={`/products/${product.id}`}>
                      <div className={viewMode === "grid" ? "" : "flex gap-4"}>
                        <div className={`relative overflow-hidden ${viewMode === "grid" ? "" : "w-48 flex-shrink-0"}`}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={400}
                            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                              viewMode === "grid" ? "w-full h-80" : "w-full h-48"
                            }`}
                          />
                          {product.badge && (
                            <Badge className="absolute top-3 left-3 bg-yellow-400 text-black">{product.badge}</Badge>
                          )}
                          <Button
                            size="sm"
                            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white hover:bg-gray-800"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="p-4 flex-1">
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600 ml-1">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-bold">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {product.category} • {product.gender}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
