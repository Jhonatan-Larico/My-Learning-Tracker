
  
import React from 'react';

const CartContext = React.createContext({
  items: [1,2,3],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {}
});

export default CartContext;
/*
- create context
- manage that context  in some component with useState  or useReducer
- use cartprovider  component  to wrap all components that need access to the cart
 */