import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthUser from "../../hooks/useAuthuser";
import { axiosInstance } from "../../lib/axios";

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-start gap-4">
      <div className="h-10 w-10 rounded-lg bg-green-100 text-green-700 grid place-items-center text-lg font-bold">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
        {subtitle ? (
          <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
}

function MiniCalendar({ datesWithBookings }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const bookedSet = useMemo(
    () => new Set(datesWithBookings || []),
    [datesWithBookings]
  );

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthName = today.toLocaleString("default", { month: "long" });

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold text-gray-900">
          {monthName} {year}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-xs text-gray-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((d, idx) => {
          if (d === null) return <div key={`pad-${idx}`} />;
          const dateStr = new Date(year, month, d).toISOString().split("T")[0];
          const isBooked = bookedSet.has(dateStr);
          const isToday = d === today.getDate();
          return (
            <div
              key={`d-${d}`}
              className={`h-10 grid place-items-center rounded-md border text-sm ${
                isBooked
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-white border-gray-200 text-gray-700"
              } ${isToday ? "ring-2 ring-green-500" : ""}`}
              title={dateStr}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OwnerDashboard() {
  const { authUser } = useAuthUser();

  const { data, isLoading } = useQuery({
    queryKey: ["owner-dashboard"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/owner/dashboard");
        return res.data?.data;
      } catch {
        // Fallback mocked shape if endpoint not ready
        return {
          totalBookings: 0,
          activeCourts: 0,
          earnings: 0,
          datesWithBookings: [],
        };
      }
    },
  });

  const totalBookings = data?.totalBookings ?? 0;
  const activeCourts = data?.activeCourts ?? 0;
  const earnings = data?.earnings ?? 0;
  const datesWithBookings = data?.datesWithBookings ?? [];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome{authUser?.fullName ? `, ${authUser.fullName}` : ""}
        </h1>
        <p className="text-gray-600 mt-1">
          Here is an overview of your facilities, bookings, and earnings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Bookings"
          value={isLoading ? "—" : totalBookings}
          subtitle="All-time"
          icon={"B"}
        />
        <StatCard
          title="Active Courts"
          value={isLoading ? "—" : activeCourts}
          subtitle="Currently available"
          icon={"C"}
        />
        <StatCard
          title="Earnings"
          value={isLoading ? "—" : `₹${Number(earnings).toLocaleString()}`}
          subtitle="Simulated"
          icon={"₹"}
        />
        <StatCard
          title="This Month"
          value={isLoading ? "—" : datesWithBookings.length}
          subtitle="Days with bookings"
          icon={"M"}
        />
      </div>

      <MiniCalendar datesWithBookings={datesWithBookings} />
    </div>
  );
}
