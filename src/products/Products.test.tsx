import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Product, Products } from "./Products";
import fetchMock from "jest-fetch-mock";

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

// Mock the API fetch call
beforeEach(() => {
  fetchMock.enableMocks();
  // if you have an existing `beforeEach` just add the following lines to it
  fetchMock.mockIf(
    (request: Request) => request.url.includes("products"),
    JSON.stringify(mockProducts)
  );
});

describe("Products Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders products correctly", async () => {
    render(<Products />);

    // Wait for the products to be loaded
    await screen.findByText("Product 1");

    // Check if products are rendered correctly
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
