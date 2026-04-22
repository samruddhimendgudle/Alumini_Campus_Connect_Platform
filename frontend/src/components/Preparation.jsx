export default function Preparation() {

  const tips = [
    "Practice DSA daily",
    "Prepare Aptitude and Logical Reasoning",
    "Revise DBMS, OS, CN",
    "Practice coding on LeetCode",
    "Take mock interviews"
  ];

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Placement Preparation
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {tips.map((tip, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow">
            📌 {tip}
          </div>
        ))}

      </div>

    </div>
  );
}