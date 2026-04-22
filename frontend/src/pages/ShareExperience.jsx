import { useState } from "react";
import axios from "axios";

export default function ShareExperience({ refresh }) {

  const [form, setForm] = useState({
    alumniName: "",
    companyName: "",
    role: "",
    roundsCount: "",
    overallExperience: "",
    suggestion: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/experience",
        form
      );

      setMessage("✅ Experience Shared Successfully!");

      // Clear form after submit
      setForm({
        alumniName: "",
        companyName: "",
        role: "",
        roundsCount: "",
        overallExperience: "",
        suggestion: ""
      });

      refresh(); // refresh dashboard

    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit experience");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Share Interview Experience
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="alumniName"
          placeholder="Your Name"
          value={form.alumniName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role / Position"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="number"
          name="roundsCount"
          placeholder="Number of Rounds"
          value={form.roundsCount}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          name="overallExperience"
          placeholder="Overall Experience"
          value={form.overallExperience}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          rows="3"
        />

        <textarea
          name="suggestion"
          placeholder="Suggestions for Students"
          value={form.suggestion}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          rows="3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit Experience"}
        </button>

        {message && (
          <div className={`p-3 rounded-lg text-center font-medium 
            ${message.startsWith("❌") 
              ? "bg-red-100 text-red-700" 
              : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}

      </form>
    </div>
  );
}