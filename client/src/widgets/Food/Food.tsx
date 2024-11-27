import { TransparentButton } from "shared/UI/TransparentButton/TransparentButton";
import FoodImage from 'assets/food.png';
import { useAppContext } from "shared/context/AppContext";

export const Food = () => {
    const { data, changeData } = useAppContext();

    const onClick = () => {
        changeData('food', data.food + 1)
    }

    return (
        <TransparentButton onClick={onClick}>
            <img src={FoodImage}/>
        </TransparentButton>
    );
}