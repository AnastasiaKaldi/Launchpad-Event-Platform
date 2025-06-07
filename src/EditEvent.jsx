import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import upload from "../src/assets/upload.png";
import org from "../src/assets/OrgEvent.webp";

const CATEGORIES = [
  "Music",
  "Nightlife",
  "Hobbies",
  "Business",
  "Food & Drink",
  "Festivals",
  "Family Events",
];

function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    datetime: "",
    location: "",
    overview: "",
    things_to_know: "",
    category: CATEGORIES[0],
    images: [],
  });

  const [formErrors, setFormErrors] = useState({});
  const [tickets, setTickets] = useState([
    { name: "", price: "", isFree: false },
  ]);

  // Fetch event data
  useEffect(() => {
    axios
      .get(`${API}/api/events/${id}`)
      .then((res) => {
        const event = res.data;
        setFormData({
          title: event.title,
          summary: event.summary,
          datetime: event.datetime,
          location: event.location,
          overview: event.overview,
          things_to_know: event.things_to_know || "",
          category: event.category || CATEGORIES[0],
          images: event.images || [],
        });
        setTickets(event.tickets || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load event:", err);
        alert("Could not load event.");
        navigate("/manage");
      });
  }, [id]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const images = await Promise.all(
        [...files].map((file) => {
          return new Promise((res) => {
            const reader = new FileReader();
            reader.onloadend = () => res(reader.result);
            reader.readAsDataURL(file);
          });
        })
      );
      setFormData((prev) => ({ ...prev, images }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTicketChange = (i, field, value) => {
    const updated = [...tickets];
    if (field === "isFree") {
      updated[i].isFree = !updated[i].isFree;
      if (updated[i].isFree) updated[i].price = "";
    } else {
      updated[i][field] = value;
    }
    setTickets(updated);
  };

  const addTicket = () => {
    setTickets([...tickets, { name: "", price: "", isFree: false }]);
  };

  const removeTicket = (i) => {
    setTickets(tickets.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.summary) errors.summary = "Summary is required";
    if (!formData.datetime) errors.datetime = "Date & time is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.overview) errors.overview = "Overview is required";
    tickets.forEach((t, idx) => {
      if (!t.name) errors[`ticket-${idx}-name`] = "Ticket name required";
      if (!t.isFree && !t.price)
        errors[`ticket-${idx}-price`] = "Ticket price required";
    });
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    try {
      await axios.put(
        `${API}/api/events/${id}`,
        {
          ...formData,
          tickets,
        },
        {
          withCredentials: true,
        }
      );

      alert("✅ Event updated!");
      navigate("/manage");
    } catch (err) {
      console.error("Error updating event:", err);
      alert("❌ Failed to update event");
    }
  };

  if (loading) return null;

  return (
    <div className="bg-[#dbd5c5] min-h-screen py-10 px-6">
      <div className="text-center mb-12 rounded-xl">
        <div className="relative max-w-7xl mx-auto">
          <img src={org} alt="Header" className="w-full h-60 object-cover" />
          <div className="absolute inset-0 bg-[#BA7F7F]/80 flex flex-col justify-center items-center text-[#dbd5c5]">
            <h1 className="text-4xl font-bold">Edit Event</h1>
            <p>Update your event details here.</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-3xl mx-auto rounded-md"
      >
        <label className="block text-center bg-[#BA7F7F] p-6 rounded-lg cursor-pointer text-[#dbd5c5]">
          <img src={upload} alt="Upload" className="mx-auto w-8 h-8" />
          Upload Images
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </label>

        {"title summary location overview things_to_know"
          .split(" ")
          .map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-lg text-[#620808] font-medium mb-1"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                {field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>
              <input
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  formErrors[field] ? "border-red-500" : ""
                }`}
                aria-invalid={!!formErrors[field]}
                aria-describedby={`error-${field}`}
              />
              {formErrors[field] && (
                <p id={`error-${field}`} className="text-red-500 text-sm">
                  {formErrors[field]}
                </p>
              )}
            </div>
          ))}

        <div>
          <label className="block text-lg text-[#620808] font-medium mb-1">
            Event Date and Time
          </label>
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.datetime ? "border-red-500" : ""
            }`}
            aria-invalid={!!formErrors.datetime}
          />
        </div>

        <div>
          <label className="block text-lg text-[#620808] font-medium mb-1">
            Event Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl text-[#620808] font-semibold">Ticket Types</h2>
          {tickets.map((ticket, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div>
                <label className="block text-sm text-[#620808] font-medium mb-1">
                  Ticket Name
                </label>
                <input
                  value={ticket.name}
                  onChange={(e) =>
                    handleTicketChange(i, "name", e.target.value)
                  }
                  className={`flex-1 p-2 border rounded ${
                    formErrors[`ticket-${i}-name`] ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#620808] mb-1">
                  Ticket Price
                </label>
                <input
                  type="number"
                  value={ticket.isFree ? "" : ticket.price}
                  onChange={(e) =>
                    handleTicketChange(i, "price", e.target.value)
                  }
                  disabled={ticket.isFree}
                  className={`w-24 p-2 border rounded ${
                    formErrors[`ticket-${i}-price`] ? "border-red-500" : ""
                  }`}
                />
              </div>
              <label className="flex items-center text-[#620808] gap-1">
                <input
                  type="checkbox"
                  checked={ticket.isFree}
                  onChange={() => handleTicketChange(i, "isFree")}
                />
                Free
              </label>
              {tickets.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTicket(i)}
                  className="text-red-600"
                >
                  🗑
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addTicket} className="text-blue-600">
            + Add Ticket
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#BA7F7F] text-white py-3 rounded hover:bg-[#a16767]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditEvent;
