import { BsArrowLeft } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import emptyCartImg from "../../Assets/img/empty-cart.png";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, removeFromCart } from "../../Redux/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../makeRequest";
import { useState } from "react";

const Cart = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const cartProducts = useSelector((state) => state.products);
  const stripePromise = loadStripe(
    import.meta.env.VITE_REACT_APP_STRIPE_PUB_KEY
  );

  // calculate total price of all cart product
  const total = () => {
    let totalPrice = 0;
    cartProducts.forEach((items) => {
      totalPrice += items.totalPrice;
    });
    return totalPrice;
  };
  const dispatch = useDispatch();
  // delete a product from cart
  const handleDelete = (param) => {
    dispatch(removeFromCart(param));
  };
  // empty cart
  const handleRemoveAll = () => {
    dispatch(emptyCart());
  };

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products: cartProducts,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setIsProcessing(false);
  };

  return (
    <div className="w-full container mx-auto">
      {cartProducts.length > 0 ? (
        <>
          <div className="w-full flex items-center justify-between">
            <Link to={`/products/all`} className="flex-1">
              <BsArrowLeft className="text-2xl cursor-pointer text-gray" />
            </Link>
            <div className="capitalize flex-1 text-xl font-bold text-center">
              shopping cart
            </div>
            <button
              className="text-[red] flex-1 font-semibold text-right"
              onClick={handleRemoveAll}
            >
              Remove all
            </button>
          </div>
          <div className="mt-8 space-y-10">
            {cartProducts.map(
              ({ id, title, desc, price, quantity, color, size, img }) => {
                return (
                  <div className="flex items-center" key={id}>
                    <div className="flex-1">
                      <div className="w-[200px] h-[200px] overflow-hidden">
                        <img
                          src={import.meta.env.VITE_REACT_APP_UPLOAD + img}
                          alt="empty cart"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h2 className="font-bold text-2xl">{title}</h2>
                      <p className="text-sm opacity-70 font-medium">
                        {desc.substring(0, 120)}
                      </p>
                      <p className="font-medium text-gray capitalize">
                        <span className="text-secondary font-semibold">
                          Size:
                        </span>{" "}
                        {size}
                      </p>
                      <p className="font-medium text-gray capitalize">
                        <span className="text-secondary font-semibold">
                          Color:
                        </span>{" "}
                        {color}
                      </p>
                      <p className="font-bold text-primary">
                        {quantity} X NGN {price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex-1 flex items-center justify-end">
                      <button onClick={() => handleDelete(id)}>
                        <FaTimes className="text-[red] text-2xl" />
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="sticky bottom-0 bg-white py-8 space-y-10">
            <div className="w-full text-center">
              <h2 className="text-3xl font-bold font-raleway">
                Total Price: NGN {total().toFixed(2)}
              </h2>
            </div>
            <div className="w-full text-center">
              <button
                className={`w-[250px] ${
                  isProcessing
                    ? "bg-[#745de7] pointer-events-none cursor-not-allowed"
                    : "bg-primary"
                }  py-5 rounded-full text-white text-lg pointer-events-auto`}
                onClick={handleCheckout}
              >
                {isProcessing ? "Processing..." : "Proceed to checkout"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex items-center justify-center flex-col">
          <img src={emptyCartImg} alt="cart" className="max-w-[60%]" />
          <div className="my-5 space-y-4">
            <p className="text-2xl text-primary font-bold capitalize text-center">
              your cart is empty
            </p>
            <p className="text-sm opacity-70 font-bold">
              Looks like you haven't added anything to your cart yet
            </p>
          </div>
          <Link
            to={`/products/cat`}
            className="rounded-lg w-[150px] py-4 text-white bg-primary text-center"
          >
            Go shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
