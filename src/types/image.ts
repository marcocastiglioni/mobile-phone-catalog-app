export interface OptimizedImageType {
    src: string;
    alt: string;
    width: number;
    height: number;
    sizes?: string;
    priority?: boolean;
    className?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}