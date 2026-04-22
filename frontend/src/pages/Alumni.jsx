import { useState, useEffect } from "react";
import AlumniSidebar from "../components/AlumniSidebar";
import ShareExperience from "./ShareExperience";
import ExperienceList from "../components/ExperienceList";
import StudentDashboard from "./Student";
import StudentRequests from "./StudentRequests";
import axios from "axios";

export default function Alumni() {

  const [active, setActive] = useState("dashboard");
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/experience");
        setExperiences(res.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

 return (
  <div className="flex min-h-screen bg-gray-100">
    <AlumniSidebar setActive={setActive} />

    <div className="flex-1 p-8">

      {active === "dashboard" && (
        <>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg mb-8">
            <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
            <p>Help students by sharing your placement experience.</p>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <ExperienceList experiences={experiences} />
          )}
        </>
      )}

      {active === "share" && (
        <ShareExperience
          refresh={() => {
            setLoading(true);
            axios.get("http://localhost:5000/api/experience")
              .then(res => {
                setExperiences(res.data);
                setLoading(false);
              });
          }}
        />
      )}

      {/* ✅ THIS IS THE FIX */}
      {active === "requests" && (
        <StudentRequests/>
      )}

    </div>
  </div>
);
}