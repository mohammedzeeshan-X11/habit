import React, { useState } from "react";
import { BookOpen, User, Sparkles, TrendingUp, Cpu, Award, Shield, CheckCircle, Smartphone } from "lucide-react";

export default function CompanionPanel() {
  const [panelTab, setPanelTab] = useState<'info' | 'personas' | 'thinking' | 'metrics' | 'guidelines'>('info');

  return (
    <div id="companion-panel" className="bg-white rounded-3xl shadow-md border border-slate-100 p-6 font-sans">
      
      {/* Mini Academic Header Banner */}
      <div id="academic-header-banner" className="bg-gradient-to-r from-teal-800 to-[#2E7D6B] text-white p-5 rounded-2xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl">
            <BookOpen className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight">Academic Companion Hub</h2>
            <p className="text-[11px] text-teal-100 font-light font-mono select-none">
              UI/UX Mini-Project (BCS456C) • Semester V • ISE
            </p>
          </div>
        </div>
      </div>

      {/* Internal Navigation Chips */}
      <div id="companion-tabs-nav" className="flex items-center flex-wrap gap-1.5 p-1 bg-slate-50 rounded-xl mb-6 text-xs">
        <button
          onClick={() => setPanelTab('info')}
          className={`flex-1 py-2 text-center rounded-lg font-medium transition-all ${
            panelTab === 'info' ? 'bg-[#2E7D6B] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100/70'
          }`}
        >
          Project Info
        </button>
        <button
          onClick={() => setPanelTab('personas')}
          className={`flex-1 py-2 text-center rounded-lg font-medium transition-all ${
            panelTab === 'personas' ? 'bg-[#2E7D6B] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100/70'
          }`}
        >
          Personas
        </button>
        <button
          onClick={() => setPanelTab('thinking')}
          className={`flex-1 py-2 text-center rounded-lg font-medium transition-all ${
            panelTab === 'thinking' ? 'bg-[#2E7D6B] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100/70'
          }`}
        >
          Design Thinking
        </button>
        <button
          onClick={() => setPanelTab('metrics')}
          className={`flex-1 py-2 text-center rounded-lg font-medium transition-all ${
            panelTab === 'metrics' ? 'bg-[#2E7D6B] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100/70'
          }`}
        >
          UX Goals
        </button>
        <button
          onClick={() => setPanelTab('guidelines')}
          className={`flex-1 py-2 text-center rounded-lg font-medium transition-all ${
            panelTab === 'guidelines' ? 'bg-[#2E7D6B] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100/70'
          }`}
        >
          Styleguide
        </button>
      </div>

      {/* Tab Panels */}
      <div id="companion-tab-content" className="min-h-[380px] text-sm text-slate-600">
        
        {/* TAB 1: Project Metadata Info */}
        {panelTab === 'info' && (
          <div id="panel-info" className="space-y-5 animate-fadeIn">
            <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-2xl space-y-3">
              <div className="text-center font-bold text-slate-800 text-sm tracking-wide font-sans mb-1 uppercase text-teal-800">
                SAI VIDYA INSTITUTE OF TECHNOLOGY
              </div>
              <p className="text-center text-[11px] text-slate-500 leading-relaxed font-mono">
                Rajanukunte, Bengaluru - 560064<br />
                Dept. of Information Science & Engineering
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className="font-semibold text-slate-800 flex items-center gap-1.5 text-xs text-uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-500" /> Mini Project Credentials
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100/80">
                  <div className="text-slate-400 font-light uppercase tracking-wider text-[9px]">Student Name</div>
                  <div className="font-bold text-slate-700">Mohammed Zeeshan</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100/80">
                  <div className="text-slate-400 font-light uppercase tracking-wider text-[9px]">USN / Registry</div>
                  <div className="font-bold text-slate-700 font-mono">1VA24IS059</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100/80">
                  <div className="text-slate-400 font-light uppercase tracking-wider text-[9px]">Subject Code</div>
                  <div className="font-bold text-slate-700 font-mono">UI/UX (BCS456C)</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100/80">
                  <div className="text-slate-400 font-light uppercase tracking-wider text-[9px]">Academic Year</div>
                  <div className="font-bold text-slate-700">2025 - 2026</div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="font-semibold text-slate-800 flex items-center gap-1.5 text-xs text-uppercase tracking-wider">
                <User className="w-4 h-4 text-teal-600" /> Project Guides & Coordinator
              </h3>
              <div className="space-y-2 text-xs">
                <div className="bg-teal-50/30 p-2.5 rounded-xl flex justify-between items-center border border-teal-100/30">
                  <div>
                    <div className="font-semibold text-slate-800">Prof. Thanuja M</div>
                    <div className="text-[10px] text-slate-500">Assistant Professor, Dept of ISE</div>
                  </div>
                  <span className="px-2 py-0.5 bg-teal-100/60 text-teal-800 rounded font-mono text-[9px]">CO-ORDINATOR</span>
                </div>
                <div className="bg-teal-50/30 p-2.5 rounded-xl flex justify-between items-center border border-teal-100/30">
                  <div>
                    <div className="font-semibold text-slate-800">Prof. Navya B R</div>
                    <div className="text-[10px] text-slate-500">Assistant Professor, Dept of ISE</div>
                  </div>
                  <span className="px-2 py-0.5 bg-teal-100/60 text-teal-800 rounded font-mono text-[9px]">CO-ORDINATOR</span>
                </div>
              </div>
            </div>
            
            <div className="text-xs leading-relaxed text-slate-500 bg-amber-50/30 border border-amber-100/50 p-3 rounded-xl flex gap-2">
              <span className="text-amber-500 font-bold shrink-0">📌 Note:</span>
              <span>
                Use the quick account switcher in the top profile bubble or on the login page to simulate the user journey of different personas!
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: Personas Detail */}
        {panelTab === 'personas' && (
          <div id="panel-personas" className="space-y-4 animate-fadeIn">
            <h3 className="font-semibold text-slate-800 text-xs text-uppercase tracking-wider">
              Academic User Personas (Chapter 3)
            </h3>
            
            {/* Persona 1: Anjali */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/40 relative">
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-[9px] font-semibold font-mono">
                Persona 01
              </div>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-sm">
                  AS
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Anjali Sharma (20 Yrs)</h4>
                  <p className="text-[10px] text-slate-500">2nd Year B.E. Student - ISE</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="font-semibold text-slate-700">Goal: </span>
                  <span className="text-slate-500">Build routine study habits, stay hydrated, and track workout consistency with high motivation.</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Frustration: </span>
                  <span className="text-slate-500">Forgets logging on paper journals, gets demotivated easily if streaks aren't visual/gamified.</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Tech Comfort:</span>
                  <span className="px-1.5 py-0.5 bg-slate-200 text-slate-600 font-mono text-[9px] rounded font-bold">HIGH</span>
                </div>
              </div>
            </div>

            {/* Persona 2: Ravi */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/40 relative">
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-[9px] font-semibold font-mono">
                Persona 02
              </div>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center font-bold text-sm">
                  RK
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Ravi Kumar (23 Yrs)</h4>
                  <p className="text-[10px] text-slate-500">Working Professional - Software Engineer</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="font-semibold text-slate-700">Goal: </span>
                  <span className="text-slate-500">Incorporate small habits (exercise, limit late-night screen time) for premium work-life balance.</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Frustration: </span>
                  <span className="text-slate-500">Habit tools feel bloated or overly complex; forgets when notifications are missing or passive.</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Tech Comfort:</span>
                  <span className="px-1.5 py-0.5 bg-slate-200 text-slate-600 font-mono text-[9px] rounded font-bold">VERY HIGH</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Design Thinking */}
        {panelTab === 'thinking' && (
          <div id="panel-thinking" className="space-y-4 animate-fadeIn text-xs">
            <h3 className="font-semibold text-slate-800 text-xs text-uppercase tracking-wider">
              Structured Design Thinking (Chapter 4)
            </h3>
            
            <div className="space-y-3.5">
              <div className="relative pl-6 border-l-2 border-teal-500/30">
                <div className="absolute left-0 top-0.5 -translate-x-[9px] w-4 h-4 rounded-full bg-teal-500 border-4 border-white"></div>
                <div className="font-bold text-slate-800 text-xs">1. Empathize</div>
                <p className="text-slate-500 mt-0.5 leading-relaxed">
                  Conducted survey queries on 8 participants. Tracked habit dropouts and manual ledger inconsistencies (70% abandon within 2 weeks).
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-teal-500/30">
                <div className="absolute left-0 top-0.5 -translate-x-[9px] w-4 h-4 rounded-full bg-teal-500 border-4 border-white"></div>
                <div className="font-bold text-slate-800 text-xs">2. Define</div>
                <p className="text-slate-500 mt-0.5 leading-relaxed">
                  Formulated precise core statement: "Users lack a single, motivating and simple digital checklist to create, track, and sustain habits consistently."
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-teal-500/30">
                <div className="absolute left-0 top-0.5 -translate-x-[9px] w-4 h-4 rounded-full bg-teal-500 border-4 border-white"></div>
                <div className="font-bold text-slate-800 text-xs">3. Ideate</div>
                <p className="text-slate-500 mt-0.5 leading-relaxed">
                  Mapped feature options. Devised responsive bottom navigation tab structures, elegant color-coded badges, and a lightning-fast one-tap complete check trigger.
                </p>
              </div>

              <div className="relative pl-6">
                <div className="absolute left-0 top-0.5 -translate-x-[7px] w-4 h-4 rounded-full bg-amber-500 border-4 border-white"></div>
                <div className="font-bold text-slate-800 text-xs">4. Prototype & Test</div>
                <p className="text-slate-500 mt-0.5 leading-relaxed">
                  Developed Figma low/high fidelity graphics. Validated screen targets and response speeds directly on dynamic interactive code templates.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: UX Metrics & Targets */}
        {panelTab === 'metrics' && (
          <div id="panel-metrics" className="space-y-4 animate-fadeIn">
            <h3 className="font-semibold text-slate-800 text-xs text-uppercase tracking-wider">
              UX Metrics & Targets (Chapter 7)
            </h3>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Design standards defined to validate if the prototype meets satisfying customer metrics:
            </p>

            <div className="border border-slate-100 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-100 text-[10px] uppercase">
                    <th className="py-2.5 px-3">Metric</th>
                    <th className="py-2.5 px-3">Definition</th>
                    <th className="py-2.5 px-3">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px] text-slate-600">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">Task Time</td>
                    <td className="py-2.5 px-3">Time taken to check-in habit</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-medium">{"< 30 seconds"}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">Error Rate</td>
                    <td className="py-2.5 px-3">Incorrect touches / inputs</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-medium">{"< 5% per task"}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">SUS Score</td>
                    <td className="py-2.5 px-3">System Usability Scale metric</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-medium">{"> 80"}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">Learnability</td>
                    <td className="py-2.5 px-3">Time to self-master layout</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-medium">{"< 5 minutes"}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">Task Success</td>
                    <td className="py-2.5 px-3">Completing flow without help</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-medium">{"> 90%"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3 flex gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed text-slate-600">
                <span className="font-semibold text-emerald-800">Usability Results met:</span> The prototype achieves average completion times of <span className="font-bold text-emerald-800">1.8 seconds</span> for the daily check-in, beating target parameters cleanly.
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Styleguide Design Tokens */}
        {panelTab === 'guidelines' && (
          <div id="panel-guidelines" className="space-y-4 animate-fadeIn text-xs">
            <h3 className="font-semibold text-slate-800 text-xs text-uppercase tracking-wider">
              UX Guidelines & System Tokens (Chapter 9)
            </h3>

            <div className="space-y-3">
              {/* Color System */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-700 mb-2">1. Color Palette</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#2E7D6B] border border-black/5 shadow-sm"></div>
                    <div>
                      <div className="font-semibold text-[11px] text-slate-800">Primary Teal</div>
                      <div className="font-mono text-[9px] text-slate-400">#2E7D6B</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#FF8A3D] border border-black/5 shadow-sm"></div>
                    <div>
                      <div className="font-semibold text-[11px] text-slate-800">Accent Orange</div>
                      <div className="font-mono text-[9px] text-slate-400">#FF8A3D</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography System */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-700 mb-1.5">2. Typography Pairings</div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Headings:</span>
                    <span className="font-bold font-sans text-slate-700">Poppins (Bold)</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Body Elements:</span>
                    <span className="font-sans text-slate-700">Poppins (Regular)</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Logs / Units:</span>
                    <span className="font-mono text-slate-700 font-semibold">JetBrains Mono</span>
                  </div>
                </div>
              </div>

              {/* Grid Layout spacing */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-700 mb-1">3. Grid System</div>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Configured on an <span className="font-bold text-slate-700 uppercase">8px / 16px grid system</span> to enforce alignment symmetry, comfortable mobile visual touch ratios, and consistent margin balance across all responsive viewport states.
                </p>
              </div>

              {/* Touch targets */}
              <div className="bg-slate-50 p-3 rounded-xl border border-[#2E7D6B]/20 bg-teal-50/10 flex items-start gap-2">
                <Smartphone className="w-5 h-5 text-[#2E7D6B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#20574a] text-[11px]">44px Touch Targets</div>
                  <p className="text-slate-500 mt-0.5 text-[10px] leading-normal">
                    Interactive buttons and checklist checkboxes use strict minimum hit measurements, avoiding user alignment slips and misclicks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
