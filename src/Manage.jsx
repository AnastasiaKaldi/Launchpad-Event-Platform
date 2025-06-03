import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import noEvents from "../src/assets/noEvents.png";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/events/mine", { withCredentials: true })
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
      await axios.delete(`http://localhost:5050/api/events/${eventId}`, {
        withCredentials: true,
      });

      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete event.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-[#dbd5c5]">
      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-4">
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
          </div>

          {/* Event Content */}
          {events.length === 0 ? (
            <div
              className="text-center text-gray-500 mt-20"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              <img
                src={noEvents}
                alt="No events"
                className="mx-auto mb-4 w-20 h-20"
              />
              <p
                className="text-[#620808]"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                No events to show
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border p-4 rounded shadow bg-white"
                >
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-sm text-gray-600">
                    {new Date(event.datetime).toLocaleString()}
                  </p>
                  <p className="mt-2 text-gray-700">{event.summary}</p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button
                      onClick={() => navigate(`/edit-event/${event.id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ManageEvents;
