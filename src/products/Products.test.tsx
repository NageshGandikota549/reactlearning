import { render, screen } from "@testing-library/react";
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
    httpMock.mockGet('products', mockProducts);
})

afterEach(() => {
    httpMock.clearMocks();
})


describe("Product Component", () => {
  it("should show `Filter Date` Text", async () => {
    //arrage
    render(<Products />);

    //act
    const filterText = await screen.findByText("Filter Data");

    //assert
    expect(filterText).toBeInTheDocument();
  });
    
    
    it('Should Load the products', async() => {
     
        //arrange
        render(<Products />);
        
        //act
       const products = await screen.findAllByTestId("product-item");

        //assert
        expect(products.length).toBe(2)
 })
});
