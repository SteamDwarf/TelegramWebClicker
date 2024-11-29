import { ButtonHTMLAttributes, FC } from 'react';
import './TransparentButton.scss';
import { NavLink } from 'react-router';

interface TransparentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    toUrl?: string
}

export const TransparentButton:FC<TransparentButtonProps> = ({
    children, 
    className,
    toUrl,
    ...props
}) => {
    if(toUrl) return (
        <NavLink className={`transparent-button ${className ?? ''}`} to={toUrl}>
            {children}
        </NavLink>
    )

    return (
        <button className={`transparent-button ${className ?? ''}`} {...props}>{children}</button>
    );
}