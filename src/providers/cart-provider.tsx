import { createContext, useReducer } from "react";
import { cartReducer } from "../reducers/cart-reducer";

export const CartContext = createContext({});

const initialCartState = {
  items: [],
};

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
}
