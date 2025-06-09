/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import noEvents from "../src/assets/noEvents.png";
import fallbackImage from "../src/assets/fallbackImage.webp";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/api/events/mine`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleCreate = () => navigate("/orgevent");

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete event.");
    }
  };

  return (
    <section id="manage">
      <div className="flex flex-col sm:flex-row min-h-screen bg-[#dbd5c5]">
        <main className="w-full px-4 sm:px-6 pt-24 pb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <h1
                className="text-3xl sm:text-4xl font-bold text-[#620808] mb-2"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                Your Events
              </h1>
              <button
                onClick={handleCreate}
                className="mt-2 bg-[#c53d0b] text-[#dbd5c5] px-4 py-2 rounded hover:bg-[#a62f00] w-fit"
                style={{
                  fontFamily: "Inknut Antiqua",
                  backgroundColor: "rgba(98, 8, 8, 0.6)",
                }}
              >
                Create Event
              </button>
            </motion.div>

            {events.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-500 mt-20"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                <img
                  src={noEvents}
                  alt="No events"
                  className="mx-auto mb-4 w-20 h-20"
                />
                <p className="text-[#620808]">No events to show</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`relative border p-4 rounded shadow ${
                      event.status === "full"
                        ? "bg-gray-100 opacity-80"
                        : "bg-white"
                    }`}
                  >
                    <img
                      src={event.image_url || fallbackImage}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded mb-2 "
                    />

                    {/* FULL banner */}
                    {event.status === "full" && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                        FULL
                      </span>
                    )}

                    <h2
                      className="text-xl font-semibold text-[#620808]"
                      style={{ fontFamily: "Inknut Antiqua" }}
                    >
                      {event.title}
                    </h2>

                    {event.status === "full" && (
                      <p className="text-sm text-red-600 font-medium mt-1">
                        This event is full
                      </p>
                    )}

                    <p className="text-sm text-gray-600">
                      {new Date(event.datetime).toLocaleString()}
                    </p>
                    <p className="mt-2 text-gray-700">{event.summary}</p>
                    <div className="mt-3">
                      <div className="text-sm text-gray-600 mb-1">
                        {event.attendee_count || 0} of {event.capacity} joined
                      </div>
                      <div className="w-full bg-gray-300 h-3 rounded overflow-hidden">
                        <div
                          className={`h-3 rounded transition-all duration-300 ${
                            event.status === "full"
                              ? "bg-red-600 animate-pulse"
                              : "bg-green-600"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              ((event.attendee_count || 0) / event.capacity) *
                                100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => navigate(`/edit-event/${event.id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => handleDelete(event.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

export default ManageEvents;
