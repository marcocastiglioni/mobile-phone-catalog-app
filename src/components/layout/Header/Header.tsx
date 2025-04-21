'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.scss';

export default function Header() {
    const { totalItems } = useCart();

    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <Link href={'/'} className={styles.logo}>
                    <Image src='/logo.svg' alt='Website logo' width={74} height={24} priority />
                </Link>
                <div className={styles.cartContainer}>
                    <Link href={'/cart'}>
                    <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.47059 0.320312H3.76471V4.08502H0V16.3203H12.2353V4.08502H8.47059V0.320312ZM7.52941 5.0262V7.37914H8.47059V5.0262H11.2941V15.3791H0.941176V5.0262H3.76471V7.37914H4.70588V5.0262H7.52941ZM7.52941 4.08502V1.26149H4.70588V4.08502H7.52941Z" fill="black"/>
                    </svg>
                    {totalItems > 0 && (
                        <span className={styles.itemsCounter}>{totalItems}</span>
                    )}
                    </Link>
                </div>
            </div>
        </header>
    );
}