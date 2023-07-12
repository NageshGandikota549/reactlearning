import { useEffect, useState } from "react";
import "./Products.css";
import { FilterSection } from "./FilterSection";
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    perpage: 15,
    sortOrder: "desc",
  });
  const [url, setUrl] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setUrl(`https://fakestoreapi.com/products/category/${filter.category}`);
  }, [filter.category]);

  useEffect(() => {
    setUrl(
      `https://fakestoreapi.com/products?limit=${filter.perpage}&sort=${filter.sortOrder}`
    );
  }, [filter.perpage, filter.sortOrder]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (categories.length === 0) {
          setCategories(data.map((x) => x.category));
        }
      });
  }, [categories.length, url]);

  const handleSelct = (type, value) => {
    setFilter({ ...filter, [type]: value });
  };

  const filterSectionProps = {
    handleSelct: handleSelct,
    categories: categories,
    filter: filter,
  };

  return (
    <>
      <FilterSection {...filterSectionProps} />
      <div className="grid-container">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <img
                alt={product.title}
                src={product.image}
                height={"100px"}
                width="100px"
              />
              <div>{product.title}</div>
              <div>{product.price}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
