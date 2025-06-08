import { Link } from "react-router-dom";

const BackToHomeButton = () => {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        to="/"
        className="bg-[#620808] text-[#dbd5c5] font-semibold px-6 py-3 rounded-full border border-[#2d452b] hover:bg-[#966969] hover:text-[#dbd5c5] transition-all duration-300 ease-in-out"
        style={{ fontFamily: "Inknut Antiqua" }}
      >
        ← Go Back
      </Link>
    </div>
  );
};

export default BackToHomeButton;
