import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button"; // your custom button or replace with plain button
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Example static venue data - replace with your real data or fetch
const venues = [
  {
    id: 1,
    name: "Downtown Badminton Court",
    location: "123 City St, Metropolis",
    sport: "Badminton",
    pricePerHour: 15,
    rating: 4.5,
    description:
      "A top-notch badminton court located downtown with professional flooring and lighting. Perfect for casual play and tournaments.",
    image: "/badminton-court.jpg",
  },
  {
    id: 2,
    name: "Green Park Turf",
    location: "45 Green Ave, Springfield",
    sport: "Turf",
    pricePerHour: 30,
    rating: 4.7,
    description:
      "Large outdoor turf perfect for football and other outdoor sports. Well-maintained with locker rooms available.",
    image: "/green-park-turf.jpg",
  },
  // add more venues here
];

export default function VenueDetails() {
  const { id } = useParams();
  const venue = venues.find((v) => v.id === Number(id));

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-red-600">
          Venue not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:flex-1 h-72 md:h-auto overflow-hidden">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details & Booking */}
        <div className="md:flex-1 p-8 flex flex-col justify-between">
          {/* Venue Info */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {venue.name}
            </h1>
            <p className="text-gray-600 mb-1">{venue.location}</p>
            <p className="text-green-600 font-semibold mb-3">{venue.sport}</p>
            <p className="text-gray-800 font-bold text-xl mb-2">
              ₹{venue.pricePerHour} / hour
            </p>
            <p className="mb-4 text-yellow-500 font-semibold">
              {"⭐".repeat(Math.floor(venue.rating))}{" "}
              <span className="text-gray-500 font-normal">({venue.rating})</span>
            </p>
            <p className="text-gray-700 mb-8">{venue.description}</p>
          </div>

          {/* Booking Form */}
          <form className="space-y-6">
            <div>
              <Label htmlFor="date">Select Date</Label>
              <Input type="date" id="date" name="date" required />
            </div>

            <div>
              <Label htmlFor="time">Select Time</Label>
              <Input type="time" id="time" name="time" required />
            </div>

            <div>
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input
                type="number"
                id="duration"
                name="duration"
                min="1"
                max="12"
                defaultValue={1}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Book Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

