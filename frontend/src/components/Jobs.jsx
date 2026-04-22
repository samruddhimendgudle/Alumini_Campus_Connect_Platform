import { useEffect, useState } from "react";
import axios from "axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  const staticJobs = [
    {
      _id: "static-1",
      companyName: "Google",
      role: "Software Engineer",
      salary: "15-25 LPA",
      location: "Bangalore, India",
      applyLink: "https://careers.google.com",
      isStatic: true,
      description: "Join Google's engineering team and work on world-class problems."
    },
    {
      _id: "static-2",
      companyName: "Microsoft",
      role: "Backend Developer",
      salary: "14-22 LPA",
      location: "Hyderabad, India",
      applyLink: "https://careers.microsoft.com",
      isStatic: true,
      description: "Build scalable systems at Microsoft. Great learning opportunities."
    },
    {
      _id: "static-3",
      companyName: "Amazon",
      role: "SDE (Software Development Engineer)",
      salary: "12-20 LPA",
      location: "Bangalore, India",
      applyLink: "https://amazon.jobs",
      isStatic: true,
      description: "Work on customer-obsessed products at Amazon."
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        const dbJobs = Array.isArray(res.data) ? res.data : [];
        const allJobs = [...staticJobs, ...dbJobs];
        setJobs(allJobs);
        setFilteredJobs(allJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs(staticJobs);
        setFilteredJobs(staticJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      job.role?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [search, jobs]);

  if (loading) {
    return <div className="text-center p-8">Loading job opportunities...</div>;
  }

  return (
    <div>
      {/* Header and Search */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          💼 Job Opportunities
        </h2>
        <input
          type="text"
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Jobs Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            onClick={() => setSelectedJob(job)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl 
                     hover:-translate-y-2 transition cursor-pointer 
                     border-l-4 border-blue-600"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-blue-600">{job.companyName}</h3>
              {job.isStatic && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  Official
                </span>
              )}
              {!job.isStatic && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                  Alumni Posted
                </span>
              )}
            </div>

            <p className="text-gray-700 font-semibold text-md mb-2">{job.role}</p>

            {job.salary && (
              <p className="text-gray-600 text-sm mb-2">
                💰 {job.salary}
              </p>
            )}

            {job.location && (
              <p className="text-gray-600 text-sm mb-3">
                📍 {job.location}
              </p>
            )}

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              View Details →
            </button>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No jobs found matching your search</p>
        </div>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 sticky top-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold">{selectedJob.companyName}</h2>
                  <p className="text-blue-100 text-lg mt-2">{selectedJob.role}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-2xl font-bold hover:scale-110 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Key Info */}
              <div className="grid md:grid-cols-2 gap-6">
                {selectedJob.salary && (
                  <div>
                    <h3 className="text-gray-600 text-sm font-semibold">Salary Range</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {selectedJob.salary}
                    </p>
                  </div>
                )}
                {selectedJob.location && (
                  <div>
                    <h3 className="text-gray-600 text-sm font-semibold">Location</h3>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {selectedJob.location}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedJob.description && (
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-3">About this role</h3>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {selectedJob.description}
                  </p>
                </div>
              )}

              {/* Requirements */}
              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="text-blue-600 font-bold">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Posted By */}
              {selectedJob.postedBy && !selectedJob.isStatic && (
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <p className="text-gray-700">
                    <span className="font-semibold">Posted by:</span> {selectedJob.postedBy.name} 
                    ({selectedJob.postedBy.company})
                  </p>
                </div>
              )}

              {/* Apply Button */}
              {selectedJob.applyLink && (
                <a
                  href={selectedJob.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition"
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