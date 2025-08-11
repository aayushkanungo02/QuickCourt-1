import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import VenueCard from "./venueCard";

export function VenuesList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["venues", { page: 1, limit: 9 }],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/venues", {
        params: { page: 1, limit: 9 },
      });
      return res.data?.data;
    },
  });

  const venues = data?.venues || [];

  return (
    <section className="px-4 sm:px-6 py-12 bg-white max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-green-800 text-center rounded-xl py-4 bg-green-50">
        Available Venues
      </h2>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-72 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-center text-red-600">Failed to load venues.</p>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {venues.map((v, idx) => (
            <VenueCard
              key={`${v.id}-${idx}`}
              id={v.id}
              name={v.name}
              location={v.location}
              sport={
                (Array.isArray(v.sportTypes)
                  ? v.sportTypes[0]
                  : v.sportTypes) || ""
              }
              pricePerHour={v.startingPrice || 0}
              rating={v.rating || 0}
              img={Array.isArray(v.photos) ? v.photos.slice(0, 3) : v.photos}
            />
          ))}
        </div>
      )}
    </section>
  );
}
