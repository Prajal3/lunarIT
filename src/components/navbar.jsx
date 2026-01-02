import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-blue-50 shadow-sm">
      <h1 className="text-2xl font-bold text-blue-600">
        MindSpace
      </h1>

      <ul className="flex gap-6">
        <li>
          <Link to="/home" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/resources" className="text-gray-700 hover:text-blue-600">
            Resources
          </Link>
        </li>
        
        <li>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Nav;
