import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  const location = useLocation();

  // Define routes where navbar should be hidden
  const noNavbarRoutes = ["/signin", "/signup", "/checkout"];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#dbd5c5]">
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}

export default App;
