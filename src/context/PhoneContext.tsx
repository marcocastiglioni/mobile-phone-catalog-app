/**
 * src/context/PhoneContext.tsx
 * Context API for phone management in the application.
 * 
 * This context provides access to the phone catalog, search functionality,
 * and loading/error states throughout the application.
 * 
 * @example
 * ```tsx
 * // Wrap your application or component tree with the provider
 * import { PhoneProvider } from '@/context/PhoneContext';
 * 
 * function App() {
 *   return (
 *     <PhoneProvider>
 *       <YourComponents />
 *     </PhoneProvider>
 *   );
 * }
 * 
 * // Access the context in any child component
 * import { usePhones } from '@/context/PhoneContext';
 * 
 * function SearchComponent() {
 *   const { setSearchTerm, filteredPhones, loading } = usePhones();
 *   
 *   return (
 *     <>
 *       <input onChange={(e) => setSearchTerm(e.target.value)} />
 *       {loading ? <Spinner /> : <PhoneList phones={filteredPhones} />}
 *     </>
 *   );
 * }
 * ```
 * 
 * @property {Phone[]} phones - Complete list of available phones
 * @property {Phone[]} filteredPhones - List of phones filtered by current search term
 * @property {boolean} loading - Indicates if data is being loaded
 * @property {string|null} error - Error message, if any
 * @property {string} searchTerm - Current search term
 * @property {number} totalPhones - Total number of phones
 * @property {number} filteredCount - Number of phones in filtered results
 * 
 * @method setSearchTerm(term: string) - Sets a new search term
 * @method refreshPhones() - Refreshes the phone list from the API
 */

'use client';

import { ReactNode, useContext, useState, createContext, useCallback, useMemo } from "react";
import { PhoneContextType } from "@/types/phone";
import { useDebounce } from '@/hooks/useDebounce';
import { usePhoneData } from "@/hooks/usePhoneData";

// Creating the context with an initial undefined value
const PhoneContext = createContext<PhoneContextType>({
    phones: [],
    filteredPhones: [],
    loading: false,
    error: null,
    searchTerm: '',
    totalPhones: 0,
    filteredCount: 0,
    setSearchTerm: () => {},
    refreshPhones: async () => {},
    hasNextPage: false,
    fetchNextPage: async () => {},
    isFetchingNextPage: false
});

/**
 * Provider that encapsulates phone management state and logic
 * 
 * @param children - Child components that will have access to the context
 */
export function PhoneProvider({ children }: { children: ReactNode }) {

    // Use React Query's infinite query for data fetching
    const { 
        data,
        isLoading: loading,
        error: queryError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = usePhoneData();

    const [ searchTerm, setSearchTermState ] = useState('');

    // Debounce search term to avoid excessive filtering
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Keep track of all loaded phones (the paginated subset)
    const loadedPhones = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.data);
    }, [data]);

    // Filter phones based on search term
    const filteredPhones = useMemo(() => {
        if ( !debouncedSearchTerm.trim() ) {
            return loadedPhones;
        }
        
        const searchTermLower = debouncedSearchTerm.toLowerCase();
        
        return loadedPhones.filter(phone => 
            phone.name.toLowerCase().includes(searchTermLower) || 
            phone.brand.toLowerCase().includes(searchTermLower)
        );
    }, [ loadedPhones, debouncedSearchTerm ]);

    // Error handling
    const error = queryError ? queryError.message : null;

    // Set search term
    const setSearchTerm = useCallback(( term: string ) => {
        setSearchTermState( term );
    }, []);

    // Get the total count from the first page's pagination data
    const totalPhones = useMemo(() => 
        data?.pages?.[0]?.pagination?.total || 0, 
    [data]);
    
    // If there's a search term, show filtered count, otherwise show loaded count
    const filteredCount = useMemo(() => {
        if (debouncedSearchTerm.trim()) {
            return filteredPhones.length;
        } else {
            // Show the total available based on API's pagination info
            return loadedPhones.length;
        }
    }, [filteredPhones, loadedPhones, debouncedSearchTerm]);

    // Should we show "load more" for filtered results?
    const showingFiltered = debouncedSearchTerm.trim() !== '';
    
    // Only show hasNextPage when not filtering
    const hasMorePages = useMemo(() => {
        if (showingFiltered) {
            // Don't show "load more" when showing filtered results
            return false;
        }
        return Boolean(hasNextPage);
    }, [hasNextPage, showingFiltered]);

    // Refresh phones
    const refreshPhones = useCallback(async () => {
        await refetch();
    }, [refetch]);

    // Memorize the context value with infinite scrolling to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        phones: loadedPhones,
        filteredPhones,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refreshPhones,
        totalPhones,
        filteredCount,
        hasNextPage: hasMorePages,
        fetchNextPage: async () => { await fetchNextPage(); },
        isFetchingNextPage
    }), [
        loadedPhones,
        filteredPhones,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refreshPhones,
        totalPhones,
        filteredCount,
        hasMorePages,
        fetchNextPage,
        isFetchingNextPage
    ]);

    return (
        <PhoneContext.Provider value={contextValue}>
            {children}
        </PhoneContext.Provider>
    );
};

/**
 * Custom hook to access the phone context
 * 
 * @returns The context with all methods and properties for phone management
 * @throws Error if used outside of a PhoneProvider
 * 
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const { setSearchTerm, filteredPhones } = usePhones();
 *   
 *   return (
 *     <input 
 *       type="text"
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *       placeholder="Search phones..."
 *     />
 *   );
 * }
 * ```
 */
export function usePhones(): PhoneContextType {
    const context = useContext(PhoneContext);
    
    if (context === undefined) {
        throw new Error('usePhones must be used within a PhoneProvider');
    }
    
    return context;
}