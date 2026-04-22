export default function ExperienceList({ experiences }) {

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Your Shared Experiences
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {experiences.map((exp) => (
          <div key={exp._id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">

            <h3 className="text-lg font-bold text-indigo-600">
              {exp.companyName}
            </h3>

            <p className="text-gray-600 mt-2">
              Role: {exp.role}
            </p>

            <p className="text-gray-600">
              Rounds: {exp.roundsCount}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}