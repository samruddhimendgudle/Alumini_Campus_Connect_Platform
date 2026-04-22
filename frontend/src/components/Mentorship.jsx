export default function Mentorship() {
  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Mentorship Overview
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* CARD */}
        <div className="bg-white p-6 rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
          <h3 className="font-semibold text-gray-700">Total Meetings</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
        </div>

        {/* CARD */}
        <div className="bg-white p-6 rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
          <h3 className="font-semibold text-gray-700">Live Meetings</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">2</p>
        </div>

        {/* CARD */}
        <div className="bg-white p-6 rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
          <h3 className="font-semibold text-gray-700">Upcoming Meetings</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">3</p>
        </div>

      </div>

    </div>
  );
}