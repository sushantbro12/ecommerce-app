import React, { useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCamera,
  FaDesktop,
  FaGamepad,
  FaHeadphones,
  FaMobileAlt,
} from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { BiCategory, BiHome } from "react-icons/bi";
import { BsSmartwatch } from "react-icons/bs";
import ProductCard from "../FlashSalesComp/ProductCard";

const categories = [
  { name: "Phones", icon: <FaMobileAlt /> },
  { name: "Computers", icon: <FaDesktop /> },
  { name: "Watches", icon: <BsSmartwatch /> },
  { name: "Cameras", icon: <FaCamera /> },
  { name: "HeadPhones", icon: <FaHeadphones /> },
  { name: "Gaming", icon: <FaGamepad /> },
  { name: "Clothes", icon: <GiClothes /> },
  { name: "Furniture", icon: <BiHome /> },
  { name: "Others", icon: <BiCategory /> },
];

const CategoryCard = ({ name, icon, onClick }) => {
  return (
    <div
      className="mb-2 flex flex-col items-center justify-center w-32 h-32 bg-white border border-gray-300 rounded-lg hover:bg-red-500 hover:text-white transition duration-300 cursor-pointer"
      onClick={() => onClick(name)} // Call the onClick prop with the category name
    >
      <div className="text-3xl">{icon}</div>
      <span className="mt-2 font-medium">{name}</span>
    </div>
  );
};

const BrowseByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Assuming the products are stored in localStorage
    const storedProducts = localStorage.getItem("products");
    const storedFlashSales = localStorage.getItem("flashsales");
    const storedBestSelling = localStorage.getItem("bestselling");

    const allProducts = [
      ...(storedProducts ? JSON.parse(storedProducts) : []),
      ...(storedFlashSales ? JSON.parse(storedFlashSales) : []),
      ...(storedBestSelling ? JSON.parse(storedBestSelling) : []),
    ];

    setProducts(allProducts);
  }, []);

  useEffect(() => {
    // Filter products based on selected category
    const filtered =
      selectedCategory === "" || selectedCategory === "All"
        ? products
        : products.filter(
            (product) =>
              product.category.toLowerCase() === selectedCategory.toLowerCase()
          );

    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative rounded-lg mt-10 ml-5 mb-10 lg:mx-24">
      <div className="flex gap-3">
        <div className="bg-red-500 text-red-500 text-sm font-semibold px-1 py-1 rounded-md inline-block">
          a
        </div>
        <h1 className="text-red-500 font-semibold ">Categories</h1>
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-4 pb-2">Browse By Category</h2>
      {/* Arrows */}
      <button
        className="absolute right-12 top-0 transform hover:bg-red-100 bg-white p-2 rounded-full shadow-md z-10"
        onClick={scrollLeft}
      >
        <FaArrowLeft />
      </button>

      <div
        ref={carouselRef}
        className="flex overflow-x-scroll carousel-container"
      >
        <div>
          <div className="flex items-center justify-between gap-3 ml-3">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                name={category.name}
                icon={category.icon}
                onClick={setSelectedCategory} // Pass the setter function to CategoryCard
              />
            ))}
          </div>
        </div>
      </div>

      <button
        className="absolute right-0 top-0 transform hover:bg-red-100 bg-white p-2 rounded-full shadow-md z-10"
        onClick={scrollRight}
      >
        <FaArrowRight />
      </button>

      {/* Display filtered products */}
      {selectedCategory && (
        <div className="mt-10">
          <div className="flex gap-10 flex-wrap justify-center items-center">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseByCategory;
