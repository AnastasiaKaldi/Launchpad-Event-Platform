import React from "react";
import footer from "../src/assets/footer.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative mt-32 bg-[#BA7F7F] px-6 pt-32 text-center shadow-inner">
      {/* Floating Logo */}
      <div className="absolute left-1/2 -top-12 transform -translate-x-1/2 drop-shadow-lg">
        <div className="h-20 w-20 rounded-2xl border-4 border-[#BA7F7F] bg-[#dbd5c5] p-2 flex items-center justify-center animate-bounce-slow hover:scale-105 transition-transform duration-300">
          <img className="h-full object-contain" src={footer} alt="Logo" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-10 flex max-w-2xl flex-wrap justify-center gap-12 text-lg"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <FooterLink to="/support" label="Support" />
        <FooterLink to="/privacy" label="Privacy Policy" />
        <FooterLink to="/terms" label="Terms & Conditions" />
      </nav>

      {/* Divider line */}
      <div className="mx-auto w-1/2 border-t border-[#dbd5c5]/50 mb-6" />

      {/* Footer Credits */}
      <p
        className="pb-12 text-sm text-[#f4eee1] tracking-wide opacity-90"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        © 2025 <span className="font-bold">Eventino</span> | Website by{" "}
        <span className="hover:underline hover:text-white transition-colors duration-200">
          Anastasia Kaldi
        </span>
      </p>
    </footer>
  );
}

function FooterLink({ to, label }) {
  return (
    <Link
      to={to}
      className="relative font-medium text-[#dbd5c5] transition duration-300 hover:text-white hover:scale-105"
    >
      {label}
      <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-white transition-all duration-300 hover:w-full" />
    </Link>
  );
}

export default Footer;
