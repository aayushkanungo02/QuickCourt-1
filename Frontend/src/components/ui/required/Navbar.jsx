import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react"; // example icon

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-green-600">QuickCourt</div>

      <Link
        to="/booking"
        className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
      >
        <CalendarDays size={20} />
        Booking
      </Link>

      <div className="space-x-4">
        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Login
        </Link>
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
          Signup
        </Link>
      </div>
    </nav>
  );
}
