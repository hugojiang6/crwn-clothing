// react library
import { createContext, useEffect, useReducer } from 'react';
// utils
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// <<<<<<<<<<<<<<<<<<<<<<< createContext >>>>>>>>>>>>>>>>>>>>>>>
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// <<<<<<<<<<<<<<<<<<<<<<< reducer >>>>>>>>>>>>>>>>>>>>>>>
const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: 'null',
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: payload,
      };
    }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

// <<<<<<<<<<<<<<<<<<<<<<< provider >>>>>>>>>>>>>>>>>>>>>>>
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);

  // <<<<<<<<<<<<<<<<<<<<<<< useReducer >>>>>>>>>>>>>>>>>>>>>>>
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  // <<<<<<<<<<<<<<<<<<<<<<< handler >>>>>>>>>>>>>>>>>>>>>>>
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
    });

    return unsubcribe;
  }, []);

  // <<<<<<<<<<<<<<<<<<<<<<< return >>>>>>>>>>>>>>>>>>>>>>>
  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>;
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
