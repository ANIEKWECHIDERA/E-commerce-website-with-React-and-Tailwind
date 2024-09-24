import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/cart");
  };
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        // console.log(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* render products here */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {/* {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))} */}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="image prev" />
          </div>
        </div>
        {/* render the product information here */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(132)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  } `}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black  text-white px-8 py-3 text-sm active:bg-orange-500"
          >
            ADD TO CART
          </button>
          <button
            onClick={handleNavigate}
            className="bg-slate-500 text-white text-sm my-5 sm:mx-8 px-8 py-3"
          >
            VIEW CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original Product</p>
            <p>Cash on Delivery</p>
            <p>Easy return and exchange policy withing 3 days</p>
          </div>
        </div>
      </div>
      {/* Decription and reviewsection */}
      {/* <div className="my-20">
        <div className="flex">
          <b className="border px-5 py-3  text-sm">Description</b>
          <p className="border px-5 py-3  text-sm ">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border py-6 px-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            eveniet dolore repellendus amet nesciunt soluta vitae dolorem
            molestiae molestias non. Repellat dicta eum veritatis architecto
            laboriosam temporibus autem quis optio.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit cum
            nulla accusantium ducimus eaque maiores dignissimos dolorem iusto
            debitis dicta. Aspernatur similique a illo, distinctio laudantium
            vel asperiores consectetur ab?
          </p>
        </div>
      </div> */}

      {/* render related products here */}

      <RelatedProducts
        category={productData.category}
        selectedProductId={productData._id}
      />
    </div>
  ) : (
    //
    <div className="opacity-0"></div>
  );
};

export default Product;
