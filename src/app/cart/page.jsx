'use client'
import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Image from "next/image";
import styles from "../styles/Cart.module.css"
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '700', '900'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap'
})

function CartPage() {
  const { cartItems, removeFromCart, updateCart, totalPrice} = useContext(ShopContext);

  const handleClick = (item) => {
    removeFromCart(item)
  }

  const handleChangue = (newQuantity, item) => {
    updateCart(newQuantity,item)
  };
  
  return (
    <main className={styles.cart}>
    <div className={styles.cart_items}>
        {cartItems?.map((item) => (
            <div key={item.id} className={styles.cart_item}>
                <Image src={item.image} alt={`an image of ${item.title}`} width={200} height={200}/>
                <h3 className={styles.cart_title}>{item.title}</h3>
                <p className={styles.cart_price}>Price: <span className={styles.cart_price_span}>{item.price}</span></p>
                <label htmlFor="quantity" className={styles.cart_label}>Quantity:</label>
                <select name="quantity" id="quantity" defaultValue={item.quantity} onChange={(e) => handleChangue(e.target.value, item)} className={styles.cart_select}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
                <button onClick={() => handleClick(item)} className={`${styles.cart_button} ${poppins.className}`}>Remove</button>
            </div>
        ))}
    </div>
    <div className={styles.cart_summary}>
      <h3 className={styles.cart_title}>Summary</h3>
      <p className={styles.cart_price} >Total Products <span className={styles.cart_price_span}>${totalPrice}</span></p>
      <p className={styles.cart_price} >Shipping <span className={styles.cart_price_span}>$0</span></p>
      <p className={styles.cart_price}>Total <span className={styles.cart_price_span}>${totalPrice}</span></p>
    </div>
    </main>
  )
}

export default CartPage
