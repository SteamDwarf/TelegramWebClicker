import { TransparentButton } from "shared/UI/TransparentButton/TransparentButton";
import FoodImage from 'assets/food.png';
import { useStatsActions } from "shared/state/StatsState/hooks";

export const Food = () => {
    const { increaseStat } = useStatsActions();

    const onClick = () => {
        increaseStat({stat: 'food', value: 1});
    }

    return (
        <TransparentButton onClick={onClick}>
            <img src={FoodImage}/>
        </TransparentButton>
    );
}