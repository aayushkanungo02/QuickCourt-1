import { Link } from "react-router-dom";

const venues = [
  {
    id: 1,
    name: "Downtown Badminton Court",
    location: "123 City St",
    sport: "Badminton",
    pricePerHour: 15,
    rating: 4.5,
    img: "/hero1.jpg",
  },
  {
    id: 2,
    name: "Green Park Turf",
    location: "45 Green Ave",
    sport: "Turf",
    pricePerHour: 30,
    rating: 4.7,
    img: "/hero1.jpg",
  },
  // ...more venues
];

export function VenuesList() {
  return (
    <section className="px-6 py-12 bg-white max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center md:text-left">
        Available Venues
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {venues.map(({ id, name, location, sport, pricePerHour, rating, img }) => (
          <div
            key={id}
            className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col"
          >
            <div className="h-48 w-full overflow-hidden rounded-t-xl">
              <img
                src={img}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-1 text-gray-900">{name}</h3>
              <p className="text-gray-600 mb-1">{location}</p>
              <p className="text-green-700 font-semibold mb-3">{sport}</p>

              <div className="mt-auto">
                <p className="text-gray-900 font-semibold text-lg">
                  ₹{pricePerHour} / hour
                </p>
                <p className="mt-1 text-yellow-500 font-semibold flex items-center">
                  <span className="mr-1">⭐</span> {rating}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Options Button */}
      <div className="flex justify-center mt-10">
        <Link
          to="/more-options"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors duration-300"
        >
          Show More Options
        </Link>
      </div>
    </section>
  );
}
