/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { motion } from "framer-motion";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#620808]/80 backdrop-blur-md shadow-md"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-black text-[#dbd5c5] hover:text-[#FFE9C1]"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          <motion.span
            whileHover={{ scale: 1.05, rotate: [0, 1.5, -1.5, 0] }}
            transition={{ duration: 0.4 }}
          >
            Eventino
          </motion.span>
        </Link>

        {/* Mobile toggle */}
        <input type="checkbox" className="peer hidden" id="navbar-toggle" />
        <label
          htmlFor="navbar-toggle"
          className="ml-auto block cursor-pointer md:hidden"
        >
          <svg
            className="h-6 w-6 text-[#dbd5c5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>

        {/* Nav Links */}
        <nav className="absolute peer-checked:top-full peer-checked:opacity-100 peer-checked:pointer-events-auto top-[-400px] left-0 w-full bg-[#620808]/95 text-center transition-all duration-500 ease-in-out opacity-0 pointer-events-none md:static md:opacity-100 md:pointer-events-auto md:w-auto md:bg-transparent">
          <ul className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-0 md:gap-10">
            <li>
              <Link
                to={{ pathname: "/", hash: "#events" }}
                className="text-[#dbd5c5] hover:text-[#FFE9C1]"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                Events
              </Link>
            </li>

            {user?.role === "staff" && (
              <li>
                <Link
                  to="/manage"
                  className="text-[#dbd5c5] hover:text-[#FFE9C1]"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Dashboard
                </Link>
              </li>
            )}

            {user?.role === "user" && (
              <li>
                <Link
                  to="/myevents"
                  className="text-[#dbd5c5] hover:text-[#FFE9C1]"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  My Events
                </Link>
              </li>
            )}

            {!user ? (
              <li>
                <Link to="/signin">
                  <button
                    className="rounded-md border-2 border-[#dbd5c5] px-5 py-1 text-[#dbd5c5] hover:bg-[#FFE9C1] hover:text-[#1d1c1c] transition"
                    style={{ fontFamily: "Inknut Antiqua" }}
                  >
                    Log in
                  </button>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 px-4 py-1 border-2 border-[#dbd5c5] rounded-md text-[#dbd5c5] hover:bg-[#FFE9C1] hover:text-[#1d1c1c]"
                    style={{ fontFamily: "Inknut Antiqua" }}
                  >
                    <FaUserCircle className="text-xl" />
                    <span>Welcome, {user.first_name}</span>
                  </motion.div>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    title="Log out"
                    className="p-2 rounded-full bg-white hover:scale-105 transition"
                  >
                    <IoLogOut className="text-2xl text-[#620808]" />
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default Navbar;
