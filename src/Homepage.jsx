import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import slide1 from "../src/assets/concert.jpg";
import slide2 from "../src/assets/family.jpg";
import slide3 from "../src/assets/restaurant.jpg";

const slides = [
  {
    image: slide1,
    headline: "Find the Best Concerts in Town",
    link: "#events",
  },
  {
    image: slide2,
    headline: "Your ticket to unforgettable memories",
    link: "#events",
  },
  {
    image: slide3,
    headline: "Eat your way through the Night",
    link: "#events",
  },
];

const Homepage = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#dbd5c5]">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-screen object-cover"
          />
        </div>
      ))}

      {/* Overlay: always visible */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.h2
          key={slides[current].headline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="text-4xl md:text-5xl text-[#dbd5c5] font-bold mb-6"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          {slides[current].headline}
        </motion.h2>

        <a href={slides[current].link}>
          <button
            className="bg-[#B77F77] hover:bg-[#a06a6a] text-[#dbd5c5] px-6 py-3 text-lg font-semibold rounded shadow transition duration-300"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Explore Events
          </button>
        </a>
      </div>
    </div>
  );
};

export default Homepage;
