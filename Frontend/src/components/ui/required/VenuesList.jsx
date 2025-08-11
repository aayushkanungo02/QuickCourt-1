const venues = [
  {
    id: 1,
    name: "Downtown Badminton Court",
    location: "123 City St",
    sport: "Badminton",
    pricePerHour: 15,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Green Park Turf",
    location: "45 Green Ave",
    sport: "Turf",
    pricePerHour: 30,
    rating: 4.7,
  },
  // ...more venues
];

export function VenuesList() {
  return (
    <section className="px-6 py-12 bg-white">
      <h2 className="text-3xl font-bold mb-6">Available Venues</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {venues.map(({ id, name, location, sport, pricePerHour, rating }) => (
          <div
            key={id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-gray-600 mb-1">{location}</p>
            <p className="text-gray-700 font-medium">{sport}</p>
            <p className="mt-2 text-gray-900 font-semibold">
              ₹{pricePerHour} / hour
            </p>
            <p className="mt-1 text-yellow-500 font-semibold">⭐ {rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
