import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

const Search = ({ closeSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const { data } = useFetch(
    `${
      searchInput.length !== 0
        ? `/products?populate=*&[filters][title][$containsi]=${searchInput}`
        : "/products?populate=*&"
    }`
  );

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.code === "Escape") {
        closeSearch();
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  return (
    <div className="fixed inset-0 bg-secondary z-50 bg-opacity-70 backdrop-blur">
      <div className="absolute inset-0" onClick={() => closeSearch()}></div>
      <div className="rounded-xl mx-auto w-[55%] mt-20 bg-secondary min-h-[300px] relative">
        <div className="px-5 border-b border-[#777] flex items-center justify-between py-4">
          <div className="flex space-x-5 items-center text-[#777]">
            <BsSearch />
            <input
              type="text"
              placeholder="Search product"
              className="focus:outline-none w-[400px] bg-[transparent]"
              onChange={handleSearch}
              autoFocus
            />
          </div>
          <button
            className="text-[#ccc] px-2 py-1 rounded-lg bg-gray text-xs"
            onClick={() => closeSearch()}
          >
            Esc
          </button>
        </div>
        <div className="py-6">
          {data.length !== 0 && searchInput.length !== 0 ? (
            <>
              <h2 className="text-white px-6 font-bold text-xl mb-5 font-raleway">
                You search for "{searchInput}"
              </h2>
              <div className="space-y-3 h-[400px] overflow-y-auto">
                {data.map(({ id, attributes }) => (
                  <div
                    className="mx-6 p-4 bg-gray rounded-lg bg-opacity-10 hover:bg-primary hover:text-white text-[#999]"
                    key={id}
                  >
                    <Link
                      to={`/product/${id}`}
                      className="flex items-center justify-between"
                      onClick={() => closeSearch()}
                    >
                      <div className="flex items-center space-x-5">
                        <div className="overflow-hidden rounded-lg w-20 h-20">
                          <img
                            src={
                              import.meta.env.VITE_REACT_APP_UPLOAD +
                              attributes.img.data.attributes.url
                            }
                            alt={attributes.title}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <p className="text-lg capitalize font-medium">
                            {attributes.title}
                          </p>
                          <p className="text-lg">
                            NGN {attributes.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <MdOutlineKeyboardArrowRight className="text-3xl" />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : data.length === 0 && searchInput.length > 0 ? (
            <h2 className="text-white px-6 absolute top-[55%] -translate-y-[50%] w-full text-center  text-xl font-raleway">
              "No result for {searchInput}"
            </h2>
          ) : (
            <h2 className="text-white px-6 absolute top-[55%] w-full text-center -translate-y-[50%] text-xl font-raleway">
              Waiting for you to search
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
