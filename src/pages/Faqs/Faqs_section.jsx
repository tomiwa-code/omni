import { GiEarthAfricaEurope } from "react-icons/gi";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import SearchArticles from "../../components/SearchArticles";
import SideSection from "../../components/SideSection";
import useFetch from "../../hooks/useFetch";

const Faq_sections = () => {
  const faq_Section = useParams().section;
  const { data } = useFetch(
    `/faqs?populate=*&[filters][faq_categories][title]=${faq_Section}`
  );

  return (
    <div className="container mx-auto">
      <SearchArticles />
      <div className="flex mt-10 gap-6 items-start">
        <div className="flex-[2] bg-[white] rounded-lg pt-8 overflow-hidden">
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
            <p className="capitalize text-primary opacity-90 font-semibold">
              {data.length > 0 &&
                (data[0].attributes.faq_categories.data[0].attributes.title ===
                "global"
                  ? "general"
                  : data[0].attributes.faq_categories.data[0].attributes.title)}
            </p>
          </div>
          <div className="mt-10 flex items-center space-x-3 px-8 pb-10">
            {data.length > 0 && (
              <>
                {data[0].attributes.faq_categories.data[0].attributes.title ===
                "global" ? (
                  <>
                    <GiEarthAfricaEurope className="text-2xl text-gray" />
                    <h2 className="font-raleway capitalize text-2xl font-semibold">
                      general
                    </h2>
                  </>
                ) : data[0].attributes.faq_categories.data[0].attributes
                    .title === "shop" ? (
                  <>
                    <BsCart2 className="text-2xl text-gray" />
                    <h2 className="font-raleway capitalize text-2xl font-semibold">
                      shop
                    </h2>
                  </>
                ) : (
                  <>
                    <MdOutlineSettingsSuggest className="text-2xl text-gray" />
                    <h2 className="font-raleway capitalize text-2xl font-semibold">
                      technical
                    </h2>
                  </>
                )}
              </>
            )}
          </div>
          {data.map(({ id, attributes }) => (
            <Link
              to={`/faq/${attributes.link}`}
              className="space-y-3 py-6 px-8 block border-t border-white hover:bg-white"
              key={id}
            >
              <h2 className="font-medium text-xl">{attributes.title}</h2>
              <p className="text-gray opacity-80">
                {attributes.text.substring(0, 200)}...
              </p>
            </Link>
          ))}
        </div>
        <div className="flex-1">
          <SideSection />
        </div>
      </div>
    </div>
  );
};

export default Faq_sections;
