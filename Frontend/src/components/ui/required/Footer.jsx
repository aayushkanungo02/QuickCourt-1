import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-green-100 text-green-800 py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold">QuickCourt</div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link
            to="/"
            className="hover:text-green-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/booking"
            className="hover:text-green-600 transition-colors font-medium"
          >
            Booking
          </Link>
          <Link
            to="/login"
            className="hover:text-green-600 transition-colors font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hover:text-green-600 transition-colors font-medium"
          >
            Signup
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-5">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              aria-label="Social link"
              className="hover:text-green-600 transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      <p className="text-center mt-6 text-green-700 text-sm select-none">
        © {new Date().getFullYear()} QuickCourt. All rights reserved.
      </p>
    </footer>
  );
}
