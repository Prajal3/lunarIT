import { Link, useNavigate } from "react-router-dom";
import { FaBrain } from "react-icons/fa"; // Brain icon

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 bg-[#f2faf7]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      
      {/* Logo with Brain Icon */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <FaBrain className="text-[#2f6f6a] text-3xl animate-pulse-glow" />
        <h1 className="text-2xl font-semibold text-[#2f6f6a]">
          MindSpace
        </h1>
      </div>

      {/* Links */}
      <ul className="flex gap-8">
        <li>
          <Link
            to="/home"
            className="text-[#4b7f78] hover:text-[#2f6f6a] transition"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/resources"
            className="text-[#4b7f78] hover:text-[#2f6f6a] transition"
          >
            Resources
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className="text-[#4b7f78] hover:text-[#2f6f6a] transition"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
