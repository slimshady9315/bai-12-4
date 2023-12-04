import ProductCard from "./product-card";
import "./product-list.css";

export default function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
