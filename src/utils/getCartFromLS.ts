import { CartItemType } from '../redux/cart/types';
import { calcTotaslPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotaslPrice(items);

  return {
    items : items as CartItemType[],
    totalPrice,
  };
};
