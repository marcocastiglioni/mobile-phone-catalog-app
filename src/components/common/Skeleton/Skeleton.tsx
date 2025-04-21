'use client';

import { SkeletonType } from '@/types/skeleton';
import styles from './Skeleton.module.scss';

export default function Skeleton({
    width = '100%',
    height = '100%',
    borderRadius = '4px',
    className = '',
    variant = 'rectangular',
    animation = 'pulse'
}: SkeletonType) {

    const variantStyle = {
        rectangular: {},
        circular: {
            borderRadius: '50%'
        },
        text: {
            borderRadius: '4px',
            height: '1em'
        }
    }[variant];

    const style = {
        width,
        height,
        borderRadius,
        ...variantStyle
    };

    const animationClass = {
        pulse: styles.pulse,
        wave: styles.wave,
        none: ''
    }[animation];

    return (
        <div 
            className={`${styles.skeleton} ${animationClass} ${className}`}
            style={style}
            aria-hidden="true"
        />
    );
}