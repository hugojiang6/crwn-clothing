// react library
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
// component
import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropdown from '../../component/cart-dropdown/cart-dropdown.component';
// redux
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.select';
// utils
import { signOutUser } from '../../utils/firebase/firebase.utils';
// context
// import { UserContext } from '../../contexts/user.context';
// import { CartContext } from '../../contexts/cart.context';
// assets
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
// style
import { NavigationContainer, NavLink, NaviLinks, LogoContainer } from './navigation.styles.jsx';

const Navigation = () => {
  // const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  // const { isCartOpen } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>

        <NaviLinks>
          <NavLink to='/shop'>Shop</NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to='/auth'>Sign In</NavLink>
          )}

          <CartIcon />

          {isCartOpen && <CartDropdown />}
        </NaviLinks>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
