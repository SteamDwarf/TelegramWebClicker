import './GamePage.scss';
import { Shop } from 'widgets/Shop';
import { Food } from 'widgets/Food';
import { Forest } from 'widgets/Forest';

export const GamePage = () => {
    return (
        <div className='game__page'>
            <Forest />
            <Shop />
            <Food />
        </div>
    );
}