import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";


const Layout = () => {
    return (
      <div className="bg-white">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

export default Layout