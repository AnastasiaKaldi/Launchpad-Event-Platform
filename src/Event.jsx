/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Event() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [event, setEvent] = useState(null);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const loadEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvent(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      if (err.response?.status === 401) {
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  const handleJoinEvent = async () => {
    try {
      setJoinLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/events/${id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJoined(true);

      if (res.data.isNowFull) {
        toast.success("🎉 You were the last to join! The event is now full.");
      } else {
        toast.success("🎉 You've successfully joined this event!");
      }

      await loadEvent();
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("🔐 Please log in to join this event.");
        setIsAuthenticated(false);
      } else if (
        err.response?.data?.message === "You have already joined this event."
      ) {
        toast.info("✅ You've already joined this event.");
        setJoined(true);
      } else {
        const msg =
          err.response?.data?.message ||
          "⚠️ Something went wrong joining the event.";
        toast.error(msg);
      }
    } finally {
      setJoinLoading(false);
    }
  };

  if (!event) {
    return <div className="text-center p-10">Loading event details...</div>;
  }

  return (
    <div
      className="min-h-screen bg-[#dbd5c5] text-white pt-32 py-12"
      style={{ fontFamily: "Inknut Antiqua" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative max-w-screen-lg mx-auto mb-10 rounded-xl overflow-hidden">
          <img
            src={event.images?.[0]}
            alt="Event banner"
            className="w-full h-[350px] sm:h-[400px] object-cover"
          />
          {event.status === "full" && (
            <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
              FULL
            </span>
          )}
        </div>

        {/* Title and info */}
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

        {/* Things to know */}
        <div className="mt-8 max-w-3xl mx-auto text-left font-serif">
          <h3 className="text-xl text-[#620808] font-semibold mb-4">
            Things to Know
          </h3>
          <p className="text-[#620808] text-lg">{event.things_to_know}</p>
        </div>

        {/* Join button */}
        <div className="mt-8 max-w-3xl mx-auto text-center font-serif">
          {isAuthenticated ? (
            <button
              onClick={handleJoinEvent}
              disabled={joinLoading || joined || event.status === "full"}
              className={`px-6 py-3 rounded-md text-lg font-semibold transition ${
                joined || event.status === "full"
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-[#620808] text-[#dbd5c5] hover:bg-red-800"
              }`}
            >
              {joinLoading
                ? "Joining..."
                : joined
                ? "Already Joined"
                : event.status === "full"
                ? "Event Full"
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
      </div>
    </div>
  );
}

export default Event;
