export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('1.store: ', store)
  console.log('1.action.type: ', action.type);
  console.log('1.action.payload: ', action.payload);
  console.log('1.current state: ', store.getState());

  next(action);

  console.log('2.store: ', store);
  console.log('2.action.type: ', action.type);
  console.log('2.action.payload: ', action.payload);
  console.log('2.next state: ', store.getState());
  
};
