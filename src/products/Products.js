import { useEffect, useState } from "react";
import "./Products.css";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    perpage: 15,
    sortOrder: "desc",
  });

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?limit=${filter.perpage}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [filter.perpage]);

  const handleSelct = (type, value) => {
    setFilter({ ...filter, [type]: value });
  };

  const categories = products.map((x) => x.category) ?? [];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <div>
          <select
            onSelect={(event) => {
              handleSelct("category", event.target.value);
            }}
          >
            {[...new Set(categories)].map((category) => {
              return <option value={category}>{category}</option>;
            })}
          </select>
        </div>
        <div>
          <select
            value={filter.perpage}
            onSelect={(event) => {
              handleSelct("perpage", event.target.value);
            }}
          >
            <option value={"15"}>15</option>
            <option value={"25"}>25</option>
            <option value={"50"}>50</option>
          </select>
        </div>
        <div>
          <select
            onSelect={(event) => {
              handleSelct("sortOrder", event.target.value);
            }}
          >
            <option value={"asc"}>Ascending</option>
            <option value={"desc"}>Desceding</option>
          </select>
        </div>
      </div>
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
