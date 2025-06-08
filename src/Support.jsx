import BackToHomeButton from "./BackHome";
function Support() {
  return (
    <div
      className="min-h-screen pt-32 px-6 sm:px-12 bg-[#dbd5c5] text-[#620808]"
      style={{ fontFamily: "Inknut Antiqua" }}
    >
      <div
        className="max-w-3xl mx-auto text-center"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
          How can we help?
        </h1>
        <p className="text-lg sm:text-xl mb-12 text-[#5a2e2e]">
          We're here to answer your questions, solve any problems, and guide you
          on your event journey with Eventino.
        </p>

        <div className="bg-[#b46f6f] shadow-md rounded-lg p-8 text-left border border-[#ba7f7f]">
          <h2 className="text-3xl font-semibold mb-4 text-[#dbd5c5]">
            Contact Us
          </h2>
          <p className="mb-2  text-xl text-[#dbd5c5]">
            📧 Email us at{" "}
            <a
              href="mailto:hello@techreturners.com"
              className="underline text-[#1d5cfb] font-medium"
            >
              hello@techreturners.com
            </a>
          </p>
          <p className="mb-4 text-xl text-[#dbd5c5]">
            📞 Or give us a call at:{" "}
            <span className="font-bold">0333 050 4368</span>
          </p>
        </div>

        <p className="mt-12 text-sm text-[#dbd5c5]">
          Our team is available Monday to Friday, 9AM – 5PM GMT. We'll aim to
          respond within 24 hours.
        </p>
      </div>
      <div className="flex justify-center mb-10">
        <BackToHomeButton />
      </div>
    </div>
  );
}

export default Support;
