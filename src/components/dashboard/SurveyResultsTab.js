import React, { useState, useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { Users, FileText, BarChart3, Database } from "lucide-react";

export default function SurveyResultsTab() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/responses')
      .then(res => res.json())
      .then(data => {
        setResponses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching responses:", err);
        setLoading(false);
        // Fallback to local storage if backend is not running
        try {
          const localData = JSON.parse(localStorage.getItem("survey_responses") || "[]");
          setResponses(localData);
        } catch {
          // ignore
        }
      });
  }, []);

  const COLORS = ["#ccff00", "#a3cc00", "#7a9900", "#526600", "#3d4d00", "#293300", "#f4ffb3"];

  // Compute stats
  const stats = useMemo(() => {
    const roles = {};
    const ages = {};
    const problems = {};

    responses.forEach(r => {
      // Role
      if (r.role) roles[r.role] = (roles[r.role] || 0) + 1;
      // Age
      if (r.age) ages[r.age] = (ages[r.age] || 0) + 1;
      // Problems (multi-select array)
      if (Array.isArray(r.problems)) {
        r.problems.forEach(p => {
          problems[p] = (problems[p] || 0) + 1;
        });
      }
    });

    const roleData = Object.entries(roles).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
    const ageData = Object.entries(ages).map(([name, value]) => ({ name, value }));
    const problemsData = Object.entries(problems).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);

    return { roleData, ageData, problemsData };
  }, [responses]);

  if (responses.length === 0) {
    return (
      <div className="card text-center py-20 flex flex-col items-center justify-center">
        <Database className="w-10 h-10 text-ink-600 mb-4" />
        <h3 className="font-display text-xl text-white font-semibold">No responses yet</h3>
        <p className="text-ink-600 mt-2 text-sm">When users complete the empathy survey, their data will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-volt/10 flex items-center justify-center text-volt">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-ink-600">Total Submissions</div>
            <div className="font-display text-3xl font-bold mt-1 text-white">{responses.length}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Roles Pie Chart */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-volt" />
            <div className="font-display font-semibold text-lg">Respondents by Role</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.roleData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                  {stats.roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: "#1A1A1E", border: "1px solid #27272A" }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Age Distribution */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-volt" />
            <div className="font-display font-semibold text-lg">Age Distribution</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.ageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                <XAxis dataKey="name" stroke="#52525B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525B" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: "#1A1A1E", border: "1px solid #27272A" }}
                  cursor={{ fill: "#27272A" }}
                />
                <Bar dataKey="value" fill="#ccff00" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top Problems Bar Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-volt" />
            <div className="font-display font-semibold text-lg">Top Operational Problems</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.problemsData} layout="vertical" margin={{ top: 0, right: 30, left: 150, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" horizontal={false} />
                <XAxis type="number" stroke="#52525B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} width={150} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: "#1A1A1E", border: "1px solid #27272A" }}
                  cursor={{ fill: "#27272A" }}
                />
                <Bar dataKey="value" fill="#ccff00" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Raw Data Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center gap-2 mb-6 p-1">
          <FileText className="w-5 h-5 text-volt" />
          <div className="font-display font-semibold text-lg">Raw Submissions Log</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-ink-700">
            <thead className="bg-ink-50/50 text-ink-600 font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3 border-y border-ink-300 whitespace-nowrap">Date</th>
                <th className="p-3 border-y border-ink-300">Name</th>
                <th className="p-3 border-y border-ink-300">Email</th>
                <th className="p-3 border-y border-ink-300">Role</th>
                <th className="p-3 border-y border-ink-300">Biggest Challenge</th>
                <th className="p-3 border-y border-ink-300">Willing to Pay?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-300">
              {responses.map((r, i) => (
                <tr key={i} className="hover:bg-ink-100/50 transition-colors">
                  <td className="p-3 whitespace-nowrap font-mono text-xs">{r.timestamp ? new Date(r.timestamp).toLocaleDateString() : "-"}</td>
                  <td className="p-3 text-white">{r.name || "-"}</td>
                  <td className="p-3">{r.email || "-"}</td>
                  <td className="p-3">{r.role || "-"}</td>
                  <td className="p-3 max-w-xs truncate">{r.biggest_challenge || "-"}</td>
                  <td className="p-3 font-medium text-volt">{r.willing_to_pay || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
