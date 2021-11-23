import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST_ITEM,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
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
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

export const wishListReducer = (
  state = { wishListItems: [] },
  action
) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;

      const isItemExist = state.wishListItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          wishListItems: state.wishListItems,
        };
      } else {
        return {
          ...state,
          wishListItems: [...state.wishListItems, item],
        };
      }

    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishListItems: state.wishListItems.filter((i) => i.product !== action.payload),
      };


    default:
      return state;
  }
};