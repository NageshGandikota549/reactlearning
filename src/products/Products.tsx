import { useCallback, useEffect, useRef, useState } from "react";
import "./Products.css";
import FilterSection, { IFilter } from "./FilterSection";

export class Product {
  id: number = 0;
  title: string = "";
  category: string = "";
  price: number = 0;
  image: string = "";
}

export class Filter {
  category: string = "";
  perpage: number = 15;
  sortOrder: string = "desc";
}

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<IFilter>(new Filter());
  const [url, setUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrl(`https://fakestoreapi.com/products/category/${filter.category}`);
  }, [filter.category]);

  // LifeCycle methods - Component Mounting, Updating, Unmounting

  //Mounting
  useEffect(() => {
    inputRef.current?.focus();
    // if (inputRef.current) inputRef.current.style.backgroundColor = "red";
  }, []);

  // Updating
  useEffect(() => {
    setUrl(
      `https://fakestoreapi.com/products?limit=${filter.perpage}&sort=${filter.sortOrder}`
    );
  }, [filter.perpage, filter.sortOrder]);

  // Unmounting
  useEffect(() => {
    return () => {
      // clean
    };
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log("data", data);

        const allCategories = data.map((x: Product) => x.category);
        const uniqueValues = allCategories.filter(
          (x: string, idx: number) => allCategories.indexOf(x) === idx
        );
        if (categories.length === 0) setCategories(uniqueValues);
      });
  }, [categories.length, url]);

  const handleSelct = useCallback((type: string, value: string) => {
    setFilter((prev) => ({ ...prev, [type]: value }));
  }, []);

  const filterSectionProps = {
    handleSelct: handleSelct,
    categories: categories,
    filter: filter,
  };

  const filteredProducts = products.filter(
    (x) =>
      searchText.trim() === "" ||
      x.title
        .toLocaleLowerCase()
        .trim()
        .includes(searchText.toLocaleLowerCase().trim())
  );

  return (
    <>
      <span>Filter Data</span>
      <FilterSection {...filterSectionProps} />
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Products.."
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          value={searchText}
        />
      </div>
      <div className="grid-container">
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} data-testid="product-item">
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
