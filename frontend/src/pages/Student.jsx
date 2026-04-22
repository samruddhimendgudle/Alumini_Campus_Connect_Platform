import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Mentorship from "../components/Mentorship";
import Companies from "../components/Companies";
import Preparation from "../components/Preparation";
import Jobs from "../components/Jobs";
import Internships from "../components/Internships";
import MentorChat from "../components/MentorChat";

export default function StudentDashboard() {

  const [active, setActive] = useState("mentorship");

  const renderSection = () => {
    switch (active) {
      case "mentorship":
        return <Mentorship />;
      case "companies":
        return <Companies />;
      case "prep":
        return <Preparation />;
      case "jobs":
        return <Jobs />;
      case "internships":
        return <Internships />;
      case "mentorChat":
        return <MentorChat />;
      default:
        return <Mentorship />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar setActive={setActive} />

      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-6 rounded-xl shadow mb-8">
          <h1 className="text-3xl font-bold">Student Dashboard 🎓</h1>
          <p className="text-blue-100">
            Connect with alumni, prepare smarter, and get placed faster.
          </p>
        </div>

        {renderSection()}

      </div>
    </div>
  );
}