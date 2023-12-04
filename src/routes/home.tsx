import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductList from "../components/product/product-list";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("https://dummyjson.com/products"),
  });

  return (
    <main>
      <h1>Homepage</h1>

      <div>
        {isLoading ? (
          <div>Loading products data ....</div>
        ) : isError ? (
          <div>Fail to load products data: {error.message}</div>
        ) : (
          <ProductList products={data?.data.products} />
        )}
      </div>
    </main>
  );
}
