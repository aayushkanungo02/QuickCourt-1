import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-green-600">QuickCourt</div>

      <Link
        to="/booking"
        className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 hover:text-green-800 font-medium transition"
      >
        <CalendarDays size={20} />
        Booking
      </Link>

      <div className="space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}
