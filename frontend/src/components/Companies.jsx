import { useEffect, useState } from "react";
import axios from "axios";

export default function Companies() {
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/experience");
      if (Array.isArray(res.data)) {
        setExperiences(res.data);
      } else {
        setExperiences([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Filter companies by search
  const filteredExperiences = experiences.filter((exp) =>
    exp.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  // Group by company and get unique companies
  const uniqueCompanies = Array.from(
    new Map(
      filteredExperiences.map((exp) => [
        exp.companyName,
        filteredExperiences.filter((e) => e.companyName === exp.companyName),
      ])
    ).values()
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          🏢 Company Interview Experiences
        </h2>
        <input
          type="text"
          placeholder="Search by company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading companies...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {uniqueCompanies.map((companyExperiences) => {
            const company = companyExperiences[0];
            return (
              <div
                key={company.companyName}
                onClick={() => setSelectedExperience(companyExperiences)}
                className="bg-gradient-to-br from-indigo-50 to-white 
                           p-6 rounded-xl shadow-md hover:shadow-xl 
                           hover:-translate-y-2 transition cursor-pointer 
                           border border-indigo-100"
              >
                <h3 className="text-xl font-bold text-indigo-700">
                  {company.companyName}
                </h3>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">📝 Total Experiences:</span> {companyExperiences.length}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">🔄 Avg Rounds:</span> {
                      Math.round(
                        companyExperiences.reduce((sum, exp) => sum + (exp.rounds || 0), 0) /
                        companyExperiences.length
                      )
                    }
                  </p>
                </div>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  View Details →
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 sticky top-0">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">
                  {selectedExperience[0].companyName}
                </h2>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="text-2xl font-bold hover:scale-110 transition"
                >
                  ✕
                </button>
              </div>
              <p className="text-indigo-100 mt-2">
                Total experiences: {selectedExperience.length}
              </p>
            </div>

            {/* Experiences List */}
            <div className="p-6 space-y-6">
              {selectedExperience.map((exp, index) => (
                <div
                  key={exp._id}
                  className="border-l-4 border-indigo-500 pl-4 pb-6 border-b last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-indigo-700">
                      Experience #{index + 1}
                    </h3>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                      📅 {new Date(exp.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-gray-600 text-sm">Role</p>
                      <p className="font-semibold text-gray-800">{exp.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Number of Rounds</p>
                      <p className="font-semibold text-gray-800">{exp.rounds}</p>
                    </div>
                  </div>

                  {exp.roundDetails && (
                    <div className="mb-3">
                      <p className="text-gray-600 text-sm">Round Details</p>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded">
                        {exp.roundDetails}
                      </p>
                    </div>
                  )}

                  {exp.overallExperience && (
                    <div className="mb-3">
                      <p className="text-gray-600 text-sm">Overall Experience</p>
                      <p className="text-gray-800 bg-blue-50 p-3 rounded">
                        {exp.overallExperience}
                      </p>
                    </div>
                  )}

                  {exp.suggestion && (
                    <div>
                      <p className="text-gray-600 text-sm">💡 Suggestions</p>
                      <p className="text-gray-800 bg-green-50 p-3 rounded">
                        {exp.suggestion}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}