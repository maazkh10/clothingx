import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [ itemAmount, setItemAmount ] = useState(0);

   useEffect(() =>{
 if (cart) {
  const amount = cart.reduce((accumulator,currentItem)=>{ 
    return accumulator  + currentItem.amount;
  }, 0);
  setItemAmount (amount)
 }
   },[cart])

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1}
    // console.log(newItem);

    const CartItem = cart.find((item) => {
      return item.id === id;
    });

    if (CartItem) {
      const newCart = [...cart].map(item=>{
        if (item.id === id) {
          return {...item, amount: CartItem.amount + 1};
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart,newItem]);
    }
  }; 
// console.log(cart);
const removeFromCart = (id) =>{
  const newCart = cart.filter((item) =>{
    return item.id !== id;
  });
  setCart(newCart);
}
const clearCart = () => {
  setCart([]);
};

const increaseAmount = (id) => {
  const updatedCart = cart.map(item => {
    if (item.id === id) {
      return { ...item, amount: item.amount + 1 };
    }
    return item;
  });
  setCart(updatedCart);
};

const decreaseAmount = (id) => {
  const updatedCart = cart.map(item => {
    if (item.id === id && item.amount > 1) {
      return { ...item, amount: item.amount - 1 };
    }
    return item;
  });
  setCart(updatedCart);
};

  return (
    <CartContext.Provider value={{cart, addToCart,
    removeFromCart,clearCart, increaseAmount,decreaseAmount, itemAmount, }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
