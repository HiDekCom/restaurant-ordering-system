import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // เพิ่มสินค้า
  const addToCart = (menu) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === menu.id
      );

      // ถ้ามีอยู่แล้ว เพิ่มจำนวน
      if (existingItem) {
        return prev.map((item) =>
          item.id === menu.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );
      }

      // ถ้ายังไม่มี เพิ่มใหม่
      return [
        ...prev,
        {
          ...menu,
          qty: 1,
        },
      ];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}