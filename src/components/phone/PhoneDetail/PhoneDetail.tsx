'use client';

import { PhoneColorOption, PhoneSpecsPage, PhoneStorageOption } from '@/types/phone';
import styles from './PhoneDetail.module.scss';
import { usePhoneDetail } from '@/hooks/usePhoneData';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Skeleton from '@/components/common/Skeleton/Skeleton';
import SpecsTable from '@/components/common/SpecsTable/SpecsTable';
import Link from 'next/link';
import Image from 'next/image';
import PhoneCard from '../PhoneCard/PhoneCard';

export default function PhoneDetail({ id }: { id: string }) {
    const { data: phone, isLoading, error } = usePhoneDetail( id );
    const { addItem, items } = useCart();
    const [ selectedColor, setSelectedColor ] = useState<PhoneColorOption | null>(null);
    const [ selectedStorage, setSelectedStorage ] = useState<PhoneStorageOption | null>(null);
    const [ currentImageUrl, setCurrentImageUrl ] = useState<string | null>(null);
    const [ shouldRedirect, setShouldRedirect ] = useState(false);
    const [ phoneSpecs, setPhoneSpecs ] = useState<PhoneSpecsPage | null>(null);
  
    // Initialize default selections when data loads
    useEffect(() => {
        setCurrentImageUrl(phone?.colorOptions[0]?.imageUrl ?? '');
        setPhoneSpecs({
            brand: phone?.brand || '', 
            name: phone?.name || '',
            description: phone?.description || '',
            screen: phone?.specs?.screen || '',
            resolution: phone?.specs?.resolution || '',
            processor: phone?.specs?.processor || '',
            mainCamera: phone?.specs?.mainCamera || '',
            selfieCamera: phone?.specs?.selfieCamera || '',
            battery: phone?.specs?.battery || '',
            os: phone?.specs?.os || '',
            screenRefreshRate: phone?.specs?.screenRefreshRate || ''
        })
    },[phone]);

    // Update image when color changes
    useEffect(() => {
        if ( selectedColor ) {
            setCurrentImageUrl( selectedColor.imageUrl );
        }
    },[ selectedColor ]);

    // Calculate current price based on selected storage
    const currentPrice = selectedStorage?.price || phone?.basePrice || 0;

    // Check if phone is in cart
    const isInCart = Boolean(items.find(item => item.id === id));

    // Handle adding to cart
    const handleAddToCart = () => {
        if ( phone && currentImageUrl && selectedStorage && selectedColor ) {
            addItem({
                id: phone.id,
                name: phone.name,
                brand: phone.brand,
                basePrice: currentPrice,
                imageUrl: currentImageUrl,
                quantity: 1,
                storageCapacity: selectedStorage?.capacity,
                colorName: selectedColor?.name,
                cssModifier: '',
            });

            setShouldRedirect(true);
        }
    };

    // Redirect to cart page
    if ( shouldRedirect ) {
        if (typeof window !== 'undefined') {
            window.location.href = '/cart';
            return null;
        }
    }

    // Loading state
    if (isLoading) {
        return (
            <div className={styles.productDetail}>
                <div className={styles.backButton}>
                    <Link href="/">Back</Link>
                </div>
                
                <div className={styles.detailContainerLoading}>
                    <div className={styles.productImages}>
                        <Skeleton height="400px" width="100%" />
                    </div>
                
                    <div className={styles.productInfo}>
                        <Skeleton height="24px" width="70%" className={styles.titleSkeleton} />
                        <Skeleton height="20px" width="40%" className={styles.brandSkeleton} />
                        <Skeleton height="20px" width="70%" className={styles.priceSkeleton} />
                        
                        <div className={styles.optionsContainer}>
                            <Skeleton height="20px" width="120px" />
                            <div className={styles.optionsRow}>
                                {[1, 2, 3].map(i => (
                                <Skeleton key={i} height="40px" width="40px" />
                                ))}
                            </div>
                            
                            <Skeleton height="20px" width="120px" />
                            <div className={styles.optionsRow}>
                                {[1, 2, 3].map(i => (
                                <Skeleton key={i} height="22px" width="22px" />
                                ))}
                            </div>
                        </div>
                        
                        <Skeleton height="40px" width="100%" className={styles.buttonSkeleton} />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !phone) {
        return (
        <div className={styles.errorContainer}>
            <h1>Error Loading Product</h1>
            <p>{error?.message || 'Product could not be loaded'}</p>
            <Link href="/" className={styles.backLink}>
            Back to Phone List
            </Link>
        </div>
        );
    }

    return (
        <div className={styles.productDetail}>
            <div className={styles.backButton}>
                <Link href="/">Back</Link>
            </div>
            
            <div className={styles.detailContainer}>

                <div className={styles.mainImage}>
                    {currentImageUrl &&
                        <Image
                            src={currentImageUrl}
                            alt={`${phone.brand} ${phone.name} - ID: ${phone.id}`}
                            width={400}
                            height={400}
                            priority
                            className={styles.productImage}
                        />
                    }
                </div>
                
                <div className={styles.productInfo}>
                    <h1 className={styles.productTitle}>{phone.name}</h1>
                    <h2 className={styles.price}>{currentPrice} EUR</h2>
                    
                    {/* STORAGE */}
                    {phone.storageOptions && phone.storageOptions.length > 0 && (
                        <div className={styles.optionsSection}>
                            <h3>Storage ¿hOW MUCH SPACE DO YOU NEED?</h3>
                            <div className={styles.storageOptions}>
                                {phone.storageOptions.map((storage) => (
                                <div
                                    key={storage.capacity}
                                    className={`${styles.storageOption} ${selectedStorage?.capacity === storage.capacity ? styles.selectedStorage : ''}`}
                                    onClick={() => setSelectedStorage(storage)}
                                >
                                    {storage.capacity}
                                </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* COLOR */}
                    {phone.colorOptions && phone.colorOptions.length > 0 && (
                        <div className={styles.optionsSection}>
                            <h3>color. pick your favourite.</h3>
                            <div className={styles.colorOptions}>
                                {phone.colorOptions.map((color) => (
                                    <div 
                                        key={color.name}
                                        className={`${styles.colorOption} ${selectedColor?.name === color.name ? styles.selectedColor : ''}`}
                                        onClick={() => setSelectedColor(color)}
                                        title={color.name}
                                    >
                                        <div style={{ backgroundColor: color.hexCode }} />
                                    </div>
                                ))}
                            </div>
                            <p className={styles.selectedOptionName}>{ selectedColor?.name ? selectedColor.name : phone.colorOptions[0].name}</p>
                        </div>
                    )}
                    
                    <div className={styles.actions}>
                        <button
                            className={styles.addToCartButton}
                            onClick={handleAddToCart}
                            disabled={ !selectedColor || !selectedStorage }
                        >
                            {isInCart ? 'Añadido' : 'Añadir'}
                        </button>
                    </div>
                </div>
            </div>


            {/* SPECIFICATIONS SECTION */}
            <div className={styles.specsSection}>
                <h2>Specifications</h2>
                {phoneSpecs && <SpecsTable specs={ phoneSpecs } />}
            </div>
            
            {/* SIMILAR ITEMS SECTION */}
            {phone.similarProducts && phone.similarProducts.length > 0 && (
                <div className={styles.similarProducts}>
                    <h2>SIMILAR ITEMS</h2>
                    <div className={styles.similarProductsGrid}>
                        <div className={styles.similarProductsGridWrapper}>
                            {phone.similarProducts.map((item, index) => (
                                <PhoneCard key={index} {...item} cssModifier={styles.similarProductCard} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}