import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ProductDetails from "../../components/ProductDetails";
import useFetch from "../../hooks/useFetch";
import Skeleton from "react-loading-skeleton";

const Product = () => {
  const productId = useParams().id;
  const soloProduct = useFetch(`/products/${productId}?populate=*`);
  const { isLoading, error, data } = soloProduct;
  const [selectedImage, setSelectedImage] = useState("img");

  return (
    <div className="container mx-auto">
      {error ? (
        ""
      ) : isLoading ? (
        ""
      ) : data.length === 0 ? (
        ""
      ) : (
        <div className="space-x-3 flex items-center">
          <Link
            to={"/"}
            className="capitalize text-secondary opacity-80 font-medium"
          >
            home /
          </Link>
          <Link
            to={"/products/all"}
            className="capitalize text-secondary opacity-80 font-medium"
          >
            products /
          </Link>
          <Link
            to={`/products/${data.attributes.categories.data[1].attributes.title}`}
            className="capitalize text-secondary opacity-80 font-medium"
          >
            {data.attributes.categories.data[1].attributes.title} /
          </Link>
          <p className="capitalize text-primary opacity-90 font-semibold">
            {data.attributes.title}
          </p>
        </div>
      )}
      <div className="mt-12 flex relative">
        {error ? (
          <div className="text-center w-full absolute">
            <p className="font-bold font-raleway text-xl">
              "Sorry an error ocurred! kindly reload the page"
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex-1 flex space-x-3">
            <div className="space-y-3">
              <Skeleton className="w-24 h-24 rounded-xl" />
              <Skeleton className="w-24 h-24 rounded-xl" />
            </div>
            <Skeleton className="rounded-xl w-[500px] h-[500px]" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center w-full absolute">
            <p className="font-bold font-raleway text-xl">
              "Sorry product in this category is currently not available"
            </p>
          </div>
        ) : (
          <div className="flex-1 flex space-x-3">
            <div className="space-y-3">
              <div
                className={`w-24 h-24 overflow-hidden cursor-pointer rounded-xl ${
                  selectedImage === "img" ? "border border-primary" : ""
                }`}
                onClick={() => setSelectedImage("img")}
              >
                <img
                  src={
                    import.meta.env.VITE_REACT_APP_UPLOAD +
                    data.attributes.img.data.attributes.url
                  }
                  alt={data.attributes.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`w-24 h-24 overflow-hidden cursor-pointer rounded-xl ${
                  selectedImage === "img2" ? "border border-primary" : ""
                }`}
                onClick={() => setSelectedImage("img2")}
              >
                <img
                  src={
                    import.meta.env.VITE_REACT_APP_UPLOAD +
                    data.attributes.img2.data.attributes.url
                  }
                  alt={data.attributes.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="rounded-xl w-[500px] h-[500px] overflow-hidden">
              <img
                src={
                  import.meta.env.VITE_REACT_APP_UPLOAD +
                  data.attributes[selectedImage].data.attributes.url
                }
                alt={data.attributes.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <ProductDetails soloProduct={soloProduct} />
      </div>
    </div>
  );
};

export default Product;
