// react library
// import { useContext } from 'react';
// context
// import { CartContext } from '../../contexts/cart.context';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.select';
import { setIsCartOpen } from '../../store/cart/cart.action';
// style
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  // const { cartCount } = useContext(CartContext);

  const toggle = () => {
    // setIsCartOpen(!isCartOpen);
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={toggle}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
