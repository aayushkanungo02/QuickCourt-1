import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const venues = [
  {
    id: 1,
    name: "Downtown Badminton Court",
    location: "123 City St",
    sport: "Badminton",
    pricePerHour: 15,
    rating: 4.5,
    type: "Indoor",
    image: "/badminton-court.jpg",
  },
  {
    id: 2,
    name: "Green Park Turf",
    location: "45 Green Ave",
    sport: "Turf",
    pricePerHour: 30,
    rating: 4.7,
    type: "Outdoor",
    image: "/turf.jpg",
  },
  {
    id: 3,
    name: "City Football Ground",
    location: "78 Football Ln",
    sport: "Football",
    pricePerHour: 25,
    rating: 4.2,
    type: "Outdoor",
    image: "/football.jpg",
  },
  {
    id: 4,
    name: "Elite Tennis Courts",
    location: "90 Tennis Blvd",
    sport: "Tennis",
    pricePerHour: 20,
    rating: 4.8,
    type: "Indoor",
    image: "/tennis.jpg",
  },
  // add more venues here as needed
];

export default function MoreOptions() {
  const navigate = useNavigate();

  // Filters state
  const [searchName, setSearchName] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [venueType, setVenueType] = useState("");
  const [minRating, setMinRating] = useState(0);

  // Filter venues based on filters
  const filteredVenues = venues.filter((venue) => {
    return (
      venue.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (selectedSport ? venue.sport === selectedSport : true) &&
      venue.pricePerHour <= maxPrice &&
      (venueType ? venue.type === venueType : true) &&
      venue.rating >= minRating
    );
  });

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-72 bg-green-50 border border-green-300 rounded-xl p-6 space-y-8 shadow-lg sticky top-4 h-screen overflow-auto">
        {/* Search by Venue Name */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-green-900">Search by Venue Name</h2>
          <input
            type="text"
            className="w-full border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="Type venue name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        {/* Filter by Sport Type */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-green-900">Filter by Sport Type</h2>
          <select
            className="w-full border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            <option value="">All Sports</option>
            <option value="Badminton">Badminton</option>
            <option value="Turf">Turf</option>
            <option value="Football">Football</option>
            <option value="Tennis">Tennis</option>
          </select>
        </div>

        {/* Price Range Slider */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-green-900">
            Max Price: ₹{maxPrice}
          </h2>
          <input
            type="range"
            min="0"
            max="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-green-600 cursor-pointer"
          />
        </div>

        {/* Venue Type */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-green-900">Venue Type</h2>
          <div className="flex flex-col space-y-2 text-green-800">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-green-600"
                name="venueType"
                value="Indoor"
                checked={venueType === "Indoor"}
                onChange={(e) => setVenueType(e.target.value)}
              />
              <span className="ml-2">Indoor</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-green-600"
                name="venueType"
                value="Outdoor"
                checked={venueType === "Outdoor"}
                onChange={(e) => setVenueType(e.target.value)}
              />
              <span className="ml-2">Outdoor</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-green-600"
                name="venueType"
                value=""
                checked={venueType === ""}
                onChange={() => setVenueType("")}
              />
              <span className="ml-2">All</span>
            </label>
          </div>
        </div>

        {/* Ratings */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-green-900">Minimum Rating</h2>
          <select
            className="w-full border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
          >
            <option value={0}>All Ratings</option>
            <option value={4}>4 Stars & Up</option>
            <option value={4.5}>4.5 Stars & Up</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
      </aside>

      {/* Venues List */}
      <main className="flex-1 p-8 bg-white overflow-auto">
        <h1 className="text-3xl font-bold mb-8 text-green-900">Available Venues</h1>
        {filteredVenues.length === 0 ? (
          <p className="text-gray-600">No venues found matching your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map(
              ({ id, name, location, sport, pricePerHour, rating, image }) => (
                <div
                  key={id}
                  className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                  onClick={() => navigate(`/venue/${id}`)}
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-1">{name}</h2>
                  <p className="text-gray-600 mb-1">{location}</p>
                  <p className="text-gray-700 font-medium">{sport}</p>
                  <p className="mt-2 text-gray-900 font-semibold">₹{pricePerHour} / hour</p>
                  <p className="mt-1 text-yellow-500 font-semibold">⭐ {rating}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/venue/${id}`);
                    }}
                    className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
                  >
                    Book This Venue
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
