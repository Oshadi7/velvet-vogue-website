"use client"

import { useState, useEffect } from "react"

interface CartItem {
  id: number
  productId: number
  name: string
  price: number
  image: string
  color: string
  size: string
  quantity: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart")
      const data = await response.json()
      setItems(data.items)
    } catch (error) {
      console.error("Failed to fetch cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (product: any, quantity: number, size: string, color: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          size,
          color,
        }),
      })

      if (response.ok) {
        await fetchCart()
        return true
      }
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
    return false
  }

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity }),
      })

      if (response.ok) {
        await fetchCart()
      }
    } catch (error) {
      console.error("Failed to update cart:", error)
    }
  }

  const removeItem = async (itemId: number) => {
    try {
      const response = await fetch(`/api/cart?itemId=${itemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchCart()
      }
    } catch (error) {
      console.error("Failed to remove item:", error)
    }
  }

  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      })

      if (response.ok) {
        setItems([])
      }
    } catch (error) {
      console.error("Failed to clear cart:", error)
    }
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return {
    items,
    isLoading,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  }
}
