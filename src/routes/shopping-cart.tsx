import { Link } from "react-router-dom";
import { useCart } from "../hooks/use-cart";
import CartList from "../components/cart/cart-list";
import "./shopping-cart.css";
import CartInfo from "../components/cart/cart-info";

export default function ShoppingCart() {
  const { totalItem } = useCart();

  if (totalItem === 0) {
    return (
      <main className="cart empty">
        <div>
          <h1>Your cart is empty</h1>

          <Link to={"/"}>
            <button>Go to shopping</button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart">
      <h1>Your shopping cart</h1>

      <CartList />

      <CartInfo />
    </main>
  );
}
