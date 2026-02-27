import { Outlet, useLocation, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import { Activity, Menu, User } from "lucide-react";

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 flex flex-col">
      {/* Desktop Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-700 text-white p-1.5 rounded-lg">
              <Activity size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CogniCare</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Dashboard</Link>
            <Link to="/patients" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Patients</Link>
            <Link to="/reports" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Reports</Link>
            <Link to="/settings" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Settings</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-slate-900">Dr. Sarah Jensen</p>
              <p className="text-xs text-slate-500">Neurology Specialist</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
              SJ
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}
