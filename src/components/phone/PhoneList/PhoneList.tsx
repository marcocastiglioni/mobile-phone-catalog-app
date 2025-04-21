'use client';

import { useEffect, useRef } from 'react';
import { usePhones } from "@/context/PhoneContext";
import SearchPhones from '@/components/phone/SearchPhone/SearchPhone';
import PhoneCard from "@/components/phone/PhoneCard/PhoneCard";
import PhoneListSkeleton from './PhoneListSkeleton';
import styles from "./PhoneList.module.scss";

export default function PhoneList (){
    const { 
        filteredPhones, 
        loading, 
        error, 
        hasNextPage, 
        fetchNextPage,
        isFetchingNextPage
    } = usePhones();

    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!hasNextPage || !observerTarget.current) return;

        const currentTarget = observerTarget.current;
        const observer = new IntersectionObserver(
            entries => {
                // If the sentinel is visible and we have more pages to load
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the sentinel is visible
        );

        // Start observing the sentinel element
        observer.observe(currentTarget);

        // Clean up the observer when component unmounts
        return () => {
            observer.unobserve(currentTarget);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);


    // Handle loading state for initial data fetch
    if (loading && !isFetchingNextPage) {
        return (
            <>
                <SearchPhones />
                <PhoneListSkeleton count={12} />
            </>
        );
    }

    // Handle error state
    if ( error ) return <div>Error: {error}</div>;

    return(
        <>
            <SearchPhones />
            <div className={`${styles.phoneList} ${styles.grid}`}>
                {filteredPhones && filteredPhones.map((phone, index) => 
                    <PhoneCard key={index} {...phone} />
                )}
                
                {/* Sentinel element for infinite scrolling */}
                {hasNextPage && (
                    <div 
                        ref={observerTarget} 
                        className={styles.loadingMore}
                    >
                        {isFetchingNextPage ? (
                            <div className={styles.loadingIndicator}>
                                Loading more phones...
                            </div>
                        ) : (
                            <div className={styles.scrollIndicator}>
                                Scroll for more
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}