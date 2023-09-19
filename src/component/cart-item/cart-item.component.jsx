// style
import { CartItemContainer, ItemDetails, ImageContainer } from './cart-item.styles';

import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.select';
import { clearItemFromCart } from '../../store/cart/cart.action';

const CartItem = ({ cartItem }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;

  const removeItemHandler = () => {
    dispatch(clearItemFromCart(cartItems, cartItem));
  };

  return (
    <CartItemContainer>
      <ImageContainer src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span className='name'>{name}</span>
        <span className='price'>
          {quantity} x NT${price}
        </span>
        <div className='remove' onClick={removeItemHandler}>
          Remove
        </div>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
