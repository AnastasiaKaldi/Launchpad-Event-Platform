import signup from "../src/assets/SignUp.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            role: "user",
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! You can now log in.");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="flex w-full flex-wrap">
      {/* Left Panel */}
      <div className="flex w-full flex-col md:w-1/2 lg:w-1/3 bg-[#BA7F7F]">
        <div className="flex justify-center md:-mb-24 md:justify-start md:pl-12">
          <a
            href="/"
            className="border-b-4 border-b-[#620808] pt-12 pb-2 text-4xl font-bold text-[#620808]"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Eventure
          </a>
        </div>

        <div className="my-auto flex flex-col justify-center px-6 pt-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12">
          <p
            className="text-center text-3xl font-bold text-[#dbd5c5]"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Welcome!
          </p>
          <p
            className="mt-2 text-2xl text-center text-[#dbd5c5]"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Are you ready to join the ride?
          </p>

          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={handleRegister}
          >
            {/* First Name */}
            <div className="flex flex-col pt-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                className="w-full rounded-lg bg-[#BA7F7F] py-4 px-4 text-base text-[#dbd5c5] placeholder-[#dbd5c5] border border-gray-300 focus:outline-none"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col pt-4">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                className="w-full rounded-lg bg-[#BA7F7F] py-4 px-4 text-base text-[#dbd5c5] placeholder-[#dbd5c5] border border-gray-300 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                  📧
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full flex-1 bg-[#BA7F7F] py-4 px-4 text-base text-[#dbd5c5] placeholder-[#dbd5c5] focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-12 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                  🔒
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full flex-1 bg-[#BA7F7F] py-4 px-4 text-base text-[#dbd5c5] placeholder-[#dbd5c5] focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#620808] text-lg px-4 py-2 font-semibold text-[#dbd5c5] shadow-md transition ease-in hover:bg-blue-600 focus:outline-none focus:ring-2"
            >
              <span style={{ fontFamily: "Inknut Antiqua" }}>Submit</span>
            </button>
          </form>

          {/* Redirect */}
          <div className="pt-12 pb-12 text-center">
            <p
              className="text-[#dbd5c5] text-xl"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Already have an account?
              <Link
                to="/signin"
                className="font-semibold underline ml-1"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                Sign in here.
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel Image */}
      <div className="pointer-events-none hidden select-none bg-black shadow-2xl md:block md:w-1/2 lg:w-2/3">
        <img
          className="h-screen w-full object-cover opacity-90"
          src={signup}
          alt="Sign up"
        />
      </div>
    </div>
  );
}

export default SignUp;
