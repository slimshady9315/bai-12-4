import { useCart } from "../../hooks/use-cart";
import { roundPrice } from "../../helpers/round-price";
import { Link } from "react-router-dom";

export default function CartInfo() {
  const { totalItem, totalPrice, totalDiscount } = useCart();

  return (
    <div className="cart-info">
      <div className="cart-total-item">Total items: {totalItem}</div>
      <div className="cart-total-price">
        Total price: <del>${roundPrice(totalPrice)}</del>
      </div>
      <div className="cart-discount">
        Total discount: ${roundPrice(totalDiscount)}
      </div>
      <div className="cart-price">
        Price: ${roundPrice(totalPrice - totalDiscount)}
      </div>

      <Link to={"/checkout"}>
        <button>Checkout</button>
      </Link>
    </div>
  );
}
