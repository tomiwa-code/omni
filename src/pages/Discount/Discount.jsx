import List from "../../components/List";
import useFetch from "../../hooks/useFetch";

const Discount = () => {
  const isProducts = useFetch(
    "/products?populate=*&[filters][type][$eq]=discount"
  );

  return (
    <div className="container mx-auto">
      <List gridQuad={true} isProduct={isProducts} />
    </div>
  );
};

export default Discount;
