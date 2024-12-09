import { IStatItem, StatItem } from 'features/StatItem';
import './Header.scss';
import { CoinIcon, FoodIcon, LogIcon, VillagerIcon } from 'shared/icons';
import { useStats } from 'shared/state/StatsState/hooks';
import { Dropdown, MenuProps } from 'antd';
import { TonConnectButton } from '@tonconnect/ui-react';
import { OptionsIcon } from 'shared/icons/OptionsIcon';
import { NavLink } from 'react-router';

const items: MenuProps['items'] = [
    {
        key: 0,
        label: <NavLink to='profile'>Profile</NavLink>,
    }
]

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
            <Dropdown menu={{items}} trigger={['click']}>
                <button className='header__options'>
                    <OptionsIcon />
                </button>
            </Dropdown>
        </header>
    )
}