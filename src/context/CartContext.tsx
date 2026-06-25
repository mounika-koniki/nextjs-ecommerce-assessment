"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { CartItem, Product } from "@/lib/types";

type CartState = {
  cartItems: CartItem[];
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREASE_QUANTITY"; payload: number}
  | { type: "DECREASE_QUANTITY"; payload: number};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  totalPrice: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cartItems: [
          ...state.cartItems,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "INCREASE_QUANTITY":
      return{
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload ? {...item, quantity: item.quantity + 1} : item
        ),
      };

    case "DECREASE_QUANTITY":
      return{
        ...state,
        cartItems:state.cartItems.map((item) =>
          item.id === action.payload ? {...item, quantity: item.quantity - 1} : item
        )
        .filter((item) => item.quantity > 0),
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
  });

  const totalItems = useMemo(() => {
    return state.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [state.cartItems]);

  const totalPrice = useMemo(() => {
    return state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [state.cartItems]);

  const value: CartContextType = {
    cartItems: state.cartItems,
    addToCart: (product) =>
      dispatch({ type: "ADD_TO_CART", payload: product }),
    removeFromCart: (id) =>
      dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    increaseQuantity: (id) =>
      dispatch({ type: "INCREASE_QUANTITY", payload: id}),
    decreaseQuantity: (id) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: id}),
    totalPrice,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}