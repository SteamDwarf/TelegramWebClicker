import './GamePage.scss';
import { Shop } from 'widgets/Shop';
import { Food } from 'widgets/Food';
import { Forest } from 'widgets/Forest';
import { useGameLifeCycle } from 'shared/hooks/useGameLifeCycle';

export const GamePage = () => {
    const gameLideCycle = useGameLifeCycle({eatFoodInterval: 4000})

    return (
        <div className='game__page'>
            <Forest />
            <Shop />
            <Food />
        </div>
    );
}