import '@testing-library/jest-dom';

// Mock modules that are referenced but need to be created
jest.mock('@/context/PhoneContext', () => ({
  usePhones: jest.fn().mockReturnValue({
    filteredPhones: [],
    loading: false,
    error: null,
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    isFetchingNextPage: false,
    setSearchTerm: jest.fn(),
    filteredCount: 0
  })
}));

jest.mock('@/hooks/usePhoneData', () => ({
  usePhoneDetail: jest.fn().mockReturnValue({
    data: null,
    isLoading: false,
    error: null
  }),
  usePhoneData: jest.fn().mockReturnValue({
    data: { pages: [{ data: [] }] },
    isLoading: false,
    error: null,
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    isFetchingNextPage: false
  })
}));

jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn().mockReturnValue({
    items: [],
    addItem: jest.fn(),
    totalItems: 0
  })
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => ({
    get: () => null,
  }),
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.observables = new Set();
  }

  observe(element) {
    this.observables.add(element);
  }

  unobserve(element) {
    this.observables.delete(element);
  }

  disconnect() {
    this.observables.clear();
  }

  // Helper method for tests
  simulateIntersection(isIntersecting) {
    const entries = Array.from(this.observables).map(target => ({
      target,
      isIntersecting,
      boundingClientRect: {},
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: {},
      rootBounds: null,
      time: Date.now()
    }));
    
    this.callback(entries, this);
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock window.location
Object.defineProperty(window, 'location', {
  writable: true,
  value: { href: '' },
});

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);