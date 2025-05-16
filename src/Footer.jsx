import React from "react";

function Footer() {
  return (
    <footer class="relative mt-20 bg-[#BA7F7F] px-4 pt-20">
      <div class="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-[#BA7F7F] bg-white p-2">
        <img
          class="h-full object-contain"
          src="/images/logo-circle.png"
          alt=""
        />
      </div>
      <nav
        aria-label="Footer Navigation"
        class="mx-auto mb-10 flex max-w-lg text-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <a href="#" class="font-medium text-[#dbd5c5]">
          Demo
        </a>
        <a href="#" class="font-medium text-[#dbd5c5]">
          Support
        </a>
        <a href="#" class="font-medium text-[#dbd5c5]">
          Privacy Policy
        </a>
        <a href="#" class="font-medium text-[#dbd5c5]">
          Terms & Conditions
        </a>
      </nav>
      <p
        class="py-10 text-center text-lg text-[#dbd5c5]"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        © 2025 Anastasia Kaldi | All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
