import { useContext } from "react";
import { CartContext } from "../providers/cart-provider";
import { CART } from "../reducers/cart-reducer";
import { toast } from "react-toastify";

export const useCart = () => {
  const [state, dispatch] = useContext(CartContext);

  const addToCart = ({ product, quantity = 1 }) => {
    dispatch({ type: CART.ADD_ITEM, payload: { product, quantity } });
    toast.success("The product was successfully added to the cart");
  };

  const changeQuantity = ({ id, quantity }) => {
    dispatch({ type: CART.CHANGE_QUANTITY, payload: { id, quantity } });
  };

  const removeItem = ({ id }) => {
    dispatch({ type: CART.REMOVE_ITEM, payload: { id } });
  };

  const totalItem = state.items.length;
  const totalPrice = state.items.reduce((total, item) => {
    total += item.quantity * item.product.price;

    return total;
  }, 0);
  const totalDiscount = state.items.reduce((total, item) => {
    total +=
      ((item.product.price * item.product.discountPercentage) / 100) *
      item.quantity;
    return total;
  }, 0);

  return {
    ...state,
    totalItem,
    totalPrice,
    totalDiscount,
    onAdd: addToCart,
    onChange: changeQuantity,
    onRemove: removeItem,
  };
};
