import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // Funkcija koja prima ID itema i dodaje ga u cart
  const addToCart = (itemId) => {
    // ukoliko item sa odredjenim ID-em ne postoji u cartu, postavi broj itema sa tim ID-jem na 1
    if (!cartItems[itemId]) {
      // setCartItems - funkcija koja menja broj cart itema u cartu. Prima callback funkciju i koristi spread operator da napravi novu kopiju prethodnog state-a i da doda item sa novim ID-em i postavi njegovu kolicinu na 1
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      // ista funkcija kao u redu iznad, samo osim sto postavlja kolicinu itema na 1, uzima kolicinu prethodnog state-a i povecava je za 1
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
