import { ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'link';
    cssModifier?: string;
    children?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
};

export default function Button({
    variant = 'primary',
    cssModifier = '',
    children,
    onClick,
    disabled = false
}: ButtonProps) {
    return (
        <button
            className={`
                ${styles.button} 
                ${styles[variant]} 
                ${cssModifier ? styles[cssModifier] : ''}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}