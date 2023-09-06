// style
import { CartItemContainer, ItemDetails, ImageContainer } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <ImageContainer src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span className='name'>{name}</span>
        <span className='price'>
          {quantity} x NT${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
