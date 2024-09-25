import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(filterProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  // Filter products based on category and subcategory
  const toggleCategory = (e) => {
    if (Category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (Category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        Category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let filteredProductsCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(
          filteredProductsCopy.sort((a, b) => a.price - b.price)
        );
        break;

      case "high-low":
        setFilterProducts(
          filteredProductsCopy.sort((a, b) => b.price - a.price)
        );
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [Category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="sm:mt-40 flex flex-col sm:flex-row gap-1 sm:gap-10 pt-2 border-t">
      {/* Filter Options */}
      <div className="min-w-60 sm:sticky top-20 h-full bg-white ">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""} `}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Jacket"}
              />
              Jacket
            </p>

            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Blazer"}
              />
              Blazer
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Shoe"}
              />
              Shoe
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Tie"}
              />
              Tie
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Belt"}
              />
              Belt
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Accessory"}
              />
              Accessories
            </p>
          </div>
        </div>
      </div>
      {/* the right side */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-col  md:flex-row justify-between sm:items-center text-base sm:text-2xl mb-4">
          <div className="py-5 sm:text-s">
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
          </div>
          {/* here we implement product sorting logic */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-2 sm:h-10"
            id=""
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to high</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map the products here*/}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {currentProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.images[0]}
            />
          ))}
        </div>
        <div className="text-center text-gray-600 mt-20">
          {pageNumbers.map((number) => (
            <button
              className="text-xs py-2 px-3 mr-5 bg-slate-200 rounded-full hover:bg-slate-500 hover:text-gray-50 transition"
              key={number}
              onClick={() => {
                setCurrentPage(number);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
