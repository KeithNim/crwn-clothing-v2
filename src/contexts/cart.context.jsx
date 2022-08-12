import { createContext, useEffect, useState } from "react";

const clearCartItem = (cartItems, itemToClear) => {
  return cartItems.filter((item) => item.id !== itemToClear.id);
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return clearCartItem(cartItems, productToRemove);
  } else {
    return cartItems.map((item) =>
      item.id === existingCartItem.id
        ? { ...item, quantity: item.quantity - 1 }
        : { ...item }
    );
  }
};

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

const countCartItems = (cartItems) => {
  return cartItems.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
};

const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartTotalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };
  useEffect(() => {
    setCartItemsCount(countCartItems(cartItems));
    setCartTotalPrice(calculateCartTotal(cartItems));
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartItemsCount,
    cartTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
