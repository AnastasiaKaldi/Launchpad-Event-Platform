import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import org from "../src/assets/OrgEvent.webp";
import upload from "../src/assets/upload.png";

const CATEGORIES = [
  "Music",
  "Nightlife",
  "Hobbies",
  "Business",
  "Food & Drink",
  "Festivals",
  "Family Events",
];

function OrgEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
  const [tickets, setTickets] = useState([
    { name: "", price: "", isFree: false },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/auth/me", { withCredentials: true })
      .then((res) => {
        console.log("✅ Authenticated user:", res.data);
        setLoading(false);
      })
      .catch(() => navigate("/signin"));
  }, [navigate]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    console.log(`✏️ Changed: ${name} =`, files || value);

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
      console.log("📸 Uploaded images:", images);
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
    console.log("🎟️ Tickets updated:", updated);
    setTickets(updated);
  };

  const addTicket = () => {
    const newTickets = [...tickets, { name: "", price: "", isFree: false }];
    console.log("➕ Adding ticket:", newTickets);
    setTickets(newTickets);
  };

  const removeTicket = (i) => {
    const newTickets = tickets.filter((_, idx) => idx !== i);
    console.log(`🗑 Removing ticket at index ${i}`, newTickets);
    setTickets(newTickets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      title: formData.title || "Untitled Event",
      summary: formData.summary || "No summary provided.",
      datetime: formData.datetime || new Date().toISOString(),
      location: formData.location || "Unknown location",
      overview: formData.overview || "No overview.",
      things_to_know: formData.things_to_know || "None",
      category: formData.category || "General",
      tickets:
        tickets.length > 0
          ? tickets
          : [{ name: "General", price: "0", isFree: true }],
    };

    console.log("📤 Final payload to POST:", payload);

    try {
      const res = await axios.post(
        "http://localhost:5050/api/events",
        payload,
        {
          withCredentials: true,
        }
      );
      console.log("✅ Event creation response:", res.data);
      alert("✅ Event submitted!");
    } catch (err) {
      console.error("❌ Submission error:", err?.response?.data || err.message);
      alert("❌ Failed to submit event");
    }
  };

  if (loading) return null;

  return (
    <div className="bg-[#dbd5c5] min-h-screen py-10 px-6">
      <div className="text-center relative mb-12">
        <img
          src={org}
          alt="Header"
          className="w-full h-60 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-[#BA7F7F]/80 flex flex-col justify-center items-center text-[#dbd5c5]">
          <h1 className="text-4xl font-bold">Create an Event</h1>
          <p>Share your event with the world!</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
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

        {["title", "summary", "location", "overview", "things_to_know"].map(
          (field) => (
            <input
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              className="w-full p-2 border rounded"
            />
          )
        )}

        <input
          type="datetime-local"
          name="datetime"
          value={formData.datetime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

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

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ticket Types</h2>
          {tickets.map((ticket, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                placeholder="Ticket Name"
                value={ticket.name}
                onChange={(e) => handleTicketChange(i, "name", e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={ticket.isFree ? "" : ticket.price}
                onChange={(e) => handleTicketChange(i, "price", e.target.value)}
                disabled={ticket.isFree}
                className="w-24 p-2 border rounded"
              />
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={ticket.isFree}
                  onChange={() => handleTicketChange(i, "isFree")}
                />{" "}
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
          Publish
        </button>
      </form>
    </div>
  );
}

export default OrgEvent;
