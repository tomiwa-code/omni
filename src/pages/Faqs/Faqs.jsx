import {
  BsCart2,
  BsInstagram,
  BsPhone,
  BsSearch,
  BsWhatsapp,
} from "react-icons/bs";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { MdKeyboardArrowRight, MdOutlineSettingsSuggest } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Faqs = () => {
  const popular = useFetch(
    "/faqs?populate=*&[filters][type][$eq]=popular&[pagination][limit]=6"
  );
  const global = useFetch(
    "/faqs?populate=*&[filters][faq_categories][title][$eq]=global&[pagination][limit]=3"
  );
  const shop = useFetch(
    "/faqs?populate=*&[filters][faq_categories][title][$eq]=shop&[pagination][limit]=3"
  );
  const technical = useFetch(
    "/faqs?populate=*&[filters][faq_categories][title][$eq]=technical&[pagination][limit]=3"
  );

  return (
    <div className="container mx-auto">
      <div className="rounded-2xl w-full h-[500px] bg-[#eaeaea] flex faqs relative before:inset-0 before:absolute before:bg-[rgba(0,0,0,0.42)] before:rounded-2xl">
        <h2 className="uppercase absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] text-white opacity-[0.03] text-[140px] font-raleway font-extrabold">
          faq
        </h2>
        <div className="space-y-5 absolute -bottom-8 left-[50%] -translate-x-[50%]">
          <h2 className="text-white text-4xl font-bold font-raleway text-center">
            Hello, how can we be of help to you?
          </h2>
          <div className="relative w-[800px]">
            <BsSearch className="text-xl text-gray absolute left-4 top-[50%] -translate-y-[50%]" />
            <input
              type="text"
              placeholder="Search for articles"
              className="rounded-lg bg-[white] text-lg shadow-3xl px-12 py-6 w-full focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-2xl font-raleway font-semibold">
          Popular articles
        </h2>
        {popular.error ? (
          <div className="text-center w-full absolute">
            <p className="font-bold font-raleway text-xl">
              "Sorry an error ocurred! kindly reload the page"
            </p>
          </div>
        ) : popular.isLoading ? (
          <Skeleton className="w-full h-[400px] rounded-lg" />
        ) : (
          <div className="mt-10 rounded-xl relative bg-[white] grid grid-cols-3 shadow-3xl overflow-hidden">
            {popular.data.map(({ id, attributes }) => (
              <Link
                to={`/faq/${attributes.link}`}
                className=" h-[200px] px-10 py-10 border-r border-b border-white"
                key={id}
              >
                <div className="space-x-2 flex items-center">
                  {attributes.faq_categories.data[0].attributes.title ===
                  "shop" ? (
                    <BsCart2 className="text-xl text-gray" />
                  ) : attributes.faq_categories.data[0].attributes.title ===
                    "technical" ? (
                    <MdOutlineSettingsSuggest className="text-xl text-gray" />
                  ) : (
                    <GiEarthAfricaEurope className="text-xl text-gray" />
                  )}

                  <p className="text-gray font-light opacity-70 capitalize">
                    {attributes.faq_categories.data[0].attributes.title}
                  </p>
                </div>
                <p className="text-xl font-semibold mt-5">{attributes.title}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mt-24">
        <h2 className="text-2xl font-raleway font-semibold">Browse articles</h2>
        <div className="flex gap-8 mt-10">
          <div className="flex-1 shadow-3xl bg-[white] rounded-lg">
            <div className="flex space-x-2 items-center w-full py-6 px-5 border-b border-white">
              <GiEarthAfricaEurope className="text-2xl text-primary" />
              <h2 className="text-xl font-semibold">General</h2>
            </div>
            {global.isLoading ? (
              <Skeleton className="w-full py-3 mx-5" count={3} />
            ) : (
              global.data.map(({ id, attributes }) => (
                <div
                  className="px-5 py-4 flex items-center justify-between border-b border-white"
                  key={id}
                >
                  <Link to={`/faq/${attributes.link}`} className="block">
                    {attributes.title}
                  </Link>
                  <span>
                    <MdKeyboardArrowRight className="text-3xl text-gray opacity-80" />
                  </span>
                </div>
              ))
            )}
            {global.data !== 0 && (
              <Link
                to={`/faqs/global`}
                className="flex items-center justify-end space-x-2 px-5 pt-4 pb-8"
              >
                <span className="text-primary">More</span>
                <MdKeyboardArrowRight className="text-3xl text-gray opacity-80" />
              </Link>
            )}
          </div>

          {/* Shop  */}
          <div className="flex-1 shadow-3xl bg-[white] rounded-lg">
            <div className="flex space-x-2 items-center w-full py-6 px-5 border-b border-white">
              <BsCart2 className="text-2xl text-primary" />
              <h2 className="text-xl font-semibold">Shop</h2>
            </div>
            {shop.data.isLoading ? (
              <Skeleton className="w-full py-3 mx-5" count={3} />
            ) : (
              shop.data.map(({ id, attributes }) => (
                <div
                  className="px-5 py-4 flex items-center justify-between border-b border-white"
                  key={id}
                >
                  <Link to={`/faq/${attributes.link}`} className="block">
                    {attributes.title}
                  </Link>
                  <span>
                    <MdKeyboardArrowRight className="text-3xl text-gray opacity-80" />
                  </span>
                </div>
              ))
            )}
            {shop.data !== 0 && (
              <Link
                to={`/faqs/shop`}
                className="flex items-center justify-end space-x-2 px-5 pt-4 pb-8"
              >
                <span className="text-primary">More</span>
                <MdKeyboardArrowRight className="text-3xl text-gray opacity-80" />
              </Link>
            )}
          </div>

          {/* Technical  */}
          <div className="flex-1 shadow-3xl bg-[white] rounded-lg">
            <div className="flex space-x-2 items-center w-full py-6 px-5 border-b border-white">
              <MdOutlineSettingsSuggest className="text-2xl text-primary" />
              <h2 className="text-xl font-semibold">Technical</h2>
            </div>
            {technical.data.isLoading ? (
              <Skeleton className="w-full py-3 mx-5" count={3} />
            ) : (
              technical.data.map(({ id, attributes }) => (
                <div
                  className="px-5 py-4 flex items-center justify-between border-b border-white"
                  key={id}
                >
                  <Link to={`/faq/${attributes.link}`} className="block">
                    {attributes.title}
                  </Link>
                  <span>
                    <MdKeyboardArrowRight className="text-3xl text-gray opacity-80" />
                  </span>
                </div>
              ))
            )}
            {technical.data.length !== 0 && (
              <Link
                to={`/faqs/technical`}
                className="flex items-center justify-end space-x-2 px-5 pt-4 pb-8"
              >
                <span className="text-primary">More</span>
                <MdKeyboardArrowRight className="text-3xl text-gray opacity-80" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mt-24">
        <h2 className="text-center font-raleway font-semibold text-3xl">
          Need to talk with us?
        </h2>
        <div className="mt-10 flex justify-center space-x-8 items center">
          <div className="bg-secondary text-[white] hover:bg-white hover:text-secondary duration-150 p-3 rounded-full">
            <a href="www.whatsapp.com">
              <BsWhatsapp className="text-3xl" />
            </a>
          </div>
          <div className="bg-secondary text-[white] hover:bg-white hover:text-secondary duration-150 p-3 rounded-full">
            <a href="www.instagram.com">
              <BsInstagram className="text-3xl" />
            </a>
          </div>
          <div className="bg-secondary text-[white] hover:bg-white hover:text-secondary duration-150 p-3 rounded-full">
            <a href="www.instagram.com">
              <BsPhone className="text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
