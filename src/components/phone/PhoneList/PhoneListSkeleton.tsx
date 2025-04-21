'use client';

import Skeleton from '@/components/common/Skeleton/Skeleton';
import styles from './PhoneList.module.scss';

export default function PhoneListSkeleton({ count = 8 }: { count?: number}) {
    return (
        <div className={`${styles.phoneList} ${styles.grid}`}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={styles.phoneCardSkeleton}>
                    <Skeleton 
                        height="289px"
                        className={styles.phoneCardSkeleton__image}
                    />
                    <div className={styles.phoneCardSkeleton__content}>
                        <Skeleton 
                        width="40%"
                        height="22px"
                        className={styles.phoneCardSkeleton__brand} 
                        />
                        <Skeleton 
                        width="20%"
                        height="22px"
                        className={styles.phoneCardSkeleton__price}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}