import './Forest.scss';
import ForestImg from 'assets/forest.png';
import { useStatsActions } from 'shared/state/StatsState/hooks';
import { TransparentButton } from 'shared/UI/TransparentButton/TransparentButton';

export const Forest = () => {
    const {increaseStat} = useStatsActions();

    const onClick = () => {
        increaseStat({stat: 'wood', value: 1})
    }

    return (
        <TransparentButton className='forest' onClick={onClick}>
            <img src={ForestImg}/>
        </TransparentButton>
    );
}
