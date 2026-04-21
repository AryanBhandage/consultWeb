import React from "react";

export default function SettingsTab({ session }) {
  return (
    <div className="space-y-6 animate-slideUp max-w-2xl">
      <div className="card">
        <div className="overline mb-6">Account Settings</div>
        <div className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input type="text" className="input-field" defaultValue={session?.name} />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input type="email" className="input-field" defaultValue={session?.email} readOnly />
          </div>
          <div>
            <label className="label">Company / Workspace</label>
            <input type="text" className="input-field" defaultValue={session?.company} readOnly />
          </div>
          <button className="btn-primary mt-4">Save Changes</button>
        </div>
      </div>
      
      <div className="card">
        <div className="overline mb-6">Preferences</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white text-sm font-medium">Email Notifications</div>
            <div className="text-ink-600 text-xs mt-1">Receive daily metric summaries.</div>
          </div>
          <button className="w-12 h-6 bg-volt rounded-full relative cursor-pointer border border-ink-300">
            <span className="absolute right-1 top-1 w-4 h-4 bg-ink-0 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
