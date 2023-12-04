import { useState } from "react";
import { useCart } from "../../hooks/use-cart";
import { roundPrice } from "../../helpers/round-price";
import "./cart-item.css";

export default function CartItem({ item }) {
  const { onRemove, onChange } = useCart();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const product = item.product;

  return (
    <div className="cart-item">
      <div className="cart-item-wrapper">
        <div className="product">
          <div className="product-thumbnail">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className="product-info">
            <h4 className="product-title">{product.title}</h4>

            <div className="product-price">
              <span className="sale-price">
                $
                {roundPrice(
                  product.price -
                    (product.price * product.discountPercentage) / 100,
                )}
              </span>
              <span className="origin-price">${product.price}</span>
            </div>

            <select
              className="product-quantity"
              id="product-quantity"
              value={item.quantity}
              onChange={(e) =>
                onChange({ id: product.id, quantity: +e.target.value })
              }
            >
              {Array(product.stock)
                .fill(null)
                .map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
            </select>
          </div>
        </div>

        <div className="actions">
          {confirmDelete ? (
            <>
              <button
                onClick={() => setConfirmDelete(false)}
                className="remove-item"
              >
                Cancel
              </button>
              <button
                onClick={() => onRemove({ id: product.id })}
                className="remove-item"
              >
                Ok
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="remove-item"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
