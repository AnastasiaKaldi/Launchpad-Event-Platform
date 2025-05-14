import "./App.css";
import "./index.css";
import React from "react";
import concert from "../src/assets/concert.jpg";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-[#FBE7B2] flex items-center justify-center px-4 py-20">
      <div className="bg-[#B77F77] w-[90%] rounded-md shadow-md flex flex-col md:flex-row items-center md:items-stretch">
        {/* Left side - Text */}
        <div className="w-full md:w-1/2 p-10 text-left flex items-center justify-center">
          <h1
            className="text-4xl md:text-5xl text-[#FBE7B2] leading-snug"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Sell tickets now on the leading <br />
            event ticketing platform
          </h1>
        </div>

        {/* Right side - Image */}
        <div className="w-full md:w-1/2">
          <img
            src={concert}
            alt="Concert Crowd"
            className="w-full h-full object-cover rounded-r-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
