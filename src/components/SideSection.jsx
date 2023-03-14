import { MdOutlineSettingsSuggest } from "react-icons/md";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";


const SideSection = () => {
  return (
    <>
      <div className="w-full bg-[white] rounded-lg overflow-hidden">
        <p className="font-raleway font-semibold text-xl px-5 pt-8 pb-5">
          Trending products
        </p>
        {[0, 1, 2, 3].map((items) => (
          <Link
            to={"/product/iif"}
            className="px-5 py-6 border-t border-white hover:bg-white flex items-center space-x-3"
            key={items}
          >
            <div className="w-16 h-16 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1674396661451-83686947efdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="font-semibold ">Manly T-shirt</p>
              <p className="font-semibold ">4500.00</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full bg-[white] rounded-lg overflow-hidden mt-10">
        <p className="font-raleway font-semibold text-xl px-5 pt-8 pb-5">
          Sections
        </p>
        <Link
          to={"/"}
          className="px-5 py-6 border-t border-white hover:bg-white flex space-x-3 items-center text-xl"
        >
          <BsCart2 />
          <span>Shop</span>
        </Link>
        <Link
          to={"/"}
          className="px-5 py-6 border-t border-white hover:bg-white flex space-x-3 items-center text-xl"
        >
          <GiEarthAfricaEurope />
          <span>Global</span>
        </Link>
        <Link
          to={"/"}
          className="px-5 py-6 border-t border-white hover:bg-white flex space-x-3 items-center text-xl"
        >
          <MdOutlineSettingsSuggest />
          <span>Technical</span>
        </Link>
      </div>
    </>
  );
};

export default SideSection;
