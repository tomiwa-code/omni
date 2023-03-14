import SearchArticles from "../../components/SearchArticles";
import SideSection from "../../components/SideSection";
import { Link, useParams } from "react-router-dom";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { GiEarthAfricaEurope } from "react-icons/gi";
import useFetch from "../../hooks/useFetch";

const Faq = () => {
  const faq_link = useParams().id;
  const { error, data } = useFetch(
    `/faqs?populate=*&[filters][link][$eq]=${faq_link}`
  );

  return (
    <div className="container mx-auto">
      <SearchArticles />
      <div className="flex mt-10 gap-6 items-start">
        <div className="flex-[2] bg-[white] rounded-lg pt-8 overflow-hidden min-h-[700px]">
          <div className="flex items-center space-x-3 px-8">
            <Link
              to={"/"}
              className="capitalize text-gray opacity-70 font-medium"
            >
              home /
            </Link>
            <Link
              to={"/faqs"}
              className="capitalize text-gray opacity-70 font-medium"
            >
              faqs /
            </Link>
            {data.length < 1 ? (
              ""
            ) : data[0].attributes.faq_categories.data[0].attributes.title ===
              "global" ? (
              <Link
                to={"/faqs/global"}
                className="capitalize text-gray opacity-70 font-medium flex space-x-2"
              >
                <GiEarthAfricaEurope className="text-2xl text-gray" />
                <span>general</span>
              </Link>
            ) : data[0].attributes.faq_categories.data[0].attributes.title ===
              "shop" ? (
              <Link
                to={"/faqs/shop"}
                className="capitalize text-gray opacity-70 font-medium flex space-x-2"
              >
                <BsCart2 className="text-2xl text-gray" />
                <span>shop</span>
              </Link>
            ) : (
              <Link
                to={`/faqs/technical}`}
                className="capitalize text-gray opacity-70 font-medium flex space-x-2"
              >
                <MdOutlineSettingsSuggest className="text-2xl text-gray" />
                <span>technical</span>
              </Link>
            )}
          </div>
          <div className="mt-10 px-8 pb-10">
            {data.length > 0 && (
              <h2 className="font-raleway text-2xl capitalize font-semibold">
                {data[0].attributes.title}
              </h2>
            )}
            <p className="capitalize text-sm mt-5 text-gray opacity-70">
              last updated: 24d
            </p>
            {data.length > 0 && (
              <pre className="mt-6 text-justify">{data[0].attributes.text}</pre>
            )}
          </div>
        </div>
        <div className="flex-1">
          <SideSection />
        </div>
      </div>
    </div>
  );
};

export default Faq;
