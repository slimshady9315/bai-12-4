import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { roundPrice } from "../../helpers/round-price";
import "./product-card.css";

export default function ProductCard({ product }) {
  return (
    <Link className="product-link" to={`/products/${product.id}`}>
      <div className="product-card">
        <div className="product-thumbnail">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
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

          <div className="product-rating">
            <ReactStars
              value={product.rating}
              size={13}
              activeColor={"#ffd700"}
              edit={false}
            />
            <span className="rating-value">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
