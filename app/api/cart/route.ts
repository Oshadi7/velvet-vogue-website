import { type NextRequest, NextResponse } from "next/server"

// Mock cart data - in real app, this would be stored in database/session
let cartItems: any[] = []

export async function GET() {
  return NextResponse.json({ items: cartItems })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { productId, quantity, size, color } = body

  // Check if item already exists in cart
  const existingItemIndex = cartItems.findIndex(
    (item) => item.productId === productId && item.size === size && item.color === color,
  )

  if (existingItemIndex > -1) {
    // Update quantity
    cartItems[existingItemIndex].quantity += quantity
  } else {
    // Add new item
    cartItems.push({
      id: Date.now(),
      productId,
      quantity,
      size,
      color,
      addedAt: new Date().toISOString(),
    })
  }

  return NextResponse.json({ items: cartItems })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { itemId, quantity } = body

  const itemIndex = cartItems.findIndex((item) => item.id === itemId)
  if (itemIndex > -1) {
    if (quantity <= 0) {
      cartItems.splice(itemIndex, 1)
    } else {
      cartItems[itemIndex].quantity = quantity
    }
  }

  return NextResponse.json({ items: cartItems })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const itemId = searchParams.get("itemId")

  if (itemId) {
    cartItems = cartItems.filter((item) => item.id !== Number.parseInt(itemId))
  } else {
    cartItems = [] // Clear entire cart
  }

  return NextResponse.json({ items: cartItems })
}
