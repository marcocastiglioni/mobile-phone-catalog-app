/**
 * Interface defining the phone data attributes
 */
export interface Phone {
    id: string;
    brand: string;
    name: string;
    basePrice: number;
    imageUrl: string;
    cssModifier: string;
}

/**
 * Interface defining the state and methods available in the phone context
 */
export interface PhoneContextType {
    phones: Phone[];
    filteredPhones: Phone[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    totalPhones: number;
    filteredCount: number;
    setSearchTerm: (term: string) => void;
    refreshPhones: () => Promise<void>;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<void>;
    isFetchingNextPage: boolean;
}

/**
 * Interfaces for phone details
 */
export interface PhoneColorOption {
    name: string;
    hexCode: string;
    imageUrl: string;
}

export interface PhoneStorageOption {
    capacity: string;
    price: number;
}

export interface PhoneSpecs {
    screen: string;
    resolution: string;
    processor: string;
    mainCamera: string;
    selfieCamera: string;
    battery: string;
    os: string;
    screenRefreshRate: string;
}

export interface PhoneDetailType {
    id: string;
    brand: string;
    name: string;
    basePrice: number;
    description: string;
    rating: number;
    specs: PhoneSpecs;
    colorOptions: PhoneColorOption[];
    storageOptions: PhoneStorageOption[];
    similarProducts: Phone[];
}

export interface PhoneDetailContextType {
    phone: PhoneDetailType | null;
    loading: boolean;
    error: string | null;
    selectedColor: PhoneColorOption | null;
    selectedStorage: PhoneStorageOption | null;
    setSelectedColor: ( color: PhoneColorOption ) => void;
    setSelectedStorage: ( storage: PhoneStorageOption ) => void;
    currentPrice: number;
}

export interface PhoneSpecsPage extends PhoneSpecs {
    brand: string;
    name: string;
    description: string;
}

export interface PaginatedResponse {
    data: Phone[];
    pagination: {
      total: number;
      offset: number;
      limit: number;
      hasMore: boolean;
    };
  }