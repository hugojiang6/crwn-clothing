import { createContext, useReducer } from 'react';

// <<<<<<<<<<<<<<<<<<<<<<< function >>>>>>>>>>>>>>>>>>>>>>>
// 增加(加入)購物車商品
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// 減少(移除)購物車商品
const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
};

// 移除購物車商品
const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

// <<<<<<<<<<<<<<<<<<<<<<< createContext >>>>>>>>>>>>>>>>>>>>>>>
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

// <<<<<<<<<<<<<<<<<<<<<<< reducer >>>>>>>>>>>>>>>>>>>>>>>
const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN: {
      return {
        ...state,
        isCartOpen: payload,
      };
    }
    case CART_ACTION_TYPES.SET_CART_ITEMS: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      throw new Error(`is not ${type}`);
  }
};

// <<<<<<<<<<<<<<<<<<<<<<< provider >>>>>>>>>>>>>>>>>>>>>>>
export const CartProvider = ({ children }) => {
  // <<<<<<<<<<<<<<<<<<<<<<< useState >>>>>>>>>>>>>>>>>>>>>>>
  // 購物車視窗狀態
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // 購物車物件狀態
  // const [cartItems, setCartItems] = useState([]);
  // 購物車物件數量狀態
  // const [cartCount, setCartCount] = useState(0);
  // 購物車總價格
  // const [cartTotal, setCartTotal] = useState(0);

  // <<<<<<<<<<<<<<<<<<<<<<< useEffect >>>>>>>>>>>>>>>>>>>>>>>
  // 當購物車物件有變動，重新計算總數量
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce((total, cartItem) => {
  //     return total + cartItem.quantity;
  //   }, 0);

  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // 當購物車產品有變動，重新計算總價格
  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce((total, cartItem) => {
  //     return total + cartItem.quantity * cartItem.price;
  //   }, 0);

  //   setCartTotal(newCartTotal);
  // }, [cartItems]);

  // <<<<<<<<<<<<<<<<<<<<<<< useReducer >>>>>>>>>>>>>>>>>>>>>>>
  const [{ isCartOpen, cartCount, cartTotal, cartItems }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  // <<<<<<<<<<<<<<<<<<<<<<< handler >>>>>>>>>>>>>>>>>>>>>>>
  // 整合更新購物車物件、數量、總金額
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

    dispatch({
      type: 'SET_CART_ITEMS',
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      },
    });
  };

  // 購物車關閉展開
  const setIsCartOpen = (isCartOpen) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen });
  };

  // 增加(加入)購物車商品
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  // 減少(移除)購物車商品
  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  // 移除購物車商品
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  // <<<<<<<<<<<<<<<<<<<<<<< return >>>>>>>>>>>>>>>>>>>>>>>
  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        cartCount,
        cartTotal,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
