import React, { useEffect, useState } from "react";
import { fireDB } from "./../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Carousel from "./Carousel";
import BrowseByCategory from "./BrowserCategoryComp/BrowseByCategory";

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Fetch product data from Firestore and cache it
  useEffect(() => {
    const fetchProducts = async () => {
      const cachedProducts = localStorage.getItem("flashsales");

      if (cachedProducts) {
        setProducts(JSON.parse(cachedProducts));
        setLoading(false);
      } else {
        try {
          const querySnapshot = await getDocs(collection(fireDB, "flashsales"));
          const productList = [];
          querySnapshot.forEach((doc) => {
            productList.push({ id: doc.id, ...doc.data() });
          });
          setProducts(productList);
          localStorage.setItem("flashsales", JSON.stringify(productList));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching products: ", error);
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mt-8 lg:mx-24">
      {/* Header */}
      <div className="flex flex-col items-start ml-5">
        <div className="flex gap-3">
          <div className="bg-red-500 text-red-500 text-sm font-semibold px-1 py-1 rounded-md inline-block">
            a
          </div>
          <h1 className="text-red-500 font-semibold">Today's</h1>
        </div>
        <h1 className="text-3xl font-bold mt-2 text-center sm:text-left">
          Flash Sales
        </h1>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center mt-6">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-solid"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center mt-6 text-red-500 font-semibold">
          No products available at the moment.
        </p>
      ) : (
        <Carousel products={products} />
      )}
      {/* View All Button */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-red-500  text-white font-semibold py-2 px-4 rounded-sm transition duration-300 hover:bg-red-600"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All Products"}
        </button>
      </div>

      <BrowseByCategory />
    </div>
  );
};

export default FlashSales;
