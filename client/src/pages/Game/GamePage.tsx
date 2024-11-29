import './GamePage.scss';
import { Shop } from 'widgets/Shop';
import { Food } from 'widgets/Food';
import { Forest } from 'widgets/Forest';
import { useGameLifeCycle } from 'shared/hooks';

export const GamePage = () => {
    const gameLifeCycle = useGameLifeCycle({eatFoodInterval: 4000, bornVillagerInterval: 8000})

    return (
        <div className='game__page'>
            <Forest />
            <Shop />
            <Food />
        </div>
    );
}