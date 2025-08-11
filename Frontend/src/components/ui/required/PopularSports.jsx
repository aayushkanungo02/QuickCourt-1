const popularSports = [
  { id: 1, name: "Badminton", img: "/sports/badminton.png" },
  { id: 2, name: "Football", img: "/sports/football.png" },
  { id: 3, name: "Tennis", img: "/sports/tennis.png" },
  // ... more sports
];

export function PopularSports() {
  return (
    <section className="px-6 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Popular Sports</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {popularSports.map(({ id, name, img }) => (
          <div
            key={id}
            className="flex flex-col items-center border rounded-lg p-4 shadow hover:shadow-lg transition w-36"
          >
            <img
              src={img}
              alt={name}
              className="w-20 h-20 object-contain mb-3"
            />
            <p className="text-gray-800 font-semibold">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
