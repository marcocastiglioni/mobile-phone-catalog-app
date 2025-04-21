'use client';

import { useParams } from 'next/navigation';
import PhoneDetail from '@/components/phone/PhoneDetail/PhoneDetail';

export default function PhonePage() {
  const params = useParams();
  const id = params.id as string;
  
  return <PhoneDetail id={id} />;
}