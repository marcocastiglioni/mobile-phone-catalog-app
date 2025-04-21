'use client';

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import styles from "./cart.module.scss";
import Button from "@/components/ui/Button/Button";

export default function CartPage() {
  const { items, removeItem, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link href="/" className={styles.continueShopping}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  if ( items ) {
    items.map(item => console.log(item))
  }

  return (
    <div className={styles.cartPage}>
      
      <div className={styles.cartContainer}>
        <h1>Cart ({totalItems})</h1>
        
        {/* Cart Items */}
        <div className={styles.cartItems}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.cartItem__image}>
                <Image
                  src={item.imageUrl}
                  alt={`${item.brand} ${item.name}`}
                  width={100}
                  height={100}
                />
              </div>
              
              <div className={styles.cartItem__details}>
                <div className={styles.cartItem__info}>
                  <p className={styles.cartItem__name}>{item.name}</p>
                  <p className={styles.cartItem__storage}><span>{item.storageCapacity}</span> | <span>{item.colorName}</span></p>
                  <p className={styles.cartItem__total}>{(item.basePrice).toFixed(2)} EUR {item.quantity > 1 ? `(${item.quantity} units)` : ''}</p>
                </div>
                
                <div className={styles.cartItem__actions}>
                  <Button
                    variant="link"
                    onClick={() => removeItem(item.id)}
                    cssModifier={'alert'}
                    aria-label={`Remove ${item.brand} ${item.name} from cart`}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout CTA bar */}
      <div className={styles.checkoutContainer}>
        
        <div className={styles.cartSummary__total__mobile}>
          <span>TOTAL:</span>
          <span>{totalPrice.toFixed(2)} EUR</span>
        </div>

        <div className={styles.checkoutContent}>
          <Link href="/" className={styles.continueShopping}>
            <Button variant="secondary">
              Continue Shopping
            </Button>
          </Link>
          <div className={styles.ctaContainer}>
            <div className={styles.cartSummary__total}>
                <span>TOTAL:</span>
                <span>{totalPrice.toFixed(2)} EUR</span>
            </div>
            <Button>PAY</Button>
          </div>
        </div>
      </div>
    </div>
  );
}