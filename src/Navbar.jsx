import "./App.css";
import "./index.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div
        className="relative flex w-full flex-col overflow-hidden px-4 py-2 md:flex-row md:items-center"
        style={{ backgroundColor: "rgba(98, 8, 8, 0.6)" }} // semi-transparent
      >
        <a
          href="#"
          className="flex items-center whitespace-nowrap text-4xl font-black ml-8"
        >
          <span
            className="text-[#dbd5c5]"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            the future
          </span>
        </a>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-7 cursor-pointer md:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
        <nav
          aria-label="Header Navigation"
          className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li className="md:mr-12">
              <a
                className="text-[#dbd5c5] hover:text-[#a79066]"
                style={{ fontFamily: "Inknut Antiqua" }}
                href="#"
              >
                Pricing
              </a>
            </li>
            <li className="md:mr-12">
              <a
                className="text-[#dbd5c5] hover:text-[#a79066]"
                style={{ fontFamily: "Inknut Antiqua" }}
                href="#"
              >
                Features
              </a>
            </li>
            <li className="md:mr-12">
              <a
                className="text-[#dbd5c5] hover:text-[#a79066]"
                style={{ fontFamily: "Inknut Antiqua" }}
                href="#"
              >
                Support
              </a>
            </li>
            <li className="md:mr-4">
              <Link to="/signin">
                <button
                  className="rounded-md border-2 border-[#dbd5c5] px-6 py-1 font-medium text-[#dbd5c5] transition-colors hover:bg-[#FFE9C1] hover:text-[#a79066]"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Log in
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
