import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-4 bg-blue-600 text-white shadow-md">
        
        {/* LOGO + NAME */}
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="logo"
            className="w-8 h-8"
          />
          <h1 className="text-lg font-bold">Alumni Connect</h1>
        </div>

        {/* LINKS */}
        <div className="space-x-6 font-medium">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/login" className="hover:text-gray-200">Login</Link>
          <Link to="/register" className="hover:text-gray-200">Register</Link>
        </div>

      </nav>

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
        <div className="flex flex-col md:flex-row items-center px-10 py-16">

          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect with Alumni <br /> & Grow Your Career 🚀
            </h1>

            <p className="text-blue-100 mb-6">
              Discover interview experiences, mentorship, and real insights
              to prepare smarter and succeed faster.
            </p>

            <div className="space-x-4">
              <Link to="/register">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
                  Get Started
                </button>
              </Link>

              <Link to="/login">
                <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition">
                  Login
                </button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="student"
              className="w-80 drop-shadow-lg"
            />
          </div>

        </div>
      </div>

      {/* NEW SECTION */}
      <div className="py-16 px-10 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div className="p-6 rounded-2xl hover:shadow-lg transition">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-lg mb-2">
              Real Data Insights
            </h3>
            <p className="text-gray-600 text-sm">
              Access authentic interview data shared by alumni.
            </p>
          </div>

          <div className="p-6 rounded-2xl hover:shadow-lg transition">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-lg mb-2">
              Focused Preparation
            </h3>
            <p className="text-gray-600 text-sm">
              Prepare based on real company patterns.
            </p>
          </div>

          <div className="p-6 rounded-2xl hover:shadow-lg transition">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-semibold text-lg mb-2">
              Strong Networking
            </h3>
            <p className="text-gray-600 text-sm">
              Connect with alumni from top companies.
            </p>
          </div>

        </div>
      </div>

      {/* WHAT WE OFFER (WITH BACKGROUND IMAGES 🔥) */}
      <div className="py-16 px-10">
        <h2 className="text-center text-3xl font-bold mb-12 text-gray-800">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {/* CARD */}
          {[
            {
              title: "Experiences",
              img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
              points: ["Real Interview Insights", "Company Questions", "Verified Data", "Placement Trends"]
            },
            {
              title: "Search",
              img: "https://images.unsplash.com/photo-1552664730-d307ca884978",
              points: ["Filter by Company", "Role & Difficulty", "Smart Suggestions", "Fast Access"]
            },
            {
              title: "Mentorship",
              img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
              points: ["Alumni Guidance", "Resume Help", "Mock Interviews", "Career Advice"]
            },
            {
              title: "Growth",
              img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
              points: ["Track Progress", "Build Network", "Opportunities", "Success Stories"]
            }
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition duration-300">

              {/* IMAGE HEADER */}
              <div
                className="h-40 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${card.img})` }}
              >
                <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-lg">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 text-sm text-gray-600 space-y-2">
                {card.points.map((p, idx) => (
                  <p key={idx}>➤ {p}</p>
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 text-white text-center py-6">
        <p>© 2026 Alumni Connect</p>
      </div>

    </div>
  );
}

export default Home;