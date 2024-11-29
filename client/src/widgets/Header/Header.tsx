import { IStatItem, StatItem } from 'features/StatItem';
import './Header.scss';
import { CoinIcon, FoodIcon, LogIcon, VillagerIcon } from 'shared/icons';
import { useStats } from 'shared/state/StatsState/hooks';



export const Header = () => {
    const { food, wood, villagers, coins } = useStats();

    const stats:IStatItem[] = [
        {
            icon: <LogIcon />,
            value: wood
        },
        {
            icon: <FoodIcon />,
            value: food
        },
        {
            icon: <VillagerIcon />,
            value: villagers
        },
        {
            icon: <CoinIcon />,
            value: coins
        }
    ]

    return (
        <header className='header'>
            {stats.map((stat) => <StatItem data={stat}/>)}
        </header>
    )
}