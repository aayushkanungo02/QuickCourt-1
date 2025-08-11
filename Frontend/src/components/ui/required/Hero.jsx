export function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center px-10 py-20 bg-gradient-to-r from-blue-50 to-white min-h-[350px] gap-16">
      {/* Left side: Text + search */}
      <div className="flex flex-col flex-1 max-w-xl space-y-8">
        <h1 className="text-5xl font-extrabold leading-tight text-gray-900 drop-shadow-md">
          Find Players and Venues Nearby
        </h1>
        <p className="text-gray-700 text-lg max-w-lg">
          Seamlessly explore sports venues and connect with players in your area.
        </p>

        {/* Location Input + Search Button */}
        <form className="flex max-w-md rounded-lg shadow-md overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <input
            type="text"
            placeholder="Enter your location"
            className="flex-grow px-6 py-3 text-base focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors duration-300"
          >
            Search
          </button>
        </form>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:flex flex-1 rounded-xl overflow-hidden shadow-lg shadow-blue-300/40 h-[350px]">
        <img
          src="/hero.jpg"
          alt="Sports Venue"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
