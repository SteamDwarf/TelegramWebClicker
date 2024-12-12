import './Forest.scss';
import ForestImg from 'assets/forest.png';
import SawmillImg from 'assets/Sawmill.png';
import { useStats, useStatsActions } from 'shared/state/StatsState/hooks';
import { LevelData } from 'shared/types';
import { TransparentButton } from 'shared/UI/TransparentButton/TransparentButton';


const farmLevelData: Record<number, LevelData> = {
    0: {
        image: ForestImg,
        resourcesPerClick: 1
    },
    1: {
        image: SawmillImg,
        resourcesPerClick: 5
    }
}

export const Forest = () => {
    const {increaseStat} = useStatsActions();
    const { sawmillLevel } = useStats();

    const onClick = () => {
        increaseStat({stat: 'wood', value: farmLevelData[sawmillLevel].resourcesPerClick})
    }

    return (
        <TransparentButton className='forest' onClick={onClick}>
            <img src={farmLevelData[sawmillLevel].image}/>
        </TransparentButton>
    );
}
