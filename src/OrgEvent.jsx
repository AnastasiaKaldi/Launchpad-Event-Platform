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
  const [formErrors, setFormErrors] = useState({});
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

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;
    axios
      .get(`${API}/api/auth/me`, { withCredentials: true })
      .then((res) => {
        if (res.data.role !== "staff") {
          alert("🚫 You are not authorized to access this page.");
          return navigate("/");
        }
        setLoading(false);
      })
      .catch(() => navigate("/signin"));
  }, [navigate]);

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
    if (!formData.capacity || isNaN(formData.capacity) || formData.capacity < 1)
      errors.capacity = "Capacity must be a number above 0";

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const payload = { ...formData };

    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API}/api/events`, payload, {
        withCredentials: true,
      });
      console.log("✅ Event created:", res.data);
      alert("✅ Event submitted!");
      navigate("/manage");
    } catch (err) {
      console.error("Error submitting event:", err.response?.data || err);
      alert("❌ Failed to submit event");
    }
  };

  if (loading) return null;

  return (
    <div className="bg-[#dbd5c5] min-h-screen py-10 px-6">
      <div className="text-center mb-12 rounded-xl">
        <div className="relative max-w-7xl mx-auto ">
          <img src={org} alt="Header" className="w-full h-60 object-cover" />
          <div className="absolute inset-0 bg-[#BA7F7F]/80 flex flex-col justify-center items-center text-[#dbd5c5]">
            <h1 className="text-4xl font-bold">Create an Event</h1>
            <p>Share your event with the world!</p>
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
              />
              {formErrors[field] && (
                <p className="text-red-500 text-sm">{formErrors[field]}</p>
              )}
            </div>
          ))}

        <div>
          <label
            htmlFor="datetime"
            className="block text-lg text-[#620808] font-medium mb-1"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Event Date and Time
          </label>
          <input
            type="datetime-local"
            id="datetime"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.datetime ? "border-red-500" : ""
            }`}
          />
          {formErrors.datetime && (
            <p className="text-red-500 text-sm">{formErrors.datetime}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-lg text-[#620808] font-medium mb-1"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Event Category
          </label>
          <select
            id="category"
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
          <label
            htmlFor="capacity"
            className="block text-lg text-[#620808] font-medium mb-1"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Max Attendees
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.capacity ? "border-red-500" : ""
            }`}
          />
          {formErrors.capacity && (
            <p className="text-red-500 text-sm">{formErrors.capacity}</p>
          )}
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
