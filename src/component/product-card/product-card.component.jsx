// react library
// import { useContext } from 'react';
// component
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
// context
// import { CartContext } from '../../contexts/cart.context';
// style
import { ProductCardContainer, Footer } from './product-card.styles';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.select';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems)
  const { name, imageUrl, price } = product;
  // const { addItemToCart } = useContext(CartContext);
  
  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
        Add to Card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
