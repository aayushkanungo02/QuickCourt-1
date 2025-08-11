import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const popularSports = [
  { id: 1, name: "Badminton", img: "/bat.jpg" },
  { id: 2, name: "Football", img: "/football.jpg" },
  { id: 3, name: "Tennis", img: "/tt.jpg" },
  { id: 3, name: "Tennis", img: "/tt.jpg" },
  { id: 3, name: "Tennis", img: "/tt.jpg" },
  { id: 3, name: "Tennis", img: "/tt.jpg" },
  { id: 3, name: "Tennis", img: "/tt.jpg" },
  { id: 3, name: "Tennis", img: "/tt.jpg" },
  // Add more sports as needed
];

export function PopularSports() {
  const scrollRef = useRef(null);

  const scrollByCard = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild.offsetWidth + 24; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full px-4 sm:px-8 md:px-12 py-12 bg-gray-50">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-black drop-shadow-md">
        Popular Sports
      </h2>

      {/* Left Arrow */}
      <button
        aria-label="Scroll Left"
        onClick={() => scrollByCard("left")}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 rounded-full bg-green-600 text-white p-2 shadow-lg hover:bg-green-700 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        aria-label="Scroll Right"
        onClick={() => scrollByCard("right")}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 rounded-full bg-green-600 text-white p-2 shadow-lg hover:bg-green-700 transition"
      >
        <ChevronRight size={24} />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 sm:space-x-8 pb-4 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100 scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {popularSports.map(({ id, name, img }) => (
          <div
            key={id}
            className="flex-shrink-0 snap-center flex flex-col items-center bg-green-50 border border-green-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition w-40 sm:w-52 md:w-56"
          >
            <img
              src={img}
              alt={name}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-lg mb-5"
            />
            <p className="text-green-900 font-semibold text-lg sm:text-xl text-center">
              {name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
