import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-md bg-black/40 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-yellow-400 hover:text-yellow-500 transition-colors">
          🚗 DriveRental
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Cars", "About", "Contact"].map((page) => (
            <Link
              key={page}
              to={page === "Cars" ? "/cars" : `/${page.toLowerCase()}`}
              className="text-white font-medium hover:text-yellow-400 transition-colors duration-300"
            >
              {page}
            </Link>
          ))}
        </div>

        {/* Auth Buttons Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 rounded-full border border-white/20 text-white hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 backdrop-blur-sm"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 rounded-full font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg border border-white/20 hover:border-yellow-400 transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ${
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {["Home", "Cars", "About", "Contact"].map((page) => (
          <Link
            key={page}
            to={page === "Cars" ? "/cars" : `/${page.toLowerCase()}`}
            className="text-2xl font-bold text-white hover:text-yellow-400 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {page}
          </Link>
        ))}

        <div className="flex flex-col gap-4 mt-4">
          <Link
            to="/login"
            className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 rounded-full font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
