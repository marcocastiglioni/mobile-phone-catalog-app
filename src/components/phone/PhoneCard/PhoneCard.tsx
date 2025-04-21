'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone } from '@/types/phone';
import styles from './PhoneCard.module.scss';
import Link from 'next/link';

export default function PhoneCard({ name, brand, basePrice, imageUrl, id, cssModifier = '' }: Phone ) {
    const [ imageLoaded, setImageLoaded ] = useState(false);

    return (
        <Link href={`/phone/${id}`} className={`${styles.phoneCard} ${cssModifier}`}>
            <div className={styles.phoneCard__content}>
                <div className={styles['phoneCard__image-container']}>
                    {!imageLoaded && (
                        <div className={styles['phoneCard__image-container--skeleton']}></div>
                    )}
                    <Image
                        src={imageUrl}
                        alt={`Picture of the ${brand} ${name} - ID: ${id} phone`}
                        width={312}
                        height={257}
                        className={`${styles['phoneCard__image']} ${ imageLoaded ? styles['phoneCard__image--loaded'] : '' }`}
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
                <div className={styles.phoneCard__details}>
                    <div>
                        <p className={styles.phoneCard__brand}>{brand}</p>
                        <p className={styles.phoneCard__name}>{name}</p>
                    </div>
                    <p className={styles.phoneCard__basePrice}>{basePrice} eur</p>
                </div>
            </div>
        </Link>
    );
}