import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About/About";
import Cart from "../pages/Cart/Cart";
import Contact from "../pages/Contact/Contact";
import Discount from "../pages/Discount/Discount";
import Faq from "../pages/Faqs/Faq";
import Faqs from "../pages/Faqs/Faqs";
import Faqs_section from "../pages/Faqs/Faqs_section";
import Home from "../pages/Home/Home";
import Payment from "../pages/Payment/Payment";
import Product from "../pages/Product/Product";
import Products from "../pages/Products/Products";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:cat",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/products/discount",
        element: <Discount />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/faqs",
        element: <Faqs />,
      },
      {
        path: "/faqs/:section",
        element: <Faqs_section />,
      },
      {
        path: "/faq/:id",
        element: <Faq />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/payment/:payment_status",
    element: <Payment />,
  },
]);

export default router;
