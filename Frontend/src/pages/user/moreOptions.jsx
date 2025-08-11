import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function MoreOptions() {
  const navigate = useNavigate();

  // Filters state
  const [searchName, setSearchName] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [venueType, setVenueType] = useState("");
  const [minRating, setMinRating] = useState(0);

  // Fetch venues from backend
  const { data, isLoading, isError } = useQuery({
    queryKey: ["venues", { page: 1, limit: 50 }],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/venues", {
        params: { page: 1, limit: 50 },
      });
      return res.data?.data;
    },
  });

  const venues = data?.venues || [];

  // Filter venues based on filters
  const filteredVenues = venues.filter((venue) => {
    return (
      venue.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (selectedSport
        ? venue.sportTypes?.some((sport) =>
            sport.toLowerCase().includes(selectedSport.toLowerCase())
          )
        : true) &&
      venue.startingPrice <= maxPrice &&
      (venueType ? venue.venueType === venueType : true) &&
      venue.rating >= minRating
    );
  });

  // Get unique sports for filter dropdown
  const uniqueSports = [
    ...new Set(venues.flatMap((venue) => venue.sportTypes || [])),
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-green-50">
        <div className="w-72 bg-green-50 border border-green-300 rounded-xl p-6 space-y-8 shadow-lg sticky top-4 h-screen overflow-auto">
          <div className="animate-pulse space-y-8">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx}>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        <main className="flex-1 p-8 bg-white overflow-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="border rounded-lg p-4 shadow">
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen bg-green-50 items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Venues
          </h2>
          <p className="text-gray-600 mb-6">
            Failed to load venues from the server.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-72 bg-green-50 border border-green-300 rounded-xl p-6 space-y-8 shadow-lg sticky top-4 h-screen overflow-auto">
        {/* Search by Venue Name */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-green-900">
            Search by Venue Name
          </h2>
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
          <h2 className="text-xl font-semibold mb-3 text-green-900">
            Filter by Sport Type
          </h2>
          <select
            className="w-full border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            <option value="">All Sports</option>
            {uniqueSports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
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
          <h2 className="text-xl font-semibold mb-3 text-green-900">
            Venue Type
          </h2>
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
          <h2 className="text-xl font-semibold mb-3 text-green-900">
            Minimum Rating
          </h2>
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
        <h1 className="text-3xl font-bold mb-8 text-green-900">
          Available Venues
        </h1>
        {filteredVenues.length === 0 ? (
          <p className="text-gray-600">
            No venues found matching your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                onClick={() => navigate(`/venue/${venue.id}`)}
              >
                <img
                  src={venue.photos?.[0] || "/hero1.jpg"}
                  alt={venue.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-1">{venue.name}</h2>
                <p className="text-gray-600 mb-1">{venue.location}</p>
                <p className="text-gray-700 font-medium">
                  {venue.sportTypes?.[0] || "Multiple Sports"}
                </p>
                <p className="mt-2 text-gray-900 font-semibold">
                  ₹{venue.startingPrice || 0} / hour
                </p>
                <p className="mt-1 text-yellow-500 font-semibold">
                  ⭐ {venue.rating || 0}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/venue/${venue.id}`);
                  }}
                  className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
                >
                  Book This Venue
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
