import { ButtonHTMLAttributes, FC } from 'react';
import './TransparentButton.scss';

export const TransparentButton:FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children, 
    className,
    ...props
}) => {
    return (
        <button className={`transparent-button ${className ?? ''}`} {...props}>{children}</button>
    );
}