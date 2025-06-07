/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import noEvents from "../src/assets/noEvents.png";

function JoinedEvents() {
  const [events, setEvents] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/events/joined`, { withCredentials: true })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching joined events:", err));
  }, []);

  const handleLeave = async (eventId) => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave this event?"
    );
    if (!confirmLeave) return;

    try {
      await axios.delete(`${API}/api/events/${eventId}/leave`, {
        withCredentials: true,
      });
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (err) {
      console.error("Failed to leave event:", err);
      alert("Could not leave the event.");
    }
  };

  const generateGoogleCalendarLink = (event) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.summary || "No description");
    const location = encodeURIComponent(event.location || "Online");

    const startDate = new Date(event.datetime);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const formatDate = (date) =>
      date
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "")
        .slice(0, 15) + "Z";

    const start = formatDate(startDate);
    const end = formatDate(endDate);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  return (
    <section
      id="joined-events"
      className="min-h-screen px-6 pt-28 pb-12 bg-gradient-to-br from-pink-50 via-white to-pink-100"
    >
      <div className="mb-10 text-center">
        <h2
          className="text-4xl font-extrabold text-[#620808]"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          Events You’ve Joined
        </h2>
      </div>

      {events.length === 0 ? (
        <div
          className="flex flex-col items-center mt-20 text-[#620808]"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          <img src={noEvents} alt="No events" className="w-28 h-28 mb-4" />
          <p className="text-xl">You haven’t joined any events yet.</p>
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-lg overflow-hidden shadow-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-2xl transition duration-300 hover:scale-[1.02]"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={event.image_url || event.images?.[0] || noEvents}
                  alt={event.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-5 space-y-3">
                <span className="text-sm text-gray-500 block">
                  {new Date(event.datetime).toLocaleDateString()}
                </span>
                <h3
                  className="text-xl font-bold text-[#620808]"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  {event.title}
                </h3>
                <p
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  {event.summary || "No description provided."}
                </p>
                <button
                  onClick={() => handleLeave(event.id)}
                  className="inline-block mt-2 text-red-500 hover:text-red-700 text-sm font-medium transition"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Leave Event
                </button>
                <a
                  href={generateGoogleCalendarLink(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Add to Google Calendar
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

export default JoinedEvents;
