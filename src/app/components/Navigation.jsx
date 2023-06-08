'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import styles from '../styles/Navigation.module.css'
import { Poppins } from 'next/font/google';

const links = [{
    label: 'Store',
    route: '/'
  },
  {
    label: 'Cart',
    route: '/cart'
  }
  ]
  const poppins = Poppins({
    weight: ['400', '700', '900'],
    style: 'normal',
    subsets: ['latin'],
    display: 'swap'
  });
  

function Navigation() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
    <nav>
      <ul className={styles.nav}>
        {links.map(({ label, route }) => (
          <li className={styles.nav_li} key={label}> <Link href={route} className={styles.nav_link}> <button className={` ${styles.nav_button} ${poppins.className} ${pathname === route ? styles.active : ""}`}>{label}</button></Link></li>
        ))}
      </ul>
    </nav>
  </header>
  )
}

export default Navigation