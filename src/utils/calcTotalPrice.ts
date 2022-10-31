import { CartItemType } from '../redux/cart/types';

export const calcTotaslPrice = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
};
