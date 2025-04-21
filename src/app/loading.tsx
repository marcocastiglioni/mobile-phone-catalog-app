import PhoneListSkeleton from '@/components/phone/PhoneList/PhoneListSkeleton';

export default function Loading() {
  return (
    <div className='p-phone-catalog'>
      <div style={{ marginBottom: '2rem' }}>
        
        {/* Search box skeleton */}
        <div style={{ 
          height: '40px', 
          maxWidth: '400px', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '6px',
          marginBottom: '0.5rem'
        }}></div>
        
        {/* Results count skeleton */}
        <div style={{ 
          height: '16px', 
          width: '100px', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '4px' 
        }}></div>
      </div>
      
      <PhoneListSkeleton count={12} />
      
    </div>
  );
}