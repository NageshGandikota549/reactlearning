import { useEffect, useState } from "react";
import "./Products.css";
import { FilterSection, IFilter } from "./FilterSection";

export class Product {
  id: number = 0;
  title: string ='';
  category: string = '';
  price: number = 0;
  image: string = '';
}

export class Filter {
  category: string = '';
  perpage: number = 15;
  sortOrder: string ='desc';
}

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<IFilter>(new Filter());
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
          setCategories(data.map((x: Product) => x.category));
        }
      });
  }, [categories.length, url]);

  const handleSelct = (type:string, value:string) => {
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
