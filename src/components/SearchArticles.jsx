import { BsSearch } from "react-icons/bs";

const SearchArticles = () => {
  return (
    <div className="relative shadow-3xl overflow-hidden rounded-xl">
      <BsSearch className="text-2xl text-gray absolute left-5 top-[50%] -translate-y-[50%]" />
      <input
        type="text"
        placeholder="Search for articles"
        className="w-full bg-[white] px-14 py-8 text-xl focus:outline-none"
      />
    </div>
  );
};

export default SearchArticles;
