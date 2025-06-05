import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
  const [joined, setJoined] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/events/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setEvent(res.data);
        const initialQuantities = {};
        res.data.tickets.forEach((_, index) => {
          initialQuantities[index] = 0;
        });
        setQuantities(initialQuantities);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        if (err.response?.status === 401) {
          setIsAuthenticated(false);
        }
      });
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

  const handleJoinEvent = async () => {
    try {
      setJoinLoading(true);
      setJoinMessage("");
      const API = import.meta.env.VITE_API_URL;
      const res = await axios.post(
        `${API}/api/events/${id}/join`,
        {},
        { withCredentials: true }
      );
      console.log("✅ Join response:", res.data);
      setJoined(true);
      setJoinMessage("You’ve joined this event! 🎉");
    } catch (err) {
      console.error("❌ Error joining event:", err);
      if (err.response?.status === 401) {
        setJoinMessage("🔐 Please [log in](/signin) to join this event.");
      } else {
        if (err.response?.status === 401) {
          setJoinMessage("🔐 Please [log in](/signin) to join this event.");
        } else {
          const msg =
            err.response?.data?.message ||
            "Something went wrong joining the event.";
          setJoinMessage(msg);
        }
      }
    } finally {
      setJoinLoading(false);
    }
  };

  if (!event) {
    return <div className="text-center p-10">Loading event details...</div>;
  }

  const isFreeEvent = event.tickets.every((t) => t.isFree);

  return (
    <div className="min-h-screen bg-[#dbd5c5] text-white py-12 font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image */}
        <div className="relative max-w-screen-lg mx-auto mb-10 rounded-xl overflow-hidden">
          <img
            src={event.images[0]}
            alt="Event banner"
            className="w-full h-[350px] sm:h-[400px] object-cover"
          />
        </div>

        {/* Title */}
        <div className="text-center space-y-4 font-serif">
          <h1 className="text-5xl font-extrabold tracking-tight text-[#620808]">
            {event.title}
          </h1>
          <p className="text-[#620808] text-lg">
            {new Date(event.datetime).toLocaleString()} | {event.location}
          </p>
        </div>

        {/* Overview */}
        <div className="mt-12 max-w-3xl mx-auto text-left space-y-4 font-serif">
          <h3 className="text-xl text-[#620808] font-semibold">
            About the Event
          </h3>
          <p className="text-[#620808] leading-relaxed text-lg">
            {event.overview}
          </p>
        </div>

        {/* Things to Know */}
        <div className="mt-8 max-w-3xl mx-auto text-left font-serif">
          <h3 className="text-xl text-[#620808] font-semibold mb-4">
            Things to Know
          </h3>
          <p className="text-[#620808] text-lg">{event.things_to_know}</p>
        </div>

        {/* Join or Checkout */}
        {isFreeEvent ? (
          <div className="mt-8 max-w-3xl mx-auto text-center font-serif">
            {joinMessage && (
              <div className="mb-4 text-[#620808] text-lg font-medium">
                {joinMessage.includes("/signin") ? (
                  <>
                    🔐 Please{" "}
                    <Link
                      to="/signin"
                      className="underline text-[#620808] hover:text-red-700"
                    >
                      log in
                    </Link>{" "}
                    to join this event.
                  </>
                ) : (
                  joinMessage
                )}
              </div>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleJoinEvent}
                disabled={joinLoading || joined}
                className={`px-6 py-3 rounded-md text-lg font-semibold transition ${
                  joined
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-[#620808] text-[#dbd5c5] hover:bg-red-800"
                }`}
              >
                {joinLoading
                  ? "Joining..."
                  : joined
                  ? "Already Joined"
                  : "Join Event"}
              </button>
            ) : (
              <p className="text-[#620808]">
                🔐 Please{" "}
                <Link to="/signin" className="underline hover:text-red-700">
                  log in
                </Link>{" "}
                to join this event.
              </p>
            )}
          </div>
        ) : (
          <div className="bg-[#2a2a2a] mt-8 max-w-3xl mx-auto p-6 rounded-lg shadow-md font-serif">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <span className="text-xl text-[#dbd5c5]">Total</span>
              <span className="text-xl font-bold text-[#dbd5c5]">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            {isAuthenticated ? (
              <button
                onClick={handleCheckout}
                className="w-full text-xl bg-[#620808] text-[#dbd5c5] py-3 rounded-md font-semibold hover:bg-red-800 transition"
              >
                Checkout
              </button>
            ) : (
              <p className="text-[#dbd5c5] text-center text-lg">
                🔐 Please{" "}
                <Link to="/signin" className="underline hover:text-red-300">
                  log in
                </Link>{" "}
                to buy tickets.
              </p>
            )}
          </div>
        )}

        {/* Tickets */}
        <div className="mt-12 max-w-3xl mx-auto font-serif">
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
      </div>
    </div>
  );
}

export default Event;
