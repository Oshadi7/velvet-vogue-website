import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  // Mock authentication - in real app, verify against database
  if (email === "admin@velvetvogue.com" && password === "admin123") {
    // Set authentication cookie
    cookies().set("auth-token", "mock-jwt-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({
      user: {
        id: 1,
        email: "admin@velvetvogue.com",
        name: "Admin User",
        role: "admin",
      },
    })
  }

  // Regular user login
  if (email && password) {
    cookies().set("auth-token", "mock-user-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json({
      user: {
        id: 2,
        email,
        name: "Customer User",
        role: "customer",
      },
    })
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}
