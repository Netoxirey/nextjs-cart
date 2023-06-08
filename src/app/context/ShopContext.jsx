'use client'
import { createContext, useState, useEffect } from "react"

export const ShopContext = createContext()


function ShopProvider({ children }) {
  
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
// fetch a la api de fake store
  useEffect(() => {
    const fetchData = () => {
      fetch('https://fakestoreapi.com/products', {
        next: {
          revalidate: 60,
        },
      })
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => {
          console.log('api response error', error);
        });
    };

    fetchData();
  }, []);
  
  const [cartItems, setCartItems] = useState([]);
  //Getting stored cart from local storage and seting the cartItems stato into local sotare cartItems
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cart')
    if(storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
  },[])
// Adding items to the cart
const addToCart = (item) => {
  const alreadyInCart = cartItems.find((cartItem) => cartItem.id === item.id);

  if (alreadyInCart) {
    // If the product is already in the cart, add the quantities
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + item.quantity,
        };
      }
      return cartItem;
    });

    setCartItems(updatedCart);
  } else {
    // If the product is not in the cart, add it as a new item
    setCartItems([...cartItems, item]);
  }
};
// Removing items from the cart
  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id)
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems))
  };

  // Update products quantity in cart
  const updateCart = (newQuantity, item) => {
    const updatedQuantity = +newQuantity;
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: updatedQuantity };
      }
      return cartItem;
    });
  
    setCartItems(updatedCartItems);
  };

  // Total price in cart 
  const calcTotalPrice = () => {
    if (cartItems.length > 0) {
      const totalPriceCalculated = cartItems.reduce((priceAcumulator, currentItem) => {
        return priceAcumulator + currentItem.price * currentItem.quantity;
      }, 0);
      setTotalPrice(totalPriceCalculated.toFixed(2));
    } else {
      setTotalPrice(0);
    }
  }

  useEffect(() => {
    calcTotalPrice();
  }, [cartItems]);

   //Saving cartItems in localStorage
   useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, products,updateCart, totalPrice }}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopProvider