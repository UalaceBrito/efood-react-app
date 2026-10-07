import { useMemo, useState, type ReactNode } from 'react'
import { CartContext, type CartContextValue } from './cart-context'
import type { CartLine } from './cart-context'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])

  const value = useMemo<CartContextValue>(() => {
    const addItem: CartContextValue['addItem'] = (item, restaurantId, restaurantName) => {
      setItems((current) => {
        const found = current.find((line) => line.item.id === item.id && line.restaurantId === restaurantId)
        if (found) {
          return current.map((line) =>
            line === found ? { ...line, quantity: line.quantity + 1 } : line,
          )
        }
        return [...current, { item, restaurantId, restaurantName, quantity: 1 }]
      })
    }
    const changeQuantity: CartContextValue['changeQuantity'] = (itemId, restaurantId, amount) => {
      setItems((current) =>
        current
          .map((line) =>
            line.item.id === itemId && line.restaurantId === restaurantId
              ? { ...line, quantity: line.quantity + amount }
              : line,
          )
          .filter((line) => line.quantity > 0),
      )
    }
    const removeItem: CartContextValue['removeItem'] = (itemId, restaurantId) => {
      setItems((current) =>
        current.filter((line) => !(line.item.id === itemId && line.restaurantId === restaurantId)),
      )
    }

    return {
      items,
      count: items.reduce((total, line) => total + line.quantity, 0),
      subtotal: items.reduce((total, line) => total + line.item.price * line.quantity, 0),
      addItem,
      changeQuantity,
      removeItem,
      clearCart: () => setItems([]),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
