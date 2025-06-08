import React from "react";
import footer from "../src/assets/footer.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative mt-20 bg-[#BA7F7F] px-4 pt-24 text-center">
      <div className="absolute left-1/2 -top-10 transform -translate-x-1/2">
        <div className="h-16 w-16 rounded-xl border-4 border-[#BA7F7F] bg-[#dbd5c5] p-2 flex items-center justify-center">
          <img className="h-full object-contain" src={footer} alt="Logo" />
        </div>
      </div>

      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-10 flex max-w-lg justify-center gap-10 flex-wrap text-lg"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <Link to="/support" className="font-medium text-[#dbd5c5]">
          Support
        </Link>
        <Link to="/privacy" className="font-medium text-[#dbd5c5]">
          Privacy Policy
        </Link>
        <Link to="/terms" className="font-medium text-[#dbd5c5]">
          Terms & Conditions
        </Link>
      </nav>

      <p
        className="py-10 text-lg text-[#dbd5c5]"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        © 2025 Eventino | Website by Anastasia Kaldi
      </p>
    </footer>
  );
}

export default Footer;
