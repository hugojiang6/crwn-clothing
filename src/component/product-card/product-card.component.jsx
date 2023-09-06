// react library
import { useContext } from 'react';
// component
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
// context
import { CartContext } from '../../contexts/cart.context';
// style
import { ProductCardContainer, Footer } from './product-card.styles';

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(product);
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
