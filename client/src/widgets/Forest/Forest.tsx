import './Forest.scss';
import ForestImg from 'assets/forest.png';
import { useAppContext } from 'shared/context/AppContext';
import { TransparentButton } from 'shared/UI/TransparentButton/TransparentButton';

export const Forest = () => {
    const {data, changeData} = useAppContext();

    const onClick = () => {
        changeData('wood', data.wood + 1);
    }

    return (
        <TransparentButton className='forest' onClick={onClick}>
            <img src={ForestImg}/>
        </TransparentButton>
    );
}
