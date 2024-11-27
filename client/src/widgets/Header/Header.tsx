import { IStatItem, StatItem } from 'features/StatItem';
import './Header.scss';
import { FoodIcon, LogIcon, VillagerIcon } from 'shared/icons';
import { useAppContext } from 'shared/context/AppContext';



export const Header = () => {
    const { data } = useAppContext();
    /* useEffect(() => {
        console.log(data);
    }, [data]) */

    const stats:IStatItem[] = [
        {
            icon: <LogIcon />,
            value: data.wood
        },
        {
            icon: <FoodIcon />,
            value: data.food
        },
        {
            icon: <VillagerIcon />,
            value: data.villagers
        }
    ]

    return (
        <header className='header'>
            {stats.map((stat) => <StatItem data={stat}/>)}
        </header>
    )
}