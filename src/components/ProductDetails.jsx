import { useState } from "react";
import { BsCart2, BsCheck2 } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux/es/exports";
import { addToCart } from "../Redux/cartSlice";

const ProductDetails = ({ soloProduct }) => {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { isLoading, error, data } = soloProduct;
  const [showNote, setShowNote] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAddToCart = () => {
    if (size !== "" && color !== "") {
      dispatch(
        addToCart({
          _id: data.id,
          id: `${data.attributes.title} ${size} ${color}`,
          name: data.attributes.title,
          color: color,
          size: size,
          quantity: quantity,
          price: data.attributes.price,
          totalPrice: data.attributes.price * quantity,
          desc: data.attributes.desc,
          img: data.attributes.img.data.attributes.url,
        })
      );
      setShowNote(true);
      // remove notification
      setTimeout(() => {
        setShowNote(false);
      }, 3000);
    } else {
      setShowError(true);
      // remove error
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <>
      {showNote && (
        <div className="absolute rounded-lg text-center shadow-3xl bg-white space-x-3 w-[300px] px-3 py-5 left-[50%] -translate-x-[50%] -top-20 flex items-center justify-between">
          <span className="bg-[#6dcc6d] rounded-full p-1">
            <BsCheck2 className="text-[white]" />
          </span>
          <p className="font-raleway font-semibold text-secondary">
            Product added to cart
          </p>
          <button onClick={() => setShowNote(false)} className="text-[#d9534f]">
            <MdClose className="text-xl font-bold" />
          </button>
        </div>
      )}

      {showError && (
        <div className="absolute rounded-lg text-center shadow-3xl bg-white space-x-3 w-[300px] px-3 py-5 left-[50%] -translate-x-[50%] -top-20 flex items-center justify-between">
          <span className="bg-[#d9534f] rounded-full p-1">
            <MdClose className="text-[white]" />
          </span>
          <p className="font-raleway font-semibold text-secondary">
            Select a color and a size
          </p>
          <button onClick={() => setShowNote(false)} className="text-[#d9534f]">
            <MdClose className="text-xl font-bold" />
          </button>
        </div>
      )}

      {error ? (
        ""
      ) : isLoading ? (
        <div className="flex-1">
          <Skeleton className="rounded-lg py-5 w-[300px]" />
          <Skeleton className="rounded-lg py-5 w-[400px] mt-3" />
          <Skeleton className="rounded-lg py-8 w-[500px] mt-3" />
          <div className="flex mt-3 space-x-10">
            <Skeleton className="rounded-lg py-5 w-[200px]" />
            <Skeleton className="rounded-lg py-5 w-[200px]" />
          </div>
          <Skeleton className="rounded-lg py-5 w-[100px] mt-3" />
          <Skeleton className="rounded-lg py-5 w-[200px] mt-3" />
        </div>
      ) : data.length === 0 ? (
        ""
      ) : (
        <div className="flex-1 px-10 space-y-3" key={data.id}>
          <h2 className="capitalize font-extrabold font-raleway text-3xl">
            {data.attributes.title}
          </h2>
          <div className="flex items-center space-x-6">
            <p className="font-extrabold text-3xl text-primary">
              NGN {data.attributes.price.toFixed(2)}
            </p>
            <p className="text-gray line-through font-semibold">
              NGN {data.attributes.price2.toFixed(2)}
            </p>
          </div>
          <p className="text-justify">{data.attributes.desc}</p>
          <div className="flex space-x-2 min-h-[100px] pt-2">
            <div className="space-y-3 flex-1">
              <p className="font-bold text-lg">Size:</p>
              <div className="flex space-x-4">
                {data.attributes.sizes.data.map(({ id, attributes }) => (
                  <button
                    className={`font-bold w-10 h-10 rounded uppercase ${
                      size === attributes.type
                        ? "bg-primary text-white"
                        : "bg-[#e7e7e7]"
                    }`}
                    onClick={() => setSize(attributes.type)}
                    key={id}
                  >
                    {attributes.type}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3 flex-1">
              <p className="font-bold text-lg">Colors:</p>
              <div className="flex items-center space-x-4">
                {data.attributes.colors.data.map(({ attributes, id }) => (
                  <div className="flex space-x-5" key={id}>
                    <div
                      className={`flex items-center duration-200 ${
                        color === attributes.title
                          ? "shadow-3xl py-3 px-5 space-x-4 rounded-full"
                          : ""
                      }  `}
                    >
                      <button
                        className="font-bold w-7 h-7 rounded-full"
                        onClick={() => setColor(attributes.title)}
                        style={{ backgroundColor: attributes.title }}
                      ></button>
                      {color === attributes.title && (
                        <p className="text-lg capitalize font-medium">
                          {attributes.title}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center pt-3 space-x-2">
            <button
              className="w-10 h-10 bg-secondary text-white text-2xl rounded"
              onClick={() => setQuantity((elem) => (elem === 1 ? 1 : elem - 1))}
            >
              -
            </button>
            <p className="w-10 h-10 rounded flex items-center justify-center text-lg">
              {quantity}
            </p>
            <button
              className="w-10 h-10 bg-secondary text-white text-2xl rounded"
              onClick={() => setQuantity((elem) => elem + 1)}
            >
              +
            </button>
          </div>
          <div className="pt-5">
            <button
              className="w-52 text-white flex items-center justify-center py-4 bg-primary rounded text center space-x-2"
              onClick={handleAddToCart}
            >
              <BsCart2 className="text-lg" />
              <p className="text-lg">Add to cart</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
