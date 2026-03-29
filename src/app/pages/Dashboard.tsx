// // import { useNavigate } from "react-router";
// // import { 
// //   Activity, 
// //   Brain, 
// //   ChevronRight, 
// //   Clock, 
// //   Lock, 
// //   Mic, 
// //   PenTool,
// //   Calendar,
// //   Users,
// //   FileText
// // } from "lucide-react";
// // import { motion } from "motion/react";

// // export function Dashboard() {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="space-y-8">
// //       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
// //         <div>
// //           <h1 className="text-3xl font-bold text-slate-900">Assessment Hub</h1>
// //           <p className="text-slate-500 mt-1">Manage patient evaluations and review cognitive analytics.</p>
// //         </div>
// //         <div className="flex gap-3">
// //           <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium text-sm flex items-center gap-2 hover:bg-slate-50">
// //             <Calendar size={16} />
// //             Schedule
// //           </button>
// //           <button className="px-4 py-2 bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-800 shadow-sm shadow-blue-200">
// //             <Users size={16} />
// //             New Patient
// //           </button>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {/* Active Module */}
// //         <motion.div
// //           whileHover={{ y: -4 }}
// //           className="col-span-1 md:col-span-1 h-full"
// //         >
// //           <button
// //             onClick={() => navigate("/assessment")}
// //             className="w-full h-full text-left bg-white rounded-xl p-8 shadow-sm border-2 border-blue-600 relative overflow-hidden group hover:shadow-md transition-all"
// //           >
// //             <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
// //               Recommended
// //             </div>
// //             <div className="flex items-start justify-between mb-6">
// //               <div className="p-4 bg-blue-50 rounded-xl text-blue-700 ring-1 ring-blue-100">
// //                 <PenTool size={32} />
// //               </div>
// //               <div className="flex items-center text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
// //                 <Clock size={14} className="mr-1.5" />
// //                 <span className="text-xs font-medium">2 mins</span>
// //               </div>
// //             </div>
// //             <div>
// //               <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
// //                 Motor & Spatial Memory
// //               </h3>
// //               <p className="text-sm text-slate-500 mt-2 leading-relaxed">
// //                 Analyze micro-movements and handwriting patterns to detect early cognitive markers.
// //               </p>
// //             </div>
// //             <div className="mt-8 flex items-center text-blue-600 text-sm font-semibold group-hover:underline decoration-2 underline-offset-4">
// //               Start Assessment <ChevronRight size={16} className="ml-1" />
// //             </div>
// //           </button>
// //         </motion.div>

// //         {/* Locked Modules */}
// //         <div className="opacity-60 grayscale cursor-not-allowed">
// //           <div className="w-full h-full text-left bg-white rounded-xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
// //             <div className="flex items-start justify-between mb-6">
// //               <div className="p-4 bg-slate-100 rounded-xl text-slate-500">
// //                 <Mic size={32} />
// //               </div>
// //               <Lock size={20} className="text-slate-300" />
// //             </div>
// //             <div>
// //               <h3 className="text-xl font-bold text-slate-900">
// //                 Speech Analysis
// //               </h3>
// //               <p className="text-sm text-slate-500 mt-2">
// //                 Voice biomarkers for lexical diversity and pause patterns.
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="opacity-60 grayscale cursor-not-allowed">
// //           <div className="w-full h-full text-left bg-white rounded-xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
// //             <div className="flex items-start justify-between mb-6">
// //               <div className="p-4 bg-slate-100 rounded-xl text-slate-500">
// //                 <Brain size={32} />
// //               </div>
// //               <Lock size={20} className="text-slate-300" />
// //             </div>
// //             <div>
// //               <h3 className="text-xl font-bold text-slate-900">
// //                 Behavioral Pattern
// //               </h3>
// //               <p className="text-sm text-slate-500 mt-2">
// //                 Daily activity monitoring and sleep cycle analysis.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Recent Activity Section */}
// //       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
// //         <div className="p-6 border-b border-slate-100 flex items-center justify-between">
// //           <h2 className="font-bold text-lg text-slate-900">Recent Evaluations</h2>
// //           <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
// //         </div>
// //         <div className="divide-y divide-slate-100">
// //           {[1, 2, 3].map((i) => (
// //             <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
// //               <div className="flex items-center gap-4">
// //                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium">
// //                   JD
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-semibold text-slate-900">John Doe</p>
// //                   <p className="text-xs text-slate-500">Motor Assessment • Feb {28 - i}, 2024</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-4">
// //                 <span className={`text-xs font-bold px-2 py-1 rounded-full ${i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
// //                   {i === 1 ? 'Requires Review' : 'Normal'}
// //                 </span>
// //                 <button className="text-slate-400 hover:text-blue-600">
// //                   <FileText size={18} />
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useNavigate } from "react-router";
// import {
//   Activity,
//   Brain,
//   ChevronRight,
//   Clock,
//   Mic,
//   PenTool,
//   Calendar,
//   Users,
//   FileText
// } from "lucide-react";
// import { motion } from "motion/react";

// export function Dashboard() {
//   const navigate = useNavigate();

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">Assessment Hub</h1>
//           <p className="text-slate-500 mt-1">Manage patient evaluations and review multimodal cognitive analytics.</p>
//         </div>
//         <div className="flex gap-3">
//           <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium text-sm flex items-center gap-2 hover:bg-slate-50">
//             <Calendar size={16} />
//             Schedule
//           </button>
//           <button className="px-4 py-2 bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-800 shadow-sm shadow-blue-200">
//             <Users size={16} />
//             New Patient
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Active Module 1: Motor */}
//         <motion.div
//           whileHover={{ y: -4 }}
//           className="col-span-1 md:col-span-1 h-full"
//         >
//           <button
//             onClick={() => navigate("/assessment")}
//             className="w-full h-full text-left bg-white rounded-xl p-8 shadow-sm border-2 border-blue-600 relative overflow-hidden group hover:shadow-md transition-all"
//           >
//             <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
//               Modality A
//             </div>
//             <div className="flex items-start justify-between mb-6">
//               <div className="p-4 bg-blue-50 rounded-xl text-blue-700 ring-1 ring-blue-100 group-hover:scale-110 transition-transform">
//                 <PenTool size={32} />
//               </div>
//               <div className="flex items-center text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
//                 <Clock size={14} className="mr-1.5" />
//                 <span className="text-xs font-medium">2 mins</span>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
//                 Motor & Spatial
//               </h3>
//               <p className="text-sm text-slate-500 mt-2 leading-relaxed">
//                 Analyze micro-movements and handwriting patterns to detect early cognitive markers.
//               </p>
//             </div>
//             <div className="mt-8 flex items-center text-blue-600 text-sm font-semibold group-hover:underline decoration-2 underline-offset-4">
//               Start Assessment <ChevronRight size={16} className="ml-1" />
//             </div>
//           </button>
//         </motion.div>

//         {/* Active Module 2: Speech (NOW UNLOCKED) */}
//         <motion.div
//           whileHover={{ y: -4 }}
//           className="col-span-1 md:col-span-1 h-full"
//         >
//           <button
//             onClick={() => navigate("/assessment")}
//             className="w-full h-full text-left bg-white rounded-xl p-8 shadow-sm border-2 border-amber-500 relative overflow-hidden group hover:shadow-md transition-all"
//           >
//             <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
//               Modality B
//             </div>
//             <div className="flex items-start justify-between mb-6">
//               <div className="p-4 bg-amber-50 rounded-xl text-amber-600 ring-1 ring-amber-100 group-hover:scale-110 transition-transform">
//                 <Mic size={32} />
//               </div>
//               <div className="flex items-center text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
//                 <Clock size={14} className="mr-1.5" />
//                 <span className="text-xs font-medium">5 mins</span>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
//                 Speech Analysis
//               </h3>
//               <p className="text-sm text-slate-500 mt-2 leading-relaxed">
//                 Analyze acoustic features and linguistic diversity utilizing the Pitt Corpus dataset.
//               </p>
//             </div>
//             <div className="mt-8 flex items-center text-amber-600 text-sm font-semibold group-hover:underline decoration-2 underline-offset-4">
//               Start Assessment <ChevronRight size={16} className="ml-1" />
//             </div>
//           </button>
//         </motion.div>

//         {/* Active Module 3: Behavioral (NOW UNLOCKED) */}
//         <motion.div
//           whileHover={{ y: -4 }}
//           className="col-span-1 md:col-span-1 h-full"
//         >
//           <button
//             onClick={() => navigate("/assessment")}
//             className="w-full h-full text-left bg-white rounded-xl p-8 shadow-sm border-2 border-purple-500 relative overflow-hidden group hover:shadow-md transition-all"
//           >
//             <div className="absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
//               Modality C
//             </div>
//             <div className="flex items-start justify-between mb-6">
//               <div className="p-4 bg-purple-50 rounded-xl text-purple-600 ring-1 ring-purple-100 group-hover:scale-110 transition-transform">
//                 <Brain size={32} />
//               </div>
//               <div className="flex items-center text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
//                 <Clock size={14} className="mr-1.5" />
//                 <span className="text-xs font-medium">1 min</span>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
//                 Behavioral Pattern
//               </h3>
//               <p className="text-sm text-slate-500 mt-2 leading-relaxed">
//                 Analyze finger tapping speed and in-app cognitive behavioral interaction logs.
//               </p>
//             </div>
//             <div className="mt-8 flex items-center text-purple-600 text-sm font-semibold group-hover:underline decoration-2 underline-offset-4">
//               Start Assessment <ChevronRight size={16} className="ml-1" />
//             </div>
//           </button>
//         </motion.div>

//       </div>

//       {/* Recent Activity Section */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="p-6 border-b border-slate-100 flex items-center justify-between">
//           <h2 className="font-bold text-lg text-slate-900">Recent Multimodal Evaluations</h2>
//           <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
//         </div>
//         <div className="divide-y divide-slate-100">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium">
//                   JD
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-slate-900">John Doe</p>
//                   <p className="text-xs text-slate-500">Late Fusion Review • Feb {28 - i}, 2026</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <span className={`text-xs font-bold px-2 py-1 rounded-full ${i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
//                   {i === 1 ? 'Requires Review' : 'Normal'}
//                 </span>
//                 <button className="text-slate-400 hover:text-blue-600">
//                   <FileText size={18} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Brain,
  Clock,
  Mic,
  PenTool,
  Calendar,
  Users,
  FileText,
  PlayCircle
} from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Assessment Hub</h1>
          <p className="text-slate-500 mt-1">Manage patient evaluations and review multimodal cognitive analytics.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Calendar size={16} />
            Schedule
          </button>
          <button className="px-4 py-2 bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-800 shadow-sm shadow-blue-200 transition-colors">
            <Users size={16} />
            New Patient
          </button>
        </div>
      </div>

      {/* MAIN HERO ACTION CARD - Unified Multimodal Launch */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-600">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/50 border border-blue-400/50 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Activity size={14} />
            Neurova Late Fusion Engine
          </div>
          <h2 className="text-3xl font-bold mb-3">Comprehensive Multimodal Assessment</h2>
          <p className="text-blue-100 max-w-2xl leading-relaxed">
            Launch a unified cognitive evaluation session. The patient will complete Motor, Speech, and Behavioral tasks in a single flow. The data is processed simultaneously to generate a highly accurate Cognitive Risk Score.
          </p>
        </div>
        <button
          onClick={() => navigate("/assessment")}
          className="w-full md:w-auto px-8 py-4 bg-white text-blue-800 font-bold rounded-xl hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 shrink-0"
        >
          <PlayCircle size={24} className="text-blue-600" />
          Start Unified Assessment
        </button>
      </div>

      {/* INFORMATIONAL MODULES (Non-clickable, shows what is inside the test) */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          Included Modalities <span className="text-sm font-normal text-slate-500">(Est. Total Time: 8 mins)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Info Card 1: Motor */}
          <div className="col-span-1 bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Modality A
            </div>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 ring-1 ring-blue-100">
                <PenTool size={24} />
              </div>
              <div className="flex items-center text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                <Clock size={12} className="mr-1.5" />
                <span className="text-xs font-medium">2 mins</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Motor & Spatial</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Analyzes micro-movements, kinematic features, and handwriting patterns via digital drawing.
              </p>
            </div>
          </div>

          {/* Info Card 2: Speech */}
          <div className="col-span-1 bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Modality B
            </div>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600 ring-1 ring-amber-100">
                <Mic size={24} />
              </div>
              <div className="flex items-center text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                <Clock size={12} className="mr-1.5" />
                <span className="text-xs font-medium">5 mins</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Speech Analysis</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Evaluates acoustic features and linguistic diversity utilizing the Pitt Corpus picture description task.
              </p>
            </div>
          </div>

          {/* Info Card 3: Behavioral */}
          <div className="col-span-1 bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Modality C
            </div>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600 ring-1 ring-purple-100">
                <Brain size={24} />
              </div>
              <div className="flex items-center text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                <Clock size={12} className="mr-1.5" />
                <span className="text-xs font-medium">1 min</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Behavioral Pattern</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Captures processing speed and cognitive behavioral interaction logs via in-app tapping tests.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-8">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-slate-900">Recent Multimodal Evaluations</h2>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">John Doe</p>
                  <p className="text-xs text-slate-500">Late Fusion Review • Feb {28 - i}, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                  {i === 1 ? 'Requires Review' : 'Normal'}
                </span>
                <button className="text-slate-400 hover:text-blue-600 transition-colors">
                  <FileText size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}