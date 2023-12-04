import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./filter.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    category: searchParams.get("category") || "all",
  });

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios
        .get("https://dummyjson.com/products/categories")
        .then((res) => res.data),
  });

  useEffect(() => {
    setSearchParams((prev) => {
      const newSearchParams = {};

      for (const [key, value] of prev.entries()) {
        newSearchParams[key] = value;
      }

      delete newSearchParams.page;

      if (filter.category == "all") delete newSearchParams.category;
      else newSearchParams.category = filter.category;

      return newSearchParams;
    });
  }, [filter]);

  return (
    <div className="filter">
      <div className="filter-heading">Filter by categories</div>

      {isLoading ? (
        <div>Loading categories</div>
      ) : isError ? (
        <div>Fail to load categories</div>
      ) : (
        <form>
          <div className="categories">
            {categories.map((category) => (
              <div key={category} className="category">
                <input
                  type="radio"
                  id={category}
                  name="category"
                  value={category}
                  checked={category === filter.category}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, category: e.target.value }))
                  }
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>

          {filter.category != "all" ? (
            <button
              onClick={(e) =>
                setFilter((prev) => ({ ...prev, category: "all" }))
              }
            >
              Clear filter
            </button>
          ) : null}
        </form>
      )}
    </div>
  );
}
