import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Navbar } from "../../components/ui/required/Navbar";

export default function VenueDetail() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    data: venue,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["venue", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/venues/${id}`);
      return res.data?.data;
    },
    enabled: !!id,
  });

  const images = venue?.photos || [];
  const operatingHours = {
    monday: { open: "06:00", close: "22:00" },
    tuesday: { open: "06:00", close: "22:00" },
    wednesday: { open: "06:00", close: "22:00" },
    thursday: { open: "06:00", close: "22:00" },
    friday: { open: "06:00", close: "22:00" },
    saturday: { open: "06:00", close: "22:00" },
    sunday: { open: "06:00", close: "22:00" },
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !venue) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Venue Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The venue you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link
            to="/"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to Venues
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {images.length > 0 ? (
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={images[currentImageIndex]}
                      alt={`${venue.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Image Navigation Dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? "bg-white"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking & Info */}
          <div className="space-y-6">
            {/* Book This Venue Button */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold">
                Book This Venue
              </Button>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Address
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>{venue.address}</p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Operating Hours
              </h3>
              <div className="space-y-2">
                {Object.entries(operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{day}</span>
                    <span className="text-gray-900 font-medium">
                      {formatTime(hours.open)} - {formatTime(hours.close)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sports Available Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sports Available
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {venue.sportTypes?.map((sport, index) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition-colors"
                >
                  <div className="text-green-600 font-semibold">{sport}</div>
                </div>
              )) || (
                <div className="col-span-full text-center text-gray-500 py-8">
                  No sports information available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {venue.amenities?.map((amenity, index) => (
                <div
                  key={index}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors"
                >
                  <div className="text-blue-600 font-semibold">{amenity}</div>
                </div>
              )) || (
                <div className="col-span-full text-center text-gray-500 py-8">
                  No amenities information available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Venue Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About This Venue
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {venue.description ||
                  "No description available for this venue."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
