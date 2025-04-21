'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { PhoneDetailType, PaginatedResponse } from '@/types/phone';

/**
 * Custom hook to fetch phone data using React Query
 */
export function usePhoneData( limit = 20 ) {
    return useInfiniteQuery<PaginatedResponse, Error>({
        queryKey: [ 'phones' ],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await fetch(`/api/phone?limit=${limit}&offset=${pageParam}`);
            
            if ( !response.ok ) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            
            return response.json();
        },
        initialPageParam: 0,
        getNextPageParam: ( lastPage ) => {
            // Return the next offset, or undefined if there are no more items
            return lastPage.pagination.hasMore 
                ? lastPage.pagination.offset + lastPage.pagination.limit
                : undefined;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
}

/**
 * Custom hook to fetch a specific phone by ID
 */
export function usePhoneDetail( id: string ) {
    return useQuery<PhoneDetailType, Error>({
        queryKey: [ 'phoneDetail', id ],
        queryFn: async () => {
            const response = await fetch(`/api/phone/${id}`);

            if ( !response.ok ) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const phone = await response.json();

            if ( !phone ) {
                throw new Error('Phone not found');
            }
            
            return phone;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
}