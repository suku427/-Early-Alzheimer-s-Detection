import { Bell, Shield, User, Smartphone, Globe } from "lucide-react";

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account preferences and application settings.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
        <div className="p-6 flex items-start gap-4">
          <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
            <User size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900">Profile Information</h3>
            <p className="text-sm text-slate-500 mb-4">Update your photo and personal details.</p>
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">First Name</label>
                <input type="text" defaultValue="Sarah" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Last Name</label>
                <input type="text" defaultValue="Jensen" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
            </div>
          </div>
          <button className="text-sm text-blue-700 font-medium hover:underline">Edit</button>
        </div>

        <div className="p-6 flex items-start gap-4">
          <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
            <Bell size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900">Notifications</h3>
            <p className="text-sm text-slate-500">Manage how you receive alerts and updates.</p>
          </div>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
             <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-blue-600"/>
             <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer"></label>
          </div>
        </div>

        <div className="p-6 flex items-start gap-4">
          <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
            <Shield size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900">Security</h3>
            <p className="text-sm text-slate-500">Password, 2FA, and session management.</p>
          </div>
          <button className="text-sm text-slate-600 font-medium hover:text-slate-900">Manage</button>
        </div>
      </div>
    </div>
  );
}
