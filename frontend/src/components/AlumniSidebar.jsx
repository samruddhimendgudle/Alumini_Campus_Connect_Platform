import { FaUserGraduate, FaClipboardList, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";

export default function AlumniSidebar({ setActive }) {
  return (
    <div className="w-64 bg-gradient-to-b from-indigo-600 to-purple-600 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Alumni Connect</h2>

      <ul className="space-y-6">
        <li onClick={() => setActive("dashboard")} className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaClipboardList /> Dashboard
        </li>

        <li onClick={() => setActive("share")} className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaPlusCircle /> Share Experience
        </li>

        <li onClick={() => setActive("requests")}className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaUserGraduate /> Student Requests
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
}