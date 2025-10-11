import PatientList from "../components/PatientList";

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto">
      <PatientList />
    </div>
  );
}
