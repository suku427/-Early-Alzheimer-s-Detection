import { useLocation, useNavigate } from "react-router";
import { ArrowLeft, Share2, Download, AlertCircle, CheckCircle, Printer, Mail } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";

export function Results() {
  const navigate = useNavigate();
  // const location = useLocation(); // In real app, access state
  
  const riskScore = 82; 
  const riskPercentage = 18;
  const isHighRisk = riskPercentage > 50;
  
  const data = [
    { name: 'Risk', value: riskPercentage },
    { name: 'Healthy', value: 100 - riskPercentage },
  ];
  
  const COLORS = isHighRisk ? ['#ef4444', '#e2e8f0'] : ['#22c55e', '#e2e8f0'];

  const features = [
    {
      label: "Avg Speed",
      value: "4.2 cm/s",
      status: "Normal",
      color: "text-green-700",
      bg: "bg-green-100",
      desc: "Within expected range for age group"
    },
    {
      label: "Pressure Var",
      value: "0.85",
      status: "Optimal",
      color: "text-blue-700",
      bg: "bg-blue-100",
      desc: "Consistent pen pressure maintained"
    },
    {
      label: "Stroke Jerk",
      value: "Low",
      status: "Good",
      color: "text-green-700",
      bg: "bg-green-100",
      desc: "Smooth motion without tremors"
    },
    {
      label: "Pause Ratio",
      value: "12%",
      status: "Elevated",
      color: "text-amber-700",
      bg: "bg-amber-100",
      desc: "Slightly higher than baseline"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/")}
            className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-300 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Clinical Analysis Report</h1>
            <p className="text-slate-500 text-sm">Generated on Feb 28, 2026 • 10:42 AM</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium text-sm flex items-center gap-2 hover:bg-slate-50">
            <Printer size={16} />
            Print
          </button>
          <button className="px-4 py-2 bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-800 shadow-sm shadow-blue-200">
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Key Findings */}
        <div className="space-y-6">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col items-center text-center"
           >
             <h3 className="font-bold text-slate-900 mb-6 w-full text-left">Cognitive Risk Assessment</h3>
             <div className="relative w-56 h-32 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={data}
                       cx="50%"
                       cy="100%"
                       startAngle={180}
                       endAngle={0}
                       innerRadius={70}
                       outerRadius={90}
                       paddingAngle={0}
                       dataKey="value"
                       stroke="none"
                     >
                       {data.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                     </Pie>
                   </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-x-0 bottom-0 text-center flex flex-col items-center justify-end pb-2">
                   <span className={`text-4xl font-bold leading-none ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>
                     {riskPercentage}%
                   </span>
                   <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mt-1">Probability</p>
                </div>
             </div>
             
             <div className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${isHighRisk ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
               {isHighRisk ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
               {isHighRisk ? "Potential Concern Detected" : "Low Cognitive Risk Detected"}
             </div>
             
             <p className="text-slate-600 text-sm leading-relaxed text-left bg-slate-50 p-4 rounded-lg border border-slate-100 w-full">
               The motor patterns suggest <strong>healthy cognitive function</strong> with normal spatial planning and execution. No significant deviations in velocity or pressure were observed compared to baseline population data.
             </p>
           </motion.div>

           <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
             <h3 className="font-bold text-slate-900 mb-4">Clinician Notes</h3>
             <textarea 
               className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
               placeholder="Add clinical observations here..."
             />
             <div className="mt-3 flex justify-end">
                <button className="text-sm text-blue-700 font-medium hover:underline">Save Notes</button>
             </div>
           </div>
        </div>

        {/* Middle Column: Detailed Metrics */}
        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-slate-500 font-medium">{feature.label}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${feature.bg} ${feature.color} border border-transparent`}>
                      {feature.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{feature.value}</div>
                  <p className="text-xs text-slate-400">{feature.desc}</p>
                </motion.div>
              ))}
           </div>

           {/* Visualization Section */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row h-96">
             <div className="p-6 md:w-1/2 flex flex-col">
                <h3 className="font-bold text-slate-900 mb-2">Motion Heatmap</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Visual representation of hesitation points and pressure variance. Red zones indicate high irregularity.
                </p>
                <div className="flex-1 border border-slate-100 rounded-lg bg-slate-50 relative flex items-center justify-center overflow-hidden">
                   {/* Abstract representation of the drawn path with heat spots */}
                   <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                      <path 
                        d="M100 100 m-5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M100 90 a 15 15 0 1 1 0 30 a 15 15 0 1 1 0 -30 M100 80 a 25 25 0 1 0 0 50 a 25 25 0 1 0 0 -50"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <path 
                        d="M100 100 m-5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M100 90 a 15 15 0 1 1 0 30 a 15 15 0 1 1 0 -30 M100 80 a 25 25 0 1 0 0 50 a 25 25 0 1 0 0 -50"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))" }}
                      />
                      {/* Heatmap spots */}
                      <circle cx="120" cy="100" r="10" fill="rgba(239, 68, 68, 0.4)" style={{mixBlendMode: 'multiply'}} filter="url(#blur)" />
                      <circle cx="85" cy="115" r="8" fill="rgba(239, 68, 68, 0.3)" style={{mixBlendMode: 'multiply'}} filter="url(#blur)" />
                      
                      <defs>
                        <filter id="blur">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                        </filter>
                      </defs>
                   </svg>
                </div>
             </div>
             
             <div className="p-6 md:w-1/2 border-t md:border-t-0 md:border-l border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 mb-4">Detailed Breakdown</h3>
                <div className="space-y-4">
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-600">Velocity Consistency</span>
                       <span className="font-bold text-slate-900">82/100</span>
                     </div>
                     <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-600 rounded-full" style={{ width: '82%' }}></div>
                     </div>
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-600">Pressure Stability</span>
                       <span className="font-bold text-slate-900">95/100</span>
                     </div>
                     <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }}></div>
                     </div>
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-600">Tremor Analysis</span>
                       <span className="font-bold text-slate-900">Low</span>
                     </div>
                     <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                     </div>
                   </div>
                   
                   <div className="mt-8 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 leading-snug">
                     <strong>AI Insight:</strong> The subject demonstrates high motor control. Minor hesitations in the upper quadrant (Sector 2) are within normal deviation limits.
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
