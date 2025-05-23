import React, { useState } from "react";
import org from "../src/assets/OrgEvent.webp";
import upload from "../src/assets/upload.png";

function OrgEvent() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    dateTime: "",
    location: "",
    overview: "",
    images: [],
  });

  const [tickets, setTickets] = useState([
    { name: "", price: "", isFree: false },
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handleTicketChange = (index, field, value) => {
    const newTickets = [...tickets];
    newTickets[index][field] =
      field === "isFree" ? !newTickets[index].isFree : value;
    if (field === "isFree" && newTickets[index].isFree) {
      newTickets[index].price = "";
    }
    setTickets(newTickets);
  };

  const addTicket = () => {
    setTickets([...tickets, { name: "", price: "", isFree: false }]);
  };

  const removeTicket = (index) => {
    const newTickets = [...tickets];
    newTickets.splice(index, 1);
    setTickets(newTickets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, tickets }); // Replace with real submission
  };

  return (
    <div className="w-screen bg-[#dbd5c5] min-h-screen py-16 px-4">
      {/* Header */}
      <div className="relative mx-auto mb-20 max-w-screen-lg overflow-hidden rounded-xl py-20 text-center text-white shadow-xl">
        <img
          src={org}
          alt="Event Banner"
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-[#BA7F7F]/80 z-10"></div>
        <div className="relative z-20 px-4">
          <h1
            className="text-4xl text-[#dbd5c5] font-bold md:text-5xl"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Create an Event
          </h1>
          <p
            className="mt-4 text-lg text-[#dbd5c5]"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Share your event with the world!
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-screen-lg grid-cols-1 gap-10 md:grid-cols-2 px-4"
      >
        {/* Left Side */}
        <div className="space-y-6">
          {/* Upload */}
          <div>
            <label
              htmlFor="upload"
              className="flex flex-col items-center justify-center space-y-4 bg-[#BA7F7F] text-[#dbd5c5] py-20 w-full text-center rounded-lg cursor-pointer hover:bg-[#a56767] transition"
            >
              <img src={upload} alt="Upload Icon" className="w-12 h-12" />
              <span
                className="text-lg font-semibold"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                Upload photos and videos
              </span>
              <input
                type="file"
                id="upload"
                name="images"
                multiple
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Title */}
          <div>
            <label
              className="text-[#620808] font-semibold text-lg"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-white border-gray-400 p-3 text-black"
            />
          </div>

          {/* Summary */}
          <div>
            <label
              className="text-[#620808] font-semibold text-lg"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Summary
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={5}
              className="mt-1 w-full rounded border bg-white border-gray-400 p-3 text-black"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Date & Time */}
          <div>
            <label
              className="text-[#620808] font-semibold text-lg"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Date and Time
            </label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-white border-gray-400 p-3 text-black"
            />
          </div>

          {/* Location */}
          <div>
            <label
              className="text-[#620808] font-semibold text-lg"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-white border-gray-400 p-3 text-black"
            />
          </div>

          {/* Overview */}
          <div>
            <label
              className="text-[#620808] font-semibold text-lg"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Overview
            </label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows={5}
              className="mt-1 w-full rounded border bg-white border-gray-400 p-3 text-black"
            />
          </div>
        </div>
      </form>

      {/* Ticket Options Section */}
      <div className="mx-auto mt-20 max-w-screen-lg px-4">
        <h2
          className="text-3xl font-bold text-[#620808] mb-6"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          Ticket Options
        </h2>

        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6 bg-[#BA7F7F] p-4 rounded-lg shadow"
          >
            {/* Ticket Name */}
            <div>
              <label
                className="block text-[#dbd5c5] font-semibold mb-1"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                Ticket Name
              </label>
              <input
                type="text"
                value={ticket.name}
                onChange={(e) =>
                  handleTicketChange(index, "name", e.target.value)
                }
                placeholder="e.g. VIP, General Admission"
                className="w-full rounded border bg-white border-gray-400 p-2 text-black"
              />
            </div>

            {/* Ticket Price */}
            <div>
              <label
                className="block text-[#dbd5c5] font-semibold mb-1"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                Price
              </label>
              <input
                type="number"
                value={ticket.isFree ? "" : ticket.price}
                onChange={(e) =>
                  handleTicketChange(index, "price", e.target.value)
                }
                disabled={ticket.isFree}
                placeholder={ticket.isFree ? "Free" : "e.g. 20"}
                className="w-full rounded border bg-white border-gray-400 p-2 text-black"
              />
            </div>

            {/* Free Toggle + Remove */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={ticket.isFree}
                  onChange={() => handleTicketChange(index, "isFree")}
                />
                <span
                  className="text-[#dbd5c5] font-semibold"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Free
                </span>
              </label>
              {tickets.length > 1 && (
                <button
                  onClick={() => removeTicket(index)}
                  className="text-lg text-[#dbd5c5] hover:underline mt-2 md:mt-0"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add Ticket Button */}
        <button
          onClick={addTicket}
          className="mt-4 rounded-full bg-[#BA7F7F] px-6 py-2 text-white font-semibold hover:bg-[#a16767] transition"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          + Add Ticket Type
        </button>
      </div>

      {/* Final Save Button below ticket section */}
      <div className="mx-auto mt-10 max-w-screen-lg px-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full rounded-full bg-[#BA7F7F] px-6 py-3 font-bold text-white transition hover:bg-[#a16767]"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default OrgEvent;
