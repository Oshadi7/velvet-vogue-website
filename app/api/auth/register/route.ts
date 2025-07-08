import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { firstName, lastName, email, password } = body

  // Mock registration - in real app, save to database
  const newUser = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    role: "customer",
    createdAt: new Date().toISOString(),
  }

  // Set authentication cookie
  cookies().set("auth-token", "mock-user-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return NextResponse.json(
    {
      user: newUser,
      message: "Registration successful",
    },
    { status: 201 },
  )
}
