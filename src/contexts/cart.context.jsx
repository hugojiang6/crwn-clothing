import { createContext, useState, useEffect } from 'react';

// 從商品加入購物車按鈕或從結帳頁面增加商品數量
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  // 商品存在，數量+1
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  // 商品不存在，增加一樣商品
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// 購物車移除商品數量，小於1則移除商品
const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
  // 商品如果等於1，就移除該商品
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // 商品-1
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
};

// 購物車移除產品
const clearCartItem = (cartItems, cartItemToClear) => {
  // 移出該商品
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

// createContext Initialization
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
});

// 購物車 Provider
export const CartProvider = ({ children }) => {
  // 購物車視窗狀態
  const [isCartOpen, setIsCartOpen] = useState(false);
  // 購物車物件狀態
  const [cartItems, setCartItems] = useState([]);
  // 購物車物件數量狀態
  const [cartCount, setCartCount] = useState(0);
  // 購物車總價格
  const [cartTotal, setCartTotal] = useState(0);

  // 當購物車物件有變動，就重新計算總數量
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  // 當購物車產品有變動或數量有變動，就重新計算總價
  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);

    setCartTotal(newCartTotal);
  }, [cartItems]);

  // 增加(加入)購物車商品
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // 減少(移除)購物車商品
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  // 移除購物車商品
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        setCartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal,
      }}>
      {children}
    </CartContext.Provider>
  );
};
