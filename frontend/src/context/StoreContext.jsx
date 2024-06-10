import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

// exportujemo storeContext kako bismo mogli da koristimo ovja context u drugim komponentama
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // pravimo useState varijablu kojom cemo upravljati itemima u cartu
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
  //  funkcija koja koja ima itemId kao parametar. Ova funkcija sluzi da bi se item izbacio iz Cart-a. Zbog toga je bitno da joj parametar bude itemId kako bi mogli da prepoznamo item koji je u Cartu
  const removeFromCart = (itemId) => {
    // funkcija koja menja state. Kao parametar, uzima arrow funkciju, koja ima prethodni state kao parametar. Ona dalje koristi spread operator kako bi ucitala ceo sadrzaj prethodnog state-a i skinula 1 od kolicine u cartu
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  // funkcija koja nam vraca ukupnu vrednost itema u cartu. Uzima arrow funkciju koja ne prima ni jedan parametar
  const getTotalCartAmount = () => {
    // varijabla koju kreiramo kako bismo mogli da smestimo broj koji predstavlja ukupnu vrednost cart-a
    let totalAmount = 0;
    // for in petlja koja nam omogucava da predjemo preko svakog itema u cartu
    for (const item in cartItems) {
      // if petlja koja se executuje samo ukoliko postoji vise od 1 odredjenog itema koji se nalazi u cartu
      if (cartItems[item] > 0) {
        // varijabla koju kreiramo kako bismo mogli da pronadjemo i verifikiujemo da se item koji je u cartu, takodje deo menija
        let itemInfo = food_list.find((product) => product._id === item);
        // dodajemo cena itema * kolicina itema u cartu na varijablu koja predstavlja ukupnu vrednost carta
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    // na kraju funkcije, vracamo vrednost total amount varijable
    return totalAmount;
  };

  // pravimo vrednost contexta koju cemo da prosledimo Provider komponenti kako bi vrednosti u tom objektu bile dostupne svim komponentama koje koriste ovaj context
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  // vracamo Provider komponentu kojoj prosledjujemo contextValue kao prop. Koristimo props.children kako bismo mogli da renderujemo children komponente koje su u samom context provideru
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
