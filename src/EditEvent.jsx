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
  "Other",
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
    capacity: 50,
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You're not logged in!");
      return navigate("/login");
    }

    axios
      .get(`${API}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
          capacity: event.capacity || 50,
        });
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
      setFormData((prev) => ({
        ...prev,
        [name]: name === "capacity" ? parseInt(value, 10) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.summary) errors.summary = "Summary is required";
    if (!formData.datetime) errors.datetime = "Date & time is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.overview) errors.overview = "Overview is required";
    if (!formData.images.length)
      errors.images = "At least one image is required";
    if (!formData.capacity || isNaN(formData.capacity) || formData.capacity < 1)
      errors.capacity = "Capacity must be a number above 0";

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API}/api/events/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

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

        {formErrors.images && (
          <p className="text-red-500 text-sm text-center italic">
            {formErrors.images}
          </p>
        )}

        {formData.images.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {formData.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Preview ${idx}`}
                className="w-28 h-28 object-cover rounded-xl shadow-md"
              />
            ))}
          </div>
        )}

        {"title summary location overview things_to_know"
          .split(" ")
          .map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-lg text-[#620808] font-medium mb-1"
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
              />
              {formErrors[field] && (
                <p className="text-red-500 text-sm">{formErrors[field]}</p>
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

        <div>
          <label className="block text-lg text-[#620808] font-medium mb-1">
            Max Attendees
          </label>
          <input
            type="number"
            name="capacity"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.capacity ? "border-red-500" : ""
            }`}
          />
          {formErrors.capacity && (
            <p className="text-red-500 text-sm mt-1 italic">
              {formErrors.capacity}
            </p>
          )}
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
