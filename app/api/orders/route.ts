import { type NextRequest, NextResponse } from "next/server"

// Mock orders data
const orders: any[] = []

export async function GET() {
  return NextResponse.json({ orders })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newOrder = {
    id: `#${Date.now()}`,
    ...body,
    status: "Processing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  orders.push(newOrder)

  // In real app, you would:
  // 1. Process payment
  // 2. Send confirmation email
  // 3. Update inventory
  // 4. Create shipping label

  return NextResponse.json(newOrder, { status: 201 })
}
