import React, { useState } from "react";
import { CheckCircle, ShieldAlert, ArrowLeft, Clock, FileText, PlusCircle, Check } from "lucide-react";
import { Habit } from "../types";

interface AddHabitProps {
  onAddHabit: (habit: Omit<Habit, "id" | "isActive" | "streakCurrent" | "streakBest" | "isCompletedToday" | "completedDates">) => Promise<boolean>;
  onCancel: () => void;
}

export default function AddHabit({ onAddHabit, onCancel }: AddHabitProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<'Health' | 'Study' | 'Mind' | 'Fitness'>("Health");
  const [frequency, setFrequency] = useState<'Daily' | 'Weekdays' | 'Custom'>("Daily");
  const [reminderTime, setReminderTime] = useState("07:00 PM");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedHabitName, setSavedHabitName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please key in a habit name");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const success = await onAddHabit({
        name,
        category,
        frequency,
        reminderTime,
        notes
      });

      if (success) {
        setSavedHabitName(name);
        setIsSuccess(true);
      } else {
        setError("Failed to create habit in API database.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSuccess = () => {
    setName("");
    setNotes("");
    setIsSuccess(false);
    onCancel(); // navigate back to dashboard
  };

  // Categories list with elegant custom icons/emojis for secondary imagery
  const categoriesList: { name: 'Health' | 'Study' | 'Mind' | 'Fitness'; emoji: string; color: string }[] = [
    { name: 'Health', emoji: "🥛", color: "bg-teal-50 border-teal-200 text-teal-800 focus:ring-teal-200" },
    { name: 'Study', emoji: "📚", color: "bg-indigo-50 border-indigo-200 text-indigo-800 focus:ring-indigo-100" },
    { name: 'Mind', emoji: "🧘", color: "bg-purple-50 border-purple-200 text-purple-800 focus:ring-purple-100" },
    { name: 'Fitness', emoji: "🏃", color: "bg-orange-50 border-orange-200 text-orange-800 focus:ring-orange-100" }
  ];

  if (isSuccess) {
    return (
      <div id="add-habit-success" className="bg-white rounded-3xl p-8 text-center space-y-6 max-w-md mx-auto my-12 shadow-xl border border-slate-100 animate-scaleUp">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md border border-emerald-100">
          <CheckCircle className="w-12 h-12" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Habit Added!</h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            <span className="font-semibold text-slate-800">'{savedHabitName}'</span> is now successfully configured on your daily checklist.
          </p>
        </div>

        <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 space-y-2 text-left max-w-sm mx-auto">
          <span className="text-[10px] uppercase font-bold text-emerald-800/80 tracking-wider">Reminder Set</span>
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>{reminderTime}, {frequency === 'Daily' ? 'every day' : frequency === 'Weekdays' ? 'weekdays' : 'custom schedule'}</span>
          </div>
          <p className="text-[11px] text-slate-400">A local notification helper has been scheduled.</p>
        </div>

        <button
          onClick={handleResetSuccess}
          className="w-full max-w-sm py-4 bg-[#FF8A3D] hover:bg-[#e4762c] text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-orange-100"
        >
          VIEW MY HABITS
        </button>
      </div>
    );
  }

  return (
    <div id="add-habit-container" className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl transition-all"
          title="Back to checklist"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-sans">Add New Habit</h2>
          <p className="text-xs text-slate-400 font-light mt-0.5">Define your daily goal & micro timings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-xs flex items-center gap-2 border border-red-100">
            <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Field 1: Name */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest font-sans">
            Habit Name
          </label>
          <input
            type="text"
            placeholder="e.g. Drink 2L Water"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#2E7D6B] focus:bg-white transition-all"
            maxLength={60}
          />
        </div>

        {/* Form Field 2: Category Chips */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest font-sans">
            Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {categoriesList.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setCategory(cat.name)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs font-medium transition-all text-left ${
                  category === cat.name
                    ? "bg-[#2E7D6B] text-white border-[#2E7D6B] shadow-sm transform scale-[1.02]"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100/50"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-base">{cat.emoji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Field 3: Frequency Chips */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest font-sans">
            Frequency
          </label>
          <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            {['Daily', 'Weekdays', 'Custom'].map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setFrequency(freq as any)}
                className={`flex-1 py-3 text-center rounded-xl text-xs font-medium transition-all ${
                  frequency === freq
                    ? "bg-[#2D7C6A] text-white shadow"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        {/* Form Field 4: Time Picker & Notes side-by-side on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest font-sans">
              Reminder Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                placeholder="e.g. 07:00 PM"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#2E7D6B] focus:bg-white transition-all font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Enter human-friendly time format (e.g. 07:00 AM, 10:30 PM).
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest font-sans">
              Notes (Optional)
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-3.5 text-slate-400">
                <FileText className="w-4 h-4" />
              </div>
              <textarea
                placeholder="e.g. Read fiction before bed."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#2E7D6B] focus:bg-white transition-all min-h-[50px] max-h-[120px]"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4.5 bg-[#2E7D6B] hover:bg-[#20574a] text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          {isSubmitting ? "SAVING..." : "SAVE HABIT"}
        </button>
      </form>
    </div>
  );
}
