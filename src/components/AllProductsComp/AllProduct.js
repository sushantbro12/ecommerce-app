import React, { useEffect, useState } from "react";
import ProductCard from "../HomePageComp/FlashSalesComp/ProductCard";
import CategoryFilter from "./CategoryFilter";
import PriceSort from "./PriceSort";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  useEffect(() => {
    const storedProducts = sessionStorage.getItem("products");
    const storedFlashSales = sessionStorage.getItem("flashsales");
    const storedBestSelling = sessionStorage.getItem("bestselling");

    // Parse and merge the data
    const allProducts = [
      ...(storedProducts ? JSON.parse(storedProducts) : []),
      ...(storedFlashSales ? JSON.parse(storedFlashSales) : []),
      ...(storedBestSelling ? JSON.parse(storedBestSelling) : []),
    ];

    setProducts(allProducts);
  }, []);

  useEffect(() => {
    // Filter products based on selected categories
    let filtered =
      selectedCategories.length === 0 || selectedCategories.includes("all")
        ? products
        : products.filter((product) =>
            selectedCategories.includes(product.category.toLowerCase())
          );

    // Sort products based on the selected sorting option
    let sortedArray = [...filtered];
    switch (sortOption) {
      case "low-to-high":
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedArray.sort((a, b) => b.price - a.price);
        break;
      case "relevant":
        sortedArray.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredProducts(sortedArray);
  }, [selectedCategories, products, sortOption]);

  return (
    <div className="relative lg:mx-24 flex flex-col md:flex-row">
      <div>
        <div className="flex flex-col items-start ml-5 mt-8">
          <h1 className="text-red-500 font-semibold text-xl sm:text-2xl">
            All Products
          </h1>
        </div>
        {/* Category Filter */}
        <CategoryFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      <div>
        <div className="mb-10 ml-10 md:absolute right-5 top-2 ">
          <PriceSort sortOption={sortOption} setSortOption={setSortOption} />
        </div>
        <div className="flex flex-col items-center md:mt-10  gap-6 md:flex-row md:flex-wrap md:p-10 md:ml-5 md:items-center md:justify-center">
          {filteredProducts.length === 0 ? (
            <p>No products available.</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
