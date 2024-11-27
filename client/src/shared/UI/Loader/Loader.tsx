import { FC } from "react";
import './Loader.scss';

interface LoaderProps {
    text: string;
}

export const Loader:FC<LoaderProps> = ({text}) => {
    return (
        <div className='loader'>
            <div className='loader__icon'></div>
            <span className='loader__text'>{text}</span>
        </div>
    );
}

