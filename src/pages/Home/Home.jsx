import HeroImg from "../../assets/img/hero.png";
import { TbTruckDelivery } from "react-icons/tb";
import { TbHanger } from "react-icons/tb";
import { TbTruckReturn } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import List from "../../components/List";
import Collections from "../../components/Collections";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const [cat, setCat] = useState("women");

  const newProducts = useFetch(
    `/products?populate=*&[filters][type][$eq]=isNew&[filters][categories][title][$eq]=${cat}&pagination[limit]=4&sort=createdAt:desc`
  );

  const discountProducts = useFetch(
    `/products?populate=*&[filters][type][$eq]=discount&pagination[limit]=4&sort=createdAt:desc`
  );

  const collectionCat = useFetch(
    `/categories?populate=*&[filters][title][$eq]=women&[filters][title][$eq]=children&[filters][title][$eq]=couples`
  );

  return (
    <div className="container mx-auto">
      {/* Hero  */}
      <div className="rounded-2xl w-full h-[500px] bg-[#eaeaea] flex">
        <div className="flex-1">
          <div className="relative flex items-center justify-center mt-[32px]">
            <img
              src={HeroImg}
              alt="heroImg"
              className="w-[60%] h-[60%] object-cover"
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center flex-col space-y-6">
          <h2 className="font-semibold text-9xl">-50</h2>
          <p className="font-raleway font-bold text-5xl">
            Collection discounts
          </p>
          <p className="font-semibold text-4xl">COZY STYLE</p>
          <Link to={'/products/discount'} className="bg-primary text-white w-[350px] text-center py-5 rounded-3xl font-raleway font-bold text-2xl">
            Go to catalog
          </Link>
        </div>
      </div>

      {/* offers  */}
      <div className="flex space-x-2 mt-28">
        <div className="flex-1 space-y-5">
          <div className="w-[100px] h-[100px] bg-secondary rounded-full mx-auto flex items-center justify-center">
            <TbTruckDelivery className="text-5xl text-white" />
          </div>
          <p className="text-center font-medium">
            Free delivery from 40 BYN all over Belarus
          </p>
        </div>
        <div className="flex-1 space-y-5">
          <div className="w-[100px] h-[100px] bg-secondary rounded-full mx-auto flex items-center justify-center">
            <BsBoxSeam className="text-5xl text-white" />
          </div>
          <p className="text-center font-medium">
            Payment upon receipt of goods
          </p>
        </div>
        <div className="flex-1 space-y-5">
          <div className="w-[100px] h-[100px] bg-secondary rounded-full mx-auto flex items-center justify-center">
            <TbHanger className="text-5xl text-white" />
          </div>
          <p className="text-center font-medium">
            Sample product before purchase
          </p>
        </div>
        <div className="flex-1 space-y-5">
          <div className="w-[100px] h-[100px] bg-secondary rounded-full mx-auto flex items-center justify-center">
            <TbTruckReturn className="text-5xl text-white" />
          </div>
          <p className="text-center font-medium">
            The possibility of returning the goods within 14 days.
          </p>
        </div>
      </div>

      {/* New  */}
      <div className="mt-28">
        <h2 className="font-raleway font-bold text-center text-3xl mb-12">
          New
        </h2>
        <div className="space-x-8 flex mb-6 h-[30px]">
          <p
            className={`font-semibold duration-75 cursor-pointer ${
              cat === "women" ? "border-b-[3px] border-secondary" : ""
            }`}
            onClick={() => setCat("women")}
          >
            Women
          </p>
          <p
            className={`font-semibold duration-75 cursor-pointer ${
              cat === "men" ? "border-b-[3px] border-secondary" : ""
            }`}
            onClick={() => setCat("men")}
          >
            Men
          </p>
          <p
            className={`font-semibold duration-75 cursor-pointer ${
              cat === "children" ? "border-b-[3px] border-secondary" : ""
            }`}
            onClick={() => setCat("children")}
          >
            Children
          </p>
        </div>
        {/* List  */}
        <List gridQuad={true} isProduct={newProducts} />
        <div className="flex space-x-5 mt-10 items-center justify-end">
          <Link to={`/products/${cat}`}>See more news</Link>
          <BsArrowRight className="text-2xl" />
        </div>
      </div>

      {/* Collection  */}
      <div className="mt-28">
        <h2 className="font-raleway font-bold text-center text-3xl mb-12">
          Collections
        </h2>
        <Collections className="mt-12" category={collectionCat} />
        <div className="flex space-x-5 mt-10 items-center justify-end">
          <Link to={`/products/all`}>All in collections</Link>
          <BsArrowRight className="text-2xl" />
        </div>
      </div>

      {/* Discount  */}
      <div className="h-[300px] rounded-2xl flex items-center relative overflow-hidden justify-center mt-20 discount before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.5)] before:z-10">
        <p className="text-white text-5xl font-raleway text-center font-bold relative z-20">
          Discount on first order <br /> <span>-15%</span>
        </p>
      </div>

      <div className="mt-28">
        <h2 className="font-raleway font-bold text-center text-3xl mb-12">
          Discount
        </h2>
        {/* List  */}
        <List gridQuad={true} isProduct={discountProducts} />
        <div className="flex space-x-5 mt-10 items-center justify-end">
          <Link to={`/products/discount`}>See all discounts</Link>
          <BsArrowRight className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Home;
