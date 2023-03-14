import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-24 w-full bg-secondary p-20">
      <div className="flex">
        <div className="flex-1 space-y-1">
          <h2 className="font-semibold font-raleway text-white text-xl">
            Buyers
          </h2>
          <p className="text-gray">shipping and payment</p>
          <p className="text-gray">actions</p>
          <p className="text-gray">reservations of goods</p>
          <p className="text-gray">in the store</p>
          <p className="text-gray">size table</p>
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="font-semibold font-raleway text-white text-xl">
            About company
          </h2>
          <Link to={"/about"} className="capitalize text-gray block">
            about
          </Link>
          <Link to={"/products/all"} className="capitalize text-gray block">
            our stores
          </Link>
          <Link to={"/contact"} className="capitalize text-gray block">
            contact us
          </Link>
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="font-semibold font-raleway text-white text-xl">
            FAQ
          </h2>
          <Link to={"/faqs/global"} className="text-gray block">
            General
          </Link>
          <Link to={"/faqs/shop"} className="text-gray block">
            Shop
          </Link>
          <Link to={"/faqs/technical"} className="text-gray block">
            Technical
          </Link>
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="font-semibold font-raleway text-white text-xl">
            Contact communication
          </h2>
          <p className="text-gray">+234 9120749746</p>
          <p className="text-gray">+234 9058419649</p>
        </div>
      </div>
      <div className="mt-12 flex">
        <div className="flex-1 space-y-5">
          <p className="text-white opacity-90">
            Be the first to know about our discounts and promotions!
          </p>
          <form className="flex relative items-center w-[350px]">
            <input
              type="text"
              className="rounded-lg w-full px-6 py-3 focus:outline-none"
              placeholder="Enter your email"
            />
            <button className="text-2xl absolute right-6">
              <BsArrowRight />
            </button>
          </form>
          <p className="text-gray pr-8">
            By subscribing to the newsletter, you agree to the processing of
            personal data in accordance with the policy for the processing of
            personal data, and also agree to the terms of the public offer
          </p>
        </div>
        <div className="flex-1 space-y-5">
          <p className="text-gray">Follow us on social networks</p>
          <div className="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:bg-primary duration-200 bg-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              <BsInstagram />
            </a>
            <a
              href="https://tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:bg-primary duration-200 bg-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-primary hover:text-white duration-200 bg-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
