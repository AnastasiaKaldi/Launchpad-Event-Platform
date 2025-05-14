import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// Custom navigation arrows
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black transition"
      onClick={onClick}
    >
      ▶
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black transition"
      onClick={onClick}
    >
      ◀
    </button>
  );
}

function Event() {
  const images = [
    "https://images.unsplash.com/photo-1504672281656-e4981d70414b?auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1542144612-1ba00456b5d3?auto=format&fit=crop&w=1170&q=80",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const eventData = {
    title: "Lil Kevo w/OG Vic",
    date: "Oct 07, 2035",
    time: "9:00 PM",
    location: "500 Terry Francois St. San Francisco, CA 94158",
    buttonLabel: "Buy Tickets",
    description: `Get ready for a night of unforgettable music, energy, and community! 
    Featuring top artists from around the world, food trucks, merchandise booths, and a vibrant crowd.`,
    images: [
      "https://images.unsplash.com/photo-1504672281656-e4981d70414b?auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1542144612-1ba00456b5d3?auto=format&fit=crop&w=1170&q=80",
    ],
    tickets: [
      { type: "Regular", price: 25.0, fee: 0.63 },
      { type: "VIP", price: 45.0, fee: 1.25 },
      { type: "Student", price: 15.0, fee: 0.4 },
    ],
    goodToKnow: [
      "🚗 On-site parking available",
      "♿ Wheelchair accessible venue",
      "🎟️ Bring a printed or digital ticket",
      "👜 Bags will be checked at entry",
      "🍔 Food and beverages available for purchase",
    ],
  };

  return (
    <div className="min-h-screen bg-[#FBE7B2] text-white px-6 py-12 font-mono">
      {/* Carousel */}
      <div className="relative max-w-screen-lg mx-auto mb-10 rounded-xl overflow-hidden">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Event slide ${index + 1}`}
                className="w-full h-80 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Event Header */}
      <div
        className="text-center space-y-4"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-[#620808]">
          Lil Kevo w/OG Vic
        </h1>
        <p className="text-[#620808] text-lg">Sun, Oct 07 | San Francisco</p>
      </div>

      {/* Time & Location */}
      <div
        className="mt-12 max-w-2xl mx-auto text-center space-y-2 border-t border-[#620808] pt-6"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <h2 className="text-[#620808] font-semibold tracking-wide text-xl">
          Time & Location
        </h2>
        <p className="text-lg text-[#620808]">Oct 07, 2035, 9:00 PM</p>
        <p className="text-[#620808] text-lg">
          500 Terry Francois St. San Francisco, CA 94158
        </p>
      </div>

      {/* Event Description */}
      <div
        className="mt-12 max-w-3xl mx-auto text-left space-y-4"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <h3 className="text-xl text-[#620808] font-semibold">
          About the Event
        </h3>
        <p className="text-[#620808] leading-relaxed text-lg">
          {eventData.description}
        </p>
      </div>

      {/* Good to Know */}
      <div
        className="mt-8 max-w-3xl mx-auto text-left"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <h3 className="text-xl text-[#620808] font-semibold mb-4">
          Good to Know
        </h3>
        <ul className="list-disc list-inside space-y-2 text-[#620808] text-lg">
          {eventData.goodToKnow.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Tickets Table */}
      <div
        className="mt-12 max-w-3xl mx-auto"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <h3 className="text-xl mb-4 text-left text-[#620808] font-semibold">
          Tickets
        </h3>
        <div className="border border-gray-400 rounded-md p-6 bg-[#2a2a2a]">
          <div className="grid grid-cols-3 text-lg font-semibold text-gray-300 mb-4 border-b border-gray-600 pb-2">
            <span>Ticket type</span>
            <span>Price</span>
            <span>Quantity</span>
          </div>
          <div className="grid grid-cols-3 text-white items-center">
            <span>Regular</span>
            <span>
              $25.00 <br />
              <span className="text-xs text-gray-400">+ $0.63 fee</span>
            </span>
            <select className="bg-[#1e1e1e] border border-gray-600 rounded px-2 py-1 text-white">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
          </div>
        </div>
      </div>

      {/* Total + Checkout */}
      <div
        className="mt-8 max-w-3xl mx-auto flex justify-between items-center border-t border-gray-700 pt-6"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <span className="text-xl text-[#620808]">Total</span>
        <span className="text-xl font-bold text-[#620808]">$0.00</span>
      </div>
      <div
        className="mt-4 max-w-3xl mx-auto"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <button
          onClick={handleCheckout}
          className="w-full text-xl bg-[#620808] text-[#FBE7B2] py-3 rounded-md font-semibold hover:bg-red-800 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Event;
