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
  "Other",
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
      .get(`${API}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
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
    if (!formData.images.length)
      errors.images = "At least one image is required";
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("✅ Event created:", res.data);
      alert("✅ Event submitted!");
      navigate("/manage");
    } catch (err) {
      console.error("Error submitting event:", err.response?.data || err);
      alert("❌ Failed to submit event");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f8ede3] to-[#eac7c7]">
        <p className="text-[#620808] text-xl animate-pulse font-semibold tracking-wide">
          Checking access...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#f5ebe0] via-[#dbd5c5] to-[#f5ebe0] min-h-screen py-10 px-6">
      <div className="text-center mt-12 mb-12 rounded-xl shadow-xl overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <img src={org} alt="Header" className="w-full h-72 object-cover" />
          <div className="absolute inset-0 bg-[#BA7F7F]/80 flex flex-col justify-center items-center text-[#fefae0]">
            <h1 className="text-5xl font-extrabold drop-shadow-lg tracking-wide">
              Host Your Own Event
            </h1>
            <p className="mt-2 text-lg italic">
              Let the world know what you're planning!
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-4xl mx-auto bg-[#f5ebe0] p-10 rounded-xl shadow-2xl"
      >
        <label className="block text-center bg-[#BA7F7F] hover:bg-[#a85f5f] transition p-6 rounded-lg cursor-pointer text-[#dbd5c5] font-medium text-lg shadow-md">
          <img src={upload} alt="Upload" className="mx-auto w-8 h-8 mb-2" />
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
                className="block text-xl text-[#620808] font-semibold mb-1"
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
                className={`w-full p-3 border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[#BA7F7F] ${
                  formErrors[field] ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!formErrors[field]}
              />
              {formErrors[field] && (
                <p className="text-red-500 text-sm mt-1 italic">
                  {formErrors[field]}
                </p>
              )}
            </div>
          ))}

        <div>
          <label
            htmlFor="datetime"
            className="block text-xl text-[#620808] font-semibold mb-1"
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
            className={`w-full p-3 border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[#BA7F7F] ${
              formErrors.datetime ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.datetime && (
            <p className="text-red-500 text-sm mt-1 italic">
              {formErrors.datetime}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-xl text-[#620808] font-semibold mb-1"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Event Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[#BA7F7F]"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="capacity"
            className="block text-xl text-[#620808] font-semibold mb-1"
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
            className={`w-full p-3 border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[#BA7F7F] ${
              formErrors.capacity ? "border-red-500" : "border-gray-300"
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
          className="w-full bg-[#BA7F7F] hover:bg-[#9f5a5a] text-white py-3 rounded-xl text-lg font-semibold tracking-wide transition shadow-lg"
        >
          🚀 Publish Event
        </button>
      </form>
    </div>
  );
}

export default OrgEvent;
