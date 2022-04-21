import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartContants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const itemExist = state.cartItems.find((i) => i.product === item.product);
      if (itemExist) {
        return {
          ...state,

          cartItems: state.cartItems.map((i) =>
            i.product === itemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartitems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    default:
      return state;
  }
};
