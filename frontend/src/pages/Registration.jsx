import { useState } from "react";

export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    college: "",
    branch: "",
    graduationYear: "",
    company: "",
    jobRole: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful");
      } else {
        alert(data.msg || "Error");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Join Alumni Connect
        </h2>

        {/* Role Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => handleRoleChange("student")}
            className={`w-1/2 py-2 rounded-xl font-medium transition ${
              formData.role === "student"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600"
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("alumni")}
            className={`w-1/2 py-2 rounded-xl font-medium transition ${
              formData.role === "alumni"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600"
            }`}
          >
            Alumni
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Common Fields */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />

          {/* Academic Info */}
          <input
            type="text"
            name="college"
            placeholder="College Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch / Stream"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
          />

          <input
            type="number"
            name="graduationYear"
            placeholder="Graduation Year"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
          />

          {/* Alumni Fields */}
          {formData.role === "alumni" && (
            <>
              <input
                type="text"
                name="company"
                placeholder="Current Company"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={handleChange}
              />

              <input
                type="text"
                name="jobRole"
                placeholder="Job Role"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={handleChange}
              />
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register as {formData.role}
          </button>
        </form>
      </div>
    </div>
  );
}