import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { MenuItem } from './data'

export type CartLine = {
  item: MenuItem
  restaurantId: string
  restaurantName: string
  quantity: number
}

type CartState = {
  items: CartLine[]
}

const initialState: CartState = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<CartLine>,
    ) {
      const incoming = action.payload
      const existing = state.items.find(
        (line) => line.item.id === incoming.item.id && line.restaurantId === incoming.restaurantId,
      )
      if (existing) {
        existing.quantity += incoming.quantity
      } else if (incoming.quantity > 0) {
        state.items.push(incoming)
      }
    },
    changeQuantity(
      state,
      action: PayloadAction<{ itemId: string; restaurantId: string; amount: number }>,
    ) {
      const line = state.items.find(
        (item) => item.item.id === action.payload.itemId && item.restaurantId === action.payload.restaurantId,
      )
      if (!line) return
      line.quantity += action.payload.amount
      if (line.quantity <= 0) {
        state.items = state.items.filter((item) => item !== line)
      }
    },
    removeItem(state, action: PayloadAction<{ itemId: string; restaurantId: string }>) {
      state.items = state.items.filter(
        (line) => !(line.item.id === action.payload.itemId && line.restaurantId === action.payload.restaurantId),
      )
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const cartActions = cartSlice.actions
export const store = configureStore({ reducer: { cart: cartSlice.reducer } })

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

const useAppDispatch = () => useDispatch<AppDispatch>()
const selectItems = (state: RootState) => state.cart.items
const selectCount = (state: RootState) => state.cart.items.reduce((total, line) => total + line.quantity, 0)
const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((total, line) => total + line.item.price * line.quantity, 0)

export function useCart() {
  const dispatch = useAppDispatch()
  const items = useSelector(selectItems)
  const count = useSelector(selectCount)
  const subtotal = useSelector(selectSubtotal)

  return {
    items,
    count,
    subtotal,
    addItem: (item: MenuItem, restaurantId: string, restaurantName: string, quantity = 1) =>
      dispatch(cartActions.addItem({ item, restaurantId, restaurantName, quantity })),
    changeQuantity: (itemId: string, restaurantId: string, amount: number) =>
      dispatch(cartActions.changeQuantity({ itemId, restaurantId, amount })),
    removeItem: (itemId: string, restaurantId: string) =>
      dispatch(cartActions.removeItem({ itemId, restaurantId })),
    clearCart: () => dispatch(cartActions.clearCart()),
  }
}
