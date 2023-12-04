export const CART = {
  ADD_ITEM: "cart/add",
  CHANGE_QUANTITY: "cart/change-quantity",
  REMOVE_ITEM: "cart/remove-item",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART.ADD_ITEM: {
      const isExist =
        state.items.findIndex(
          (item) => item.product.id === action.payload.product.id,
        ) !== -1;

      if (isExist) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }

    case CART.CHANGE_QUANTITY: {
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };
    }

    case CART.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.id,
        ),
      };
    }

    default: {
      return state;
    }
  }
};
