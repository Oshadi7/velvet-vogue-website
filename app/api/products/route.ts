import { type NextRequest, NextResponse } from "next/server"

// Mock product data - in real app, this would come from database
const products = [
  {
    id: 1,
    name: "Elegant Black Dress",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    reviews: 124,
    category: "Dresses",
    gender: "Women",
    colors: ["Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Sale",
    description: "Elegant black dress perfect for any occasion",
    inStock: true,
    stockCount: 15,
  },
  // Add more products...
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const gender = searchParams.get("gender")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")

  let filteredProducts = products

  // Apply filters
  if (category && category !== "All") {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  if (gender && gender !== "All") {
    filteredProducts = filteredProducts.filter((product) => product.gender === gender)
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price >= Number.parseInt(minPrice))
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price <= Number.parseInt(maxPrice))
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  // In real app, save to database
  const newProduct = {
    id: products.length + 1,
    ...body,
    createdAt: new Date().toISOString(),
  }

  products.push(newProduct)

  return NextResponse.json(newProduct, { status: 201 })
}
