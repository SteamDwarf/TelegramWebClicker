import { TransparentButton } from "shared/UI/TransparentButton/TransparentButton";
import FarmImage from 'assets/food.png';
import FarmWithHouseImage from 'assets/FarmWithhouse.png';
import { useStats, useStatsActions } from "shared/state/StatsState/hooks";
import { LevelData } from "shared/types";


const farmLevelData: Record<number, LevelData> = {
    0: {
        image: FarmImage,
        resourcesPerClick: 1
    },
    1: {
        image: FarmWithHouseImage,
        resourcesPerClick: 5
    }
}

export const Food = () => {
    const { farmLevel } = useStats();
    const { increaseStat } = useStatsActions();

    const onClick = () => {
        increaseStat({stat: 'food', value: farmLevelData[farmLevel].resourcesPerClick});
    }

    return (
        <TransparentButton onClick={onClick}>
            <img src={farmLevelData[farmLevel].image}/>
        </TransparentButton>
    );
}