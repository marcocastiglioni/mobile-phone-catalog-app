import Link from 'next/link';
import Skeleton from '@/components/common/Skeleton/Skeleton';
import styles from '@/components/phone/PhoneDetail/PhoneDetail.module.scss';

export default function ProductLoading() {
  return (
    <div className={styles.productDetail}>
      <div className={styles.backButton}>
        <Link href="/">Back</Link>
      </div>
      
      <div className={styles.detailContainer}>
        <div className={styles.productImages}>
          <Skeleton height="400px" width="100%" />
          
          <div className={styles.thumbnailContainer}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton 
                key={i} 
                width="60px" 
                height="60px" 
                borderRadius="6px" 
              />
            ))}
          </div>
        </div>
        
        <div className={styles.productInfo}>
          <Skeleton height="40px" width="70%" className={styles.titleSkeleton} />
          <Skeleton height="20px" width="30%" className={styles.brandSkeleton} />
          
          <Skeleton height="80px" width="100%" />
          
          <Skeleton height="32px" width="30%" className={styles.priceSkeleton} />
          
          <div>
            <Skeleton height="24px" width="80px" />
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton 
                  key={i} 
                  width="32px" 
                  height="32px" 
                  borderRadius="50%" 
                />
              ))}
            </div>
          </div>
          
          <div>
            <Skeleton height="24px" width="80px" />
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              {[1, 2, 3].map((i) => (
                <Skeleton 
                  key={i} 
                  width="80px" 
                  height="36px" 
                  borderRadius="4px" 
                />
              ))}
            </div>
          </div>
          
          <div>
            <Skeleton height="24px" width="120px" />
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '12px',
              marginTop: '12px'
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Skeleton height="16px" width="80px" />
                  <Skeleton height="16px" width="100%" />
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <Skeleton height="48px" width="160px" />
            <Skeleton height="48px" width="160px" />
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '48px' }}>
        <Skeleton height="32px" width="200px" />
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Skeleton height="180px" width="100%" />
              <Skeleton height="16px" width="40%" />
              <Skeleton height="20px" width="80%" />
              <Skeleton height="20px" width="50%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}