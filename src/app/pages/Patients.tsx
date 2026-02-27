import { Search, Filter, MoreHorizontal, User } from "lucide-react";

export function Patients() {
  const patients = [
    { id: 1, name: "John Doe", age: 72, lastVisit: "Feb 28, 2024", status: "Active", risk: "Low" },
    { id: 2, name: "Sarah Smith", age: 68, lastVisit: "Feb 25, 2024", status: "Active", risk: "Moderate" },
    { id: 3, name: "Robert Johnson", age: 81, lastVisit: "Feb 20, 2024", status: "Inactive", risk: "High" },
    { id: 4, name: "Emily Davis", age: 75, lastVisit: "Feb 18, 2024", status: "Active", risk: "Low" },
    { id: 5, name: "Michael Wilson", age: 69, lastVisit: "Feb 15, 2024", status: "Active", risk: "Low" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Registry</h1>
          <p className="text-slate-500 text-sm">Manage patient records and assessment history.</p>
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          Add New Patient
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search patients by name or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm hover:bg-slate-50">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Last Assessment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Risk Profile</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                        <User size={14} />
                      </div>
                      <span className="font-medium text-slate-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{patient.age}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.risk === 'High' ? 'bg-red-100 text-red-700' : 
                      patient.risk === 'Moderate' ? 'bg-amber-100 text-amber-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {patient.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600 p-1">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
