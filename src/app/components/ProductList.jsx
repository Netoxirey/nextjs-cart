'use client'
import Image from 'next/image';
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import styles from '../styles/PorductsList.module.css';
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '700', '900'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap'
})


function ProductList() {
  const { addToCart, products } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [addedProductId, setAddedProductId] = useState(null);

  const handleClick = (product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1000);
  };

  const handleChangue = (e) => setQuantity(+e.target.value);

  return (
    <main className={styles.products_grid}>
      {products?.map(({ id, title, price, image }) => (
        <div key={id} className={`${styles.product} ${addedProductId === id ? styles.fade_in : styles.fade_out}`}>
          <Image src={image} alt={`an image of ${title}`} height={300} width={300} />
          <h3 className={styles.product_title}>{title}</h3>
          <p className={styles.product_price}>$ {price}</p>
          <select name="quantity" id="quantity" onChange={handleChangue} className={styles.product_select}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button className={`${styles.product_button} ${poppins.className}`} onClick={() => handleClick({ id, title, price, image, quantity })}>
            Add to cart
          </button>
          {addedProductId === id && (
            <div className={styles.modal}>
              <h3 className={styles.modal_text}>Producto añadido</h3>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}

export default ProductList;
