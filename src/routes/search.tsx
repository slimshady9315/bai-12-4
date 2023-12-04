import ProductList from "../components/product/product-list";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["products", { search: q }],
    queryFn: () =>
      axios
        .get(`https://dummyjson.com/products/search`, {
          params: { q },
        })
        .then((res) => res.data),
  });

  return (
    <>
      <h1>Search results for: &quot;{q}&quot;</h1>

      {isLoading ? (
        <div>Loading products</div>
      ) : isError ? (
        <div>Fail to load products data: {error.message}</div>
      ) : data.products.length == 0 ? (
        <div>No products</div>
      ) : (
        <ProductList products={data.products} />
      )}
    </>
  );
}
