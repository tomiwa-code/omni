import { Link, Navigate, useParams } from "react-router-dom";
import success from "../../assets/img/success.png";
import cancel from "../../assets/img/cancel.png";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../Redux/cartSlice";
import { useEffect } from "react";

const Payment = () => {
  const paymentStatus = useParams().payment_status;

  const ProtectedRoute = ({ children }) => {
    if (paymentStatus === "success" || paymentStatus === "cancel") {
      return children;
    } else {
      return <Navigate to={"/"} />;
    }
  };

  // empty cart
  const dispatch = useDispatch();

  useEffect(() => {
    if (paymentStatus === "success") {
      dispatch(emptyCart());
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="w-full h-screen flex justify-center items-center flex-col">
        {paymentStatus === "cancel" && (
          <>
            <div className="max-w-[30%] overflow-hidden bg-primary">
              <img
                src={cancel}
                alt="cancel"
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="font-extrabold text-primary text-5xl font-raleway mt-5">
              Oops
            </h1>
            <p className="text-gray font-raleway text-lg font-semibold mt-3">
              Forgot to add something to your cart?
            </p>
            <p className="opacity-80 w-[400px] text-gray text-center mt-3">
              keep calm and explore your options we've got you covered, you're
              the reason why we are here!
            </p>

            <div className="flex space-x-5 items-center">
              <Link to={"/cart"}>
                <button className="px-6 py-4 rounded-lg border border-primary text-primary uppercase mt-5 text-center">
                  go to cart
                </button>
              </Link>
              <Link to={"/products/all"}>
                <button className="px-6 py-4 rounded-lg bg-primary text-white uppercase mt-5 text-center">
                  continue shopping
                </button>
              </Link>
            </div>
          </>
        )}

        {paymentStatus === "success" && (
          <>
            <div className="w-64 h-64 overflow-hidden bg-primary">
              <img
                src={success}
                alt="success"
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="font-extrabold text-primary text-2xl font-raleway mt-5">
              Your order has been received
            </h1>
            <p className="text-gray font-raleway text-lg font-semibold mt-1">
              Thank you for your purchase!
            </p>
            <p className="opacity-80 w-[400px] text-gray text-center mt-3">
              You'll receive a an order confirmation email with details of your
              order
            </p>
            <Link
              to="/products/all"
              className="px-6 py-4 rounded-lg bg-primary text-white uppercase mt-5 text-center"
            >
              continue shopping
            </Link>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Payment;
