'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from '@/components/phone/PhoneDetail/PhoneDetail.module.scss';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Product page error:', error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <h1>Something went wrong</h1>
      <p>We couldn&apos;t load the product details you requested.</p>
      <p className={styles.errorMessage}>
        {error.message || 'Unknown error occurred'}
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
        <Link href="/" className={styles.backLink}>
          Back
        </Link>
      </div>
    </div>
  );
}