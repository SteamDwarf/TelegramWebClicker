import ShopImage from 'assets/Shop.png';
import './Shop.scss';
import { TransparentButton } from 'shared/UI/TransparentButton/TransparentButton';

export const Shop = () => {
    return (
        <TransparentButton className='shop'>
            <img src={ShopImage} alt='shop' />
        </TransparentButton>
    );
}