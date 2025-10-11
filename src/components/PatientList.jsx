import { useEffect, useState } from "react";
import { getPatients } from "../services/fhirService";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients(search, page);
  }, [page]);

  async function fetchPatients(searchTerm = "", pageNum = 1) {
    setLoading(true);
    try {
      const data = await getPatients(searchTerm, pageNum);
      const entries = data.entry || [];
      const mapped = entries.map((e) => ({
        id: e.resource.id,
        name:
          e.resource.name?.[0]?.given?.join(" ") +
          " " +
          (e.resource.name?.[0]?.family || ""),
        gender: e.resource.gender || "-",
        birthDate: e.resource.birthDate || "-",
      }));
      setPatients(mapped);
    } catch (err) {
      console.error("Error fetching patients:", err);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPatients(search, 1);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        FHIR Patient Viewer
      </h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-5 py-3 hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="py-3 px-5 border-b">ID</th>
                <th className="py-3 px-5 border-b">Name</th>
                <th className="py-3 px-5 border-b">Gender</th>
                <th className="py-3 px-5 border-b">Birth Date</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={idx % 2 === 0 ? "bg-gray-500" : "bg-gray-600"}
                  >
                    <td className="py-2 px-5">{p.id}</td>
                    <td className="py-2 px-5">{p.name || "Unknown"}</td>
                    <td className="py-2 px-5 capitalize">{p.gender}</td>
                    <td className="py-2 px-5">{p.birthDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-900">
                    Aucun patient trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition-colors"
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
