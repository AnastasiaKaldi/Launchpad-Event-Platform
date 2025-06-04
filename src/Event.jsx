import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow({ onClick }) {
  return (
    <button
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black transition"
      onClick={onClick}
    >
      ▶
    </button>
  );
}

function PrevArrow({ onClick }) {
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/events/${id}`, { withCredentials: true })
      .then((res) => {
        setEvent(res.data);
        const initialQuantities = {};
        res.data.tickets.forEach((ticket, index) => {
          initialQuantities[index] = 0;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, [id]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => ({ ...prev, [index]: Number(value) }));
  };

  const calculateTotal = () => {
    if (!event) return 0;
    return event.tickets.reduce(
      (total, ticket, i) =>
        total + (parseFloat(ticket.price) || 0) * quantities[i],
      0
    );
  };

  if (!event) {
    return <div className="text-center p-10">Loading event details...</div>;
  }

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

  return (
    <div className="min-h-screen bg-[#dbd5c5] text-white px-6 py-12 font-mono">
      {/* Carousel */}
      <div className="relative max-w-screen-lg mx-auto mb-10 rounded-xl overflow-hidden">
        <Slider {...settings}>
          {event.images.map((src, index) => (
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
          {event.title}
        </h1>
        <p className="text-[#620808] text-lg">
          {new Date(event.datetime).toLocaleString()} | {event.location}
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
          {event.overview}
        </p>
      </div>

      {/* Good to Know */}
      <div
        className="mt-8 max-w-3xl mx-auto text-left"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <h3 className="text-xl text-[#620808] font-semibold mb-4">
          Things to Know
        </h3>
        <p className="text-[#620808] text-lg">{event.things_to_know}</p>
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
          {event.tickets.map((ticket, index) => (
            <div
              className="grid grid-cols-3 text-white items-center my-2"
              key={index}
            >
              <span>{ticket.name}</span>
              <span>{ticket.isFree ? "Free" : `$${ticket.price}`}</span>
              <select
                value={quantities[index]}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className="bg-[#1e1e1e] border border-gray-600 rounded px-2 py-1 text-white"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Total + Checkout */}
      <div
        className="mt-8 max-w-3xl mx-auto flex justify-between items-center border-t border-gray-700 pt-6"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <span className="text-xl text-[#620808]">Total</span>
        <span className="text-xl font-bold text-[#620808]">
          ${calculateTotal().toFixed(2)}
        </span>
      </div>
      <div
        className="mt-4 max-w-3xl mx-auto"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <button
          onClick={handleCheckout}
          className="w-full text-xl bg-[#620808] text-[#dbd5c5] py-3 rounded-md font-semibold hover:bg-red-800 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Event;
