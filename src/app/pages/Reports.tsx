import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { Download, Calendar } from "lucide-react";

export function Reports() {
  const weeklyData = [
    { name: 'Mon', assessments: 4 },
    { name: 'Tue', assessments: 7 },
    { name: 'Wed', assessments: 5 },
    { name: 'Thu', assessments: 8 },
    { name: 'Fri', assessments: 6 },
    { name: 'Sat', assessments: 2 },
    { name: 'Sun', assessments: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics Reports</h1>
          <p className="text-slate-500 text-sm">Clinic-wide performance and assessment statistics.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 text-sm hover:bg-slate-50">
            <Calendar size={16} />
            Last 7 Days
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800">
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-6">Weekly Assessment Volume</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="assessments" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-6">Risk Distribution Trend</h3>
          <div className="h-64 w-full flex items-center justify-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <span className="text-sm">More data needed to generate trend analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
