import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Collections = ({ category }) => {
  const { isLoading, error, data } = category;

  return (
    <div className="flex space-x-5 relative">
      {error ? (
        <div className="text-center w-full absolute">
          <p className="font-bold font-raleway text-xl">
            "Sorry an error ocurred! kindly reload the page"
          </p>
        </div>
      ) : isLoading ? (
        <Skeleton className="rounded-3xl h-[480px] flex-1" count={3} />
      ) : (
        data.map(({ id, attributes }) => {
          return (
            <Link
              to={`products/${attributes.title}`}
              className="flex-1 overflow-hidden rounded-3xl relative h-[480px] before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.3)] before:z-10"
              key={id}
            >
              <img
                src={
                  import.meta.env.VITE_REACT_APP_UPLOAD +
                  attributes.img.data.attributes.url
                }
                alt={attributes.title}
                className="w-full h-full object-cover relative"
              />
              <div className="inset-0 flex items-center justify-center absolute z-20">
                <p className="text-5xl uppercase font-bold text-white">
                  {attributes.title}
                </p>
                <p className="capitalize text-white absolute bottom-6 text-center">
                  {attributes.desc}
                </p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Collections;
