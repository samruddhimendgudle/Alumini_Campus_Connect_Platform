import { useState } from "react";

export default function StudentRequests() {

  // dummy request data (replace with API later)
  const [requests, setRequests] = useState([
    { id: 1, name: "Aman", status: "pending" },
    { id: 2, name: "Neha", status: "pending" },
    { id: 3, name: "Ravi", status: "accepted" }
  ]);

  // accept request
  const handleAccept = (id) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: "accepted" } : r
      )
    );
  };

  // reject request
  const handleReject = (id) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: "rejected" } : r
      )
    );
  };

  const total = requests.length;
  const pending = requests.filter(r => r.status === "pending").length;
  const accepted = requests.filter(r => r.status === "accepted").length;

  return (
    <div className="p-6">

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Total</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-2xl font-bold">{pending}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-gray-500">Accepted</h2>
          <p className="text-2xl font-bold">{accepted}</p>
        </div>

      </div>

      {/* REQUEST LIST */}
      <div className="space-y-4">

        {requests.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded shadow flex justify-between items-center">

            <div>
              <h3 className="font-bold">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.status}</p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => handleAccept(r.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => handleReject(r.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}