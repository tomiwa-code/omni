import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const List = ({ isProduct, gridQuad }) => {
  const { isLoading, error, data } = isProduct;

  return (
    <div
      className={`${
        gridQuad ? "grid-cols-4" : "grid-cols-3"
      } grid gap-y-14 gap-x-5 relative`}
    >
      {error ? (
        <div className="text-center w-full absolute">
          <p className="font-bold font-raleway text-xl">
            "Sorry an error ocurred! kindly reload the page"
          </p>
        </div>
      ) : isLoading ? (
        [0, 1, 2, 3].map((items) => {
          return (
            <div className="flex-1" key={items}>
              <Skeleton className="h-[350px] rounded-lg" />
              <Skeleton className="h-[30px] mt-3 w-[70%] rounded-lg" />
              <Skeleton className="h-[30px] mt-3 w-[90%] rounded-lg" />
            </div>
          );
        })
      ) : data.length === 0 ? (
        <div className="text-center w-full absolute">
          <p className="font-bold font-raleway text-xl">
            "Sorry product in this category is currently not available"
          </p>
        </div>
      ) : (
        data.map(({ id, attributes }) => {
          return (
            <Link
              to={`/product/${id}`}
              className="overflow-hidden rounded-3xl shadow-3xl space-y-4 pb-5"
              key={id}
            >
              <div className="relative rounded-3xl h-[350px] overflow-hidden">
                <span className="w-[40px] h-[40px] flex items-center justify-center absolute top-5 right-5 bg-white rounded-full cursor-pointer">
                  <BsHeart className="" />
                </span>
                <img
                  src={
                    import.meta.env.VITE_REACT_APP_UPLOAD +
                    attributes.img.data.attributes.url
                  }
                  alt={attributes.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute left-5 bottom-5 z-20 before:z-10 before:blur-sm before:absolute before:inset-0  overflow-hidden bg-[rgba(255,255,255,0.6)]  rounded-full space-x-4  p-4 flex items-center">
                  <BsStarFill className="text-[#F5E216]" />
                  <BsStarFill className="text-[#F5E216]" />
                  <BsStarFill className="text-[#F5E216]" />
                  <BsStarFill className="text-[#F5E216]" />
                  <BsStarFill className="text-white" />
                </div>
                {attributes.discount && (
                  <div className="absolute right-6 px-3 pt-2 bg-primary bottom-0 rounded-tl-3xl rounded-tr-3xl pb-3">
                    <p className="font-medium text-2xl text-white">
                      {attributes.discount}%
                    </p>
                  </div>
                )}
              </div>
              <div className="px-5 space-y-2">
                <p className="font-semibold font-raleway capitalize text-gray">
                  {attributes.title}
                </p>
                <div className="flex items-center space-x-3">
                  <p className="text-xl font-bold">
                    NGN {attributes.price.toFixed(2)}
                  </p>
                  {attributes.price2 && (
                    <p className="text-sm text-gray line-through font-bold">
                      NGN {attributes.price2.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default List;
