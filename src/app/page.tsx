import { Calendar, AlertCircle, Shirt, ChevronRight, Leaf, Droplets } from "lucide-react";

export default function Home() {
  const schedule = [
    { time: "10:00 AM", title: "Focus Session", description: "Deep work: Design System", color: "bg-primary" },
    { time: "12:30 PM", title: "Meal Prep", description: "Health: Use items expiring today", color: "bg-slate-200 dark:bg-slate-800" },
    { time: "4:00 PM", title: "Evening Walk", description: "Minimal living routine", color: "bg-slate-200 dark:bg-slate-800" },
  ];

  const alerts = [
    { icon: <Leaf size={24} />, name: "Spinach", status: "Today", color: "text-red-500", bgColor: "bg-red-50 dark:bg-red-900/10" },
    { icon: <Droplets size={24} />, name: "Fresh Milk", status: "2 days", color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-900/10" },
  ];

  return (
    <div className="px-6 pt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Now</span>
          </div>
          <h1 className="text-3xl font-bold mt-4 tracking-tighter">Good morning, Alex.</h1>
          <p className="text-slate-500 text-lg">
            You have <span className="text-primary font-bold">3 priority tasks</span> and <span className="text-primary font-bold">2 food items</span> expiring soon.
          </p>
        </div>
        <button className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <Calendar size={24} className="text-slate-600 dark:text-slate-300" />
        </button>
      </header>

      {/* Schedule */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Today's Schedule</h2>
        <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
          {schedule.map((item, idx) => (
            <div key={idx} className="flex gap-6 relative pl-8 group cursor-pointer">
              <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-background-light dark:border-background-dark transition-premium group-hover:scale-110 ${item.color}`} />
              <div className="flex-1 glass p-4 rounded-2xl transition-premium group-hover:translate-x-1 group-active:scale-95">
                <span className="text-xs font-bold text-primary">{item.time}</span>
                <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expiring Soon */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Expiring Soon</h2>
          <button className="text-xs font-bold text-primary transition-premium hover:opacity-70">View Pantry</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {alerts.map((item, idx) => (
            <div key={idx} className="glass p-5 rounded-3xl flex flex-col items-center text-center space-y-3 cursor-pointer transition-premium hover:scale-[1.02] active:scale-95">
              <div className={`w-14 h-14 ${item.bgColor} rounded-full flex items-center justify-center text-primary`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.bgColor} ${item.color}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Wardrobe */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Today's Wardrobe</h2>
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-[2rem] space-y-4 cursor-pointer transition-premium hover:bg-primary/10 group active:scale-[0.98]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-icons text-xl group-hover:rotate-12 transition-transform">wb_sunny</span>
              <span className="font-bold">22°C • Sunny</span>
            </div>
            <div className="p-2 bg-white rounded-xl shadow-sm transition-premium group-hover:scale-110">
              <Shirt className="text-primary" size={24} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">Suggested Outfit:</p>
            <h3 className="text-xl font-bold">Linen Shirt & Chinos</h3>
            <p className="text-sm text-slate-500 italic">"Chosen because you haven't worn this in 8 days."</p>
          </div>
        </div>
      </section>
    </div>
  );
}
