import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Product, Products } from "./Products";
import "@testing-library/jest-dom";
import httpMock from "../httpMock";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product 1",
    category: "Category 1",
    price: 10,
    image: "product1.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    category: "Category 2",
    price: 20,
    image: "product2.jpg",
  },
];

beforeEach(() => {
  httpMock.mockGet("products?limit", mockProducts);
  httpMock.mockGet("products/category", mockProducts);
});

afterEach(() => {
  httpMock.clearMocks();
});

describe("Product Component", () => {
  it("should show `Filter Date` Text", async () => {
    //arrage
    render(<Products />);

    //act
    const filterText = await screen.findByText("Filter Data");

    //assert
    expect(filterText).toBeInTheDocument();
  });

  it("Should Load the products", async () => {
    //arrange
    render(<Products />);

    // act
    const products = await screen.findAllByTestId("product-item");
    const product1 = await screen.findByText("Product 1");
    const product2 = await screen.findByText("Product 2");

    // assert
    expect(products.length).toBe(2);
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });

  it("should be able to change category", async () => {
    //arrange
    render(<Products />);

    //act
    await screen.findByText("Category 1");
    const dropdowns = await screen.findAllByRole("combobox");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    fireEvent.change(dropdowns[0], { target: { value: "Category 2" } });
    const products = await screen.findAllByTestId("product-item");

    //assert
    expect(products.length).toBe(2);
  });
});
