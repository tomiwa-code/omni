import { Link, useParams } from "react-router-dom";
import List from "../../components/List";
import useFetch from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { colorArr, sizerArr, styleArr } from "./filter";

const Products = () => {
  const cat = useParams().cat;
  const [range, setRange] = useState({
    minRange: 3000,
    maxRange: 25000,
  });
  const [percent, setPercent] = useState({
    leftPercent: 0,
    rightPercent: 0,
  });

  const [style, setStyle] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState({
    below: 0,
    above: 0,
  });

  // store the array coming from the map
  const styleFilter = style.map(
    (items) => `&[filters][sub_categories][title][$eq]=${items}`
  );
  const colorFilter = color.map(
    (items) => `&[filters][colors][title][$eq]=${items}`
  );
  const sizeFilter = size.map(
    (items) => `&[filters][sizes][type][$eq]=${items}`
  );

  // fetch product from the api
  const productsFetch = useFetch(
    `/products?populate=*&[filters][categories][title]=${cat}${styleFilter.join(
      ""
    )}${colorFilter.join("")}${sizeFilter.join("")}${
      price.below !== 0
        ? `&[filters][price][$lte]=${price.below}`
        : price.above !== 0
        ? `&[filters][price][$gte]=${price.above}`
        : `&[filters][price][$between]=${range.minRange}&[filters][price][$between]=${range.maxRange}`
    }&sort=createdAt:desc`
  );

  // function to handle slider price range
  const priceGap = 3000;
  const handleRange = (e) => {
    if (range.maxRange - range.minRange < priceGap) {
      setTimeout(() => {
        if (e.target.name === "minRange") {
          const subtract = parseInt(range.maxRange) - parseInt(priceGap);
          setRange((prev) => ({
            ...prev,
            minRange: subtract,
          }));
        } else {
          const add = parseInt(range.minRange) + parseInt(priceGap);
          setRange((prev) => ({
            ...prev,
            maxRange: add,
          }));
        }
      }, [100]);
    } else {
      setRange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  // calculate the percentage on load
  useEffect(() => {
    const calPercent = () => {
      const calLeftPercent = (range.minRange / 25000) * 100;
      const calRightPercent = 100 - (range.maxRange / 25000) * 100;
      setPercent({
        leftPercent: calLeftPercent.toFixed(),
        rightPercent: calRightPercent.toFixed(),
      });
    };
    if (range.maxRange - range.minRange >= priceGap) calPercent();
  }, [range.maxRange, range.minRange]);

  // function to filter by price
  const aboveRef = useRef();
  const belowRef = useRef();

  const handleCheckboxBelow = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (aboveRef.current.checked) {
      aboveRef.current.checked = false;
      setPrice((price.above = 0));
    }
    setPrice(
      isChecked
        ? { ...price, [e.target.name]: value }
        : { ...price, [e.target.name]: 0 }
    );
  };

  const handleCheckboxAbove = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (belowRef.current.checked) {
      belowRef.current.checked = false;
      setPrice((price.below = 0));
    }
    setPrice(
      isChecked
        ? { ...price, [e.target.name]: value }
        : { ...price, [e.target.name]: 0 }
    );
  };

  // function for style and color filter
  const handleChange = (e, param, param2) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    param(
      isChecked ? [...param2, value] : param2.filter((item) => item !== value)
    );
  };

  return (
    <div className="container mx-auto">
      <div className="space-x-3 flex items-center">
        <Link
          to={"/"}
          className="capitalize text-secondary opacity-80 font-medium"
        >
          home /
        </Link>
        <Link
          to={"/products/all"}
          className="capitalize text-secondary opacity-80 font-medium"
        >
          products /
        </Link>
        <p className="capitalize text-primary opacity-90 font-semibold">
          {cat === "all" ? "everything" : cat}
        </p>
      </div>
      <div className="flex mt-8 relative">
        <div className="relative">
          <div className="flex-1 sticky top-10 pr-10">
            <div className="flex item-center space-x-3 mb-6">
              <BsFilter className="text-2xl" />
              <p className="opacity-90 text-xl font-raleway font-semibold">
                Filter
              </p>
            </div>
            <div className="mt-6 space-y-3">
              <p className="font-semibold">Style</p>
              {styleArr.map(({ id, title }) => (
                <div className="flex space-x-3 items-center" key={id}>
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    value={title}
                    onChange={(e) => handleChange(e, setStyle, style)}
                  />
                  <label htmlFor="medium" className="capitalize">
                    {title}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              <p className="font-semibold">Colors</p>
              {colorArr.map(({ id, title }) => (
                <div className="flex space-x-3 items-center" key={id}>
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    value={title}
                    onChange={(e) => handleChange(e, setColor, color)}
                  />
                  <label htmlFor="medium" className="capitalize">
                    {title}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              <p className="font-semibold">Sizes</p>
              {sizerArr.map(({ id, title }) => (
                <div className="flex space-x-3 items-center" key={id}>
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    value={title}
                    onChange={(e) => handleChange(e, setSize, size)}
                  />
                  <label htmlFor="medium" className="uppercase">
                    {title}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              <p className="font-semibold">Range</p>
              <div className="flex space-x-3 items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  value={10000}
                  onChange={handleCheckboxBelow}
                  name="below"
                  ref={belowRef}
                />
                <label htmlFor="medium" className="capitalize">
                  below 10,000
                </label>
              </div>
              <div className="flex space-x-3 items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  value={10000}
                  onChange={handleCheckboxAbove}
                  name="above"
                  ref={aboveRef}
                />
                <label htmlFor="medium" className="capitalize">
                  above 10,000
                </label>
              </div>
              <div className="space-y-4">
                <div className="space-x-3 flex items-center">
                  <p>Min</p>
                  <input
                    type="number"
                    className="w-[72px] h-9 focus:outline-none text-center rounded"
                    value={range.minRange}
                    name="minRange"
                    readOnly
                  />
                  <p>-</p>
                  <p>Max</p>
                  <input
                    type="number"
                    className="w-[72px] h-9 focus:outline-none text-center rounded"
                    value={range.maxRange}
                    name="maxRange"
                    readOnly
                  />
                </div>
                <div className="relative  w-[80%]">
                  <div className="w-full h-1.5 bg-[#B8BCB5] absolute rounded overflow-hidden">
                    <div
                      className="h-full absolute bg-secondary"
                      style={{
                        left: `${percent.leftPercent}%`,
                        right: `${percent.rightPercent}%`,
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={25000}
                    value={range.minRange}
                    step={500}
                    name="minRange"
                    className="w-full min-range h-1.5 absolute appearance-none pointer-events-none bg-[transparent]"
                    onChange={handleRange}
                  />
                  <input
                    type="range"
                    min={0}
                    max={25000}
                    value={range.maxRange}
                    step={500}
                    name="maxRange"
                    className="w-full max-range h-1.5 absolute appearance-none pointer-events-none bg-[transparent]"
                    onChange={handleRange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[3]">
          <List isProduct={productsFetch} />
        </div>
      </div>
    </div>
  );
};

export default Products;
