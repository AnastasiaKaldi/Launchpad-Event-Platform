import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const noNavbarRoutes = ["/signin", "/signup", "/checkout"];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#dbd5c5]">
      {!hideNavbar && <Navbar />}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Outlet />
    </div>
  );
}

export default App;
