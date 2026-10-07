import { createContext, useContext } from 'react'
import type { MenuItem } from './data'

export type CartLine = {
  item: MenuItem
  restaurantId: string
  restaurantName: string
  quantity: number
}

export type CartContextValue = {
  items: CartLine[]
  count: number
  subtotal: number
  addItem: (item: MenuItem, restaurantId: string, restaurantName: string) => void
  changeQuantity: (itemId: string, restaurantId: string, amount: number) => void
  removeItem: (itemId: string, restaurantId: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider')
  return context
}
