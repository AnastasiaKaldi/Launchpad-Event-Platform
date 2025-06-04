import { useEffect, useState } from "react";
import axios from "axios";
import noEvents from "../src/assets/noEvents.png";

function JoinedEvents() {
  const [events, setEvents] = useState([]);
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    axios
      .get("https://events-backend-urw2.onrender.com/api/events/joined", {
        withCredentials: true,
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching joined events:", err));
  }, []);

  const generateGoogleCalendarLink = (event) => {
    const start = new Date(event.datetime)
      .toISOString()
      .replace(/[-:]|\.\d{3}/g, "");
    const end = new Date(
      new Date(event.datetime).getTime() + 2 * 60 * 60 * 1000
    )
      .toISOString()
      .replace(/[-:]|\.\d{3}/g, "");

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${start}/${end}`,
      details: event.summary || "",
      location: event.location || "",
    });

    return `https://www.google.com/calendar/render?${params.toString()}`;
  };

  const handleLeave = async (eventId) => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave this event?"
    );
    if (!confirmLeave) return;

    try {
      await axios.delete(
        `https://events-backend-urw2.onrender.com/api/events/${eventId}/leave`,
        {
          withCredentials: true,
        }
      );

      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (err) {
      console.error("Failed to leave event:", err);
      alert("Could not leave the event.");
    }
  };

  return (
    <div className="min-h-screen bg-[#dbd5c5] px-4 sm:px-6 pt-24 pb-12">
      {/* Mobile icons */}
      <div className="sm:hidden flex justify-center gap-6 mb-6"></div>

      <main className="ml-0 sm:ml-0 w-full px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <h1
              className="text-3xl sm:text-4xl font-bold text-[#620808]"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Events You've Joined
            </h1>
          </div>

          {events.length === 0 ? (
            <div
              className="text-center text-[#620808] mt-10"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              <img
                src={noEvents}
                alt="No events"
                className="mx-auto mb-4 w-20 h-20"
              />
              <p>You haven’t joined any events yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {events.map((event) => (
                <div key={event.id} className="bg-white shadow p-4 rounded-lg">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-sm text-gray-600 mb-1">
                    {new Date(event.datetime).toLocaleString()}
                  </p>
                  <p className="text-gray-700 mb-3">{event.summary}</p>

                  <a
                    href={generateGoogleCalendarLink(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline block mb-2"
                  >
                    📅 Add to Google Calendar
                  </a>

                  <button
                    onClick={() => handleLeave(event.id)}
                    className="text-red-600 hover:underline"
                  >
                    Leave Event
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default JoinedEvents;
