import { BsSearch } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import logoIcon from "../assets/svg/logoIcon.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import Search from "./Search";
import { useState } from "react";

const Navbar = () => {
  const cartQuantity = useSelector((state) => state.products);
  const [showSearch, setShowSearch] = useState(false);

  const handleShowSearch = () => {
    setShowSearch(true);
    document.body.style.overflow = "hidden";
  };

  const closeSearch = () => {
    setShowSearch(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {showSearch && <Search closeSearch={closeSearch} />}
      <div className="container mx-auto py-8 mb-4 relative">
        <div className="border-b border-gray flex items-center pb-6">
          {/* search icon  */}
          <div className="flex-1">
            <BsSearch
              className="text-xl cursor-pointer"
              onClick={handleShowSearch}
            />
          </div>
          {/* brand name  */}
          <div className="space-x-3 flex items-center flex-1">
            <img src={logoIcon} alt="icon" />
            <Link
              to={"/"}
              className="uppercase font-raleway text-2xl font-bold"
            >
              omni
            </Link>
            <img src={logoIcon} alt="icon" />
          </div>
          {/* more info  */}
          <div className="flex items-center space-x-5">
            {/* shopping  */}
            <Link to={"/cart"} className="flex space-x-3 flex-1 items-center">
              <div className="relative">
                <HiOutlineShoppingBag className="text-xl" />
                <span className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-primary absolute -top-2 -right-2 text-white">
                  {cartQuantity.length}
                </span>
              </div>
              <p to={"cart"} className="text-lg">
                Shopping
              </p>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-8 justify-center mt-8">
          <li className="list-none font-medium">
            <Link to={"/products/women"}>Women</Link>
          </li>
          <li className="list-none font-medium">
            <Link to={"/products/men"}>Men</Link>
          </li>
          <li className="list-none font-medium">
            <Link to={"/products/children"}>Children</Link>
          </li>
          <li className="list-none font-medium">
            <Link to={"/products/couples"}>Couples</Link>
          </li>
          <li className="list-none font-medium">
            <Link to={"/products/all"}>Everything</Link>
          </li>
        </div>
      </div>
    </>
  );
};

export default Navbar;
