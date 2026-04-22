import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setActive }) {

  const navigate = useNavigate();

  // ✅ Get user directly (no useEffect needed)
  const [user] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const [activeMenu, setActiveMenu] = useState("mentorship");

  const handleClick = (menu) => {
    setActiveMenu(menu);
    setActive(menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-700 to-blue-600 
                    text-white flex flex-col justify-between p-6 shadow-2xl">

      {/* ===== TOP SECTION ===== */}
      <div>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            className="w-10 h-10"
            alt="logo"
          />
          <h2 className="text-xl font-bold tracking-wide">
            Alumni Connect
          </h2>
        </div>

        {/* Menu */}
        <ul className="space-y-3 text-md font-medium">

          {[
            { key: "mentorship", label: "🎓 Mentorship" },
            { key: "companies", label: "🏢 Company Rounds" },
            { key: "prep", label: "📚 Preparation" },
            { key: "jobs", label: "💼 Jobs" },
            { key: "internships", label: "🧑‍💻 Internships" },
            { key: "mentorChat", label: " 🗣️ Mentor Chat" }
          ].map((item) => (
            <li
              key={item.key}
              onClick={() => handleClick(item.key)}
              className={`cursor-pointer p-3 rounded-xl transition-all duration-300 
                ${activeMenu === item.key
                  ? "bg-white text-indigo-700 shadow-lg font-semibold"
                  : "hover:bg-indigo-500"
                }`}
            >
              {item.label}
            </li>
          ))}

        </ul>
      </div>

      {/* ===== BOTTOM PROFILE SECTION ===== */}
      <div className="border-t border-indigo-400 pt-5 space-y-4">

        <div className="bg-indigo-500/40 p-3 rounded-xl">
          <p className="text-xs text-indigo-200">Logged in as</p>
          <p className="font-semibold text-lg">
            {user?.name || user?.email|| "Student"}
          </p>
        </div>

        {/* Improved Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-white text-red-600 font-semibold 
                     py-2 rounded-xl shadow-md 
                     hover:bg-red-500 hover:text-white 
                     transition-all duration-300"
        >
          Logout
        </button>

      </div>
    </div>
  );
}