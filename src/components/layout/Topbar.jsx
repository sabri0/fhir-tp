export default function Topbar() {
  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm">
      <h1 className="text-xl font-semibold text-gray-700">
        Patient Management
      </h1>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-blue-600 text-white flex items-center justify-center rounded-full">
          SB
        </div>
      </div>
    </div>
  );
}
