import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const newItem = { product, quantity };
    setCartItems([...cartItems, newItem]);
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product._id !== product._id
    );
    setCartItems(updatedCartItems);
  };

  const reduceQuantity = (product) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.product._id === product._id
    );
    if (itemIndex !== -1 && updatedCartItems[itemIndex].quantity > 1) {
      updatedCartItems[itemIndex].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  };

  const increaseQuantity = (product) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.product._id === product._id
    );
    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        reduceQuantity,
        increaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
