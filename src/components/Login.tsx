import React, { useState } from "react";
import { LogIn, Key, Mail, ShieldAlert, Award } from "lucide-react";

interface LoginProps {
  onLogin: (username: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter your email or username");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onLogin(username);
      setIsSubmitting(false);
    }, 800);
  };

  const handleQuickLogin = (name: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      onLogin(name);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div id="login-container" className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans selection:bg-teal-100 selection:text-teal-900">
      <div id="login-card" className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all hover:shadow-2xl duration-300">
        
        {/* Teal Header Banner */}
        <div id="login-header-banner" className="bg-[#2E7D6B] text-white p-8 text-center relative overflow-hidden">
          {/* Ambient shapes */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-teal-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

          <div id="brand-logo" className="w-16 h-16 bg-white text-[#2E7D6B] font-bold text-2xl rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-teal-50/20">
            HT
          </div>
          <h1 id="login-title" className="text-2xl font-bold tracking-tight">Welcome Back!</h1>
          <p id="login-tagline" className="text-teal-50 text-sm mt-1 font-light">Keep your streak alive today</p>
        </div>

        {/* Login Form Section */}
        <div id="login-form-section" className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div id="login-error" className="bg-red-50 text-red-600 p-3 rounded-xl text-xs flex items-center gap-2 border border-red-100">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label id="input-username-label" className="block text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2 font-sans">
                Email / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  id="username-field"
                  type="text"
                  placeholder="e.g. m_zeeshan or zeeshan@svit.edu"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(""); }}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#2E7D6B] focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label id="input-password-label" className="block text-xs font-semibold text-slate-600 uppercase tracking-widest font-sans">
                  Password
                </label>
                <a id="forgot-password" href="#forgot" className="text-xs text-[#2E7D6B] hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4.5 h-4.5" />
                </div>
                <input
                  id="password-field"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#2E7D6B] focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <button
              id="login-submit-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#2E7D6B] hover:bg-[#256456] text-white font-semibold rounded-2xl text-sm transition-all focus:ring-4 focus:ring-teal-100 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <LogIn className="w-4.5 h-4.5" />
              {isSubmitting ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>

          {/* Quick Sandbox Logins Section */}
          <div id="quick-logins-container" className="mt-8 pt-6 border-t border-slate-100">
            <h2 id="quick-login-title" className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Academic Project Playground Logins
            </h2>
            <div className="space-y-2.5">
              <button
                id="quick-login-zeeshan"
                onClick={() => handleQuickLogin("Mohammed Zeeshan")}
                className="w-full p-3.5 bg-teal-50/50 text-[#2E7D6B] hover:bg-teal-50 border border-teal-100/60 rounded-2xl text-xs font-medium transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#2E7D6B] text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    MZ
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Mohammed Zeeshan (USN Project Owner)</div>
                    <div className="text-[10px] text-slate-500">2nd Year B.E. Student - ISE @ SVIT</div>
                  </div>
                </div>
                <Award className="w-4.5 h-4.5 text-amber-500 group-hover:scale-110 transition-transform" />
              </button>

              <button
                id="quick-login-ravi"
                onClick={() => handleQuickLogin("Ravi Kumar")}
                className="w-full p-3.5 bg-orange-50/40 text-orange-700 hover:bg-orange-50 border border-orange-100/50 rounded-2xl text-xs font-medium transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    RK
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Ravi Kumar (User Persona 2)</div>
                    <div className="text-[10px] text-slate-500">Working Software Professional (Age 23)</div>
                  </div>
                </div>
                <Award className="w-4.5 h-4.5 text-[#FF8A3D] group-hover:scale-110 transition-transform" />
              </button>

              <button
                id="quick-login-anjali"
                onClick={() => handleQuickLogin("Anjali Sharma")}
                className="w-full p-3.5 bg-indigo-50/40 text-indigo-700 hover:bg-indigo-50 border border-indigo-100/50 rounded-2xl text-xs font-medium transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-indigo-500 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    AS
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Anjali Sharma (User Persona 1)</div>
                    <div className="text-[10px] text-slate-500">2nd Year ISE Student (Age 20)</div>
                  </div>
                </div>
                <Award className="w-4.5 h-4.5 text-indigo-500 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          <div id="login-copyright" className="text-center text-[10px] text-slate-400 mt-6 select-none font-mono">
            UI/UX (BCS456C) Mini Project • SVIT Bengaluru
          </div>
        </div>

      </div>
    </div>
  );
}
