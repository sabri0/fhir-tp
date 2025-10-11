import { useEffect, useState } from "react";
import { getPatients } from "../services/fhirService";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    setLoading(true);
    try {
      const data = await getPatients("", 1, 200);
      const entries = data.entry || [];
      const mapped = entries.map((e) => ({
        gender: e.resource.gender || "unknown",
        birthDate: e.resource.birthDate || null,
      }));
      setPatients(mapped);
    } finally {
      setLoading(false);
    }
  }

  const genderData = [
    { name: "Male", value: patients.filter((p) => p.gender === "male").length },
    {
      name: "Female",
      value: patients.filter((p) => p.gender === "female").length,
    },
    {
      name: "Unknown",
      value: patients.filter((p) => p.gender === "unknown").length,
    },
  ];
  const COLORS = ["#3B82F6", "#EC4899", "#9CA3AF"];

  const getAge = (birthDate) => {
    if (!birthDate) return null;
    const diff = new Date().getFullYear() - new Date(birthDate).getFullYear();
    return diff >= 0 ? diff : null;
  };

  const ageGroups = [
    { label: "0-10", count: 0 },
    { label: "11-20", count: 0 },
    { label: "21-40", count: 0 },
    { label: "41-60", count: 0 },
    { label: "61+", count: 0 },
  ];

  patients.forEach((p) => {
    const age = getAge(p.birthDate);
    if (age === null) return;
    if (age <= 10) ageGroups[0].count++;
    else if (age <= 20) ageGroups[1].count++;
    else if (age <= 40) ageGroups[2].count++;
    else if (age <= 60) ageGroups[3].count++;
    else ageGroups[4].count++;
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Patient Analytics</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender Distribution */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Gender Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie dataKey="value" data={genderData} outerRadius={100} label>
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Age Distribution */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Age Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageGroups}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
