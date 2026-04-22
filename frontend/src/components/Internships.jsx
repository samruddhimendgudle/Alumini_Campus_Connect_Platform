import { useEffect, useState } from "react";
import axios from "axios";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const staticInternships = [
    {
      _id: "static-1",
      companyName: "Google",
      role: "Software Engineering Intern",
      duration: "3 months",
      stipend: "50,000 - 80,000",
      location: "Bangalore, India",
      applyLink: "https://careers.google.com",
      isStatic: true,
      description: "Work with Google's engineering teams and learn industry best practices."
    },
    {
      _id: "static-2",
      companyName: "Microsoft",
      role: "Internship Program",
      duration: "2-3 months",
      stipend: "40,000 - 70,000",
      location: "Hyderabad, India",
      applyLink: "https://careers.microsoft.com",
      isStatic: true,
      description: "Develop your skills with mentorship from Microsoft engineers."
    },
    {
      _id: "static-3",
      companyName: "Amazon",
      role: "Amazon Internship",
      duration: "3 months",
      stipend: "35,000 - 60,000",
      location: "Bangalore, India",
      applyLink: "https://amazon.jobs",
      isStatic: true,
      description: "Get hands-on experience building customer-focused solutions."
    }
  ];

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/internships");
        const dbInternships = Array.isArray(res.data) ? res.data : [];
        const allInternships = [...staticInternships, ...dbInternships];
        setInternships(allInternships);
        setFilteredInternships(allInternships);
      } catch (error) {
        console.error("Error fetching internships:", error);
        setInternships(staticInternships);
        setFilteredInternships(staticInternships);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  useEffect(() => {
    const filtered = internships.filter((internship) =>
      internship.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      internship.role?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredInternships(filtered);
  }, [search, internships]);

  if (loading) {
    return <div className="text-center p-8">Loading internship opportunities...</div>;
  }

  return (
    <div>
      {/* Header and Search */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          🧑‍💻 Internship Opportunities
        </h2>
        <input
          type="text"
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Internships Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredInternships.map((internship) => (
          <div
            key={internship._id}
            onClick={() => setSelectedInternship(internship)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl 
                     hover:-translate-y-2 transition cursor-pointer 
                     border-l-4 border-purple-600"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-purple-600">
                {internship.companyName}
              </h3>
              {internship.isStatic && (
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                  Official
                </span>
              )}
              {!internship.isStatic && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                  Alumni Posted
                </span>
              )}
            </div>

            <p className="text-gray-700 font-semibold text-md mb-2">
              {internship.role}
            </p>

            {internship.duration && (
              <p className="text-gray-600 text-sm mb-2">
                ⏱️ {internship.duration}
              </p>
            )}

            {internship.stipend && (
              <p className="text-gray-600 text-sm mb-2">
                💰 ₹{internship.stipend}
              </p>
            )}

            {internship.location && (
              <p className="text-gray-600 text-sm mb-3">
                📍 {internship.location}
              </p>
            )}

            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
              View Details →
            </button>
          </div>
        ))}
      </div>

      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No internships found matching your search</p>
        </div>
      )}

      {/* Internship Detail Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 sticky top-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold">
                    {selectedInternship.companyName}
                  </h2>
                  <p className="text-purple-100 text-lg mt-2">
                    {selectedInternship.role}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedInternship(null)}
                  className="text-2xl font-bold hover:scale-110 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Key Info */}
              <div className="grid md:grid-cols-3 gap-6">
                {selectedInternship.duration && (
                  <div>
                    <h3 className="text-gray-600 text-sm font-semibold">Duration</h3>
                    <p className="text-xl font-bold text-gray-800 mt-1">
                      {selectedInternship.duration}
                    </p>
                  </div>
                )}
                {selectedInternship.stipend && (
                  <div>
                    <h3 className="text-gray-600 text-sm font-semibold">Monthly Stipend</h3>
                    <p className="text-xl font-bold text-green-600 mt-1">
                      ₹{selectedInternship.stipend}
                    </p>
                  </div>
                )}
                {selectedInternship.location && (
                  <div>
                    <h3 className="text-gray-600 text-sm font-semibold">Location</h3>
                    <p className="text-xl font-bold text-gray-800 mt-1">
                      {selectedInternship.location}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedInternship.description && (
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-3">About this internship</h3>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {selectedInternship.description}
                  </p>
                </div>
              )}

              {/* Requirements */}
              {selectedInternship.requirements && selectedInternship.requirements.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedInternship.requirements.map((req, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="text-purple-600 font-bold">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Posted By */}
              {selectedInternship.postedBy && !selectedInternship.isStatic && (
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <p className="text-gray-700">
                    <span className="font-semibold">Posted by:</span> {selectedInternship.postedBy.name} 
                    ({selectedInternship.postedBy.company})
                  </p>
                </div>
              )}

              {/* Apply Button */}
              {selectedInternship.applyLink && (
                <a
                  href={selectedInternship.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-bold hover:bg-purple-700 transition"
                >
                  Apply Now →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}