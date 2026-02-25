"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, AlertCircle, Shirt, ChevronRight, Leaf, Droplets, Sun, Cloud, CloudRain, MapPin, Loader2, Wind, Thermometer } from "lucide-react";
import { fetchWeather, reverseGeocode, WeatherData } from "@/lib/weather";
import { initialPantryItems, getExpiringSoonItems } from "@/lib/pantry";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string>("London, UK");
  const [isLoading, setIsLoading] = useState(true);

  const [days, setDays] = useState<{ day: string; date: string; isToday: boolean; fullDate: Date }[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate 14 days centered around today
    const generateDays = () => {
      const today = new Date();
      const generated = [];

      for (let i = -6; i <= 7; i++) {
        const d = new Date();
        d.setDate(today.getDate() + i);
        generated.push({
          day: d.toLocaleDateString("en-US", { weekday: "short" }),
          date: d.getDate().toString(),
          isToday: d.toDateString() === today.toDateString(),
          fullDate: d
        });
      }
      setDays(generated);
    };

    generateDays();
  }, []);

  // Scroll to current day only on initial mount
  useEffect(() => {
    if (scrollRef.current && days.length > 0) {
      const activeElement = scrollRef.current.querySelector('[data-today="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [days.length > 0]);

  // Dynamic schedule based on selected date
  const getScheduleForDate = (date: Date) => {
    const day = date.getDay(); // 0 (Sun) to 6 (Sat)

    if (day === 0) { // Sunday
      return [
        { time: "11:00 AM", title: "Sunday Brunch", description: "Health: Farmers Market visit", color: "bg-primary" },
        { time: "2:30 PM", title: "Wardrobe Sort", description: "Minimalism: Seasonal rotation", color: "bg-sage" },
        { time: "6:00 PM", title: "Reflection", description: "Weekly goal setting", color: "bg-sage" },
      ];
    }

    if (day === 6) { // Saturday
      return [
        { time: "10:00 AM", title: "Morning Yoga", description: "Health: 45 min session", color: "bg-sage" },
        { time: "1:00 PM", title: "Local Market", description: "Minimalism: Zero waste run", color: "bg-primary" },
        { time: "7:00 PM", title: "Reading Hour", description: "Analog relaxation", color: "bg-sage" },
      ];
    }

    return [
      { time: "10:00 AM", title: "Focus Session", description: "Deep work: Design System", color: "bg-primary" },
      { time: "12:30 PM", title: "Meal Prep", description: "Health: Use items expiring today", color: "bg-sage" },
      { time: "4:00 PM", title: "Evening Walk", description: "Minimal living routine", color: "bg-sage" },
    ];
  };

  const currentSchedule = getScheduleForDate(selectedDate);

  const alerts = [
    { icon: <Leaf size={24} />, name: "Spinach", status: "Today", color: "text-red-500", bgColor: "bg-red-50 dark:bg-red-900/10" },
    { icon: <Droplets size={24} />, name: "Fresh Milk", status: "2 days", color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-900/10" },
  ];

  useEffect(() => {
    const getFallbackWeather = async () => {
      try {
        const weatherData = await fetchWeather(51.5074, -0.1278);
        setWeather(weatherData);
        setLocationName("London, UK");
      } catch (e) {
        console.error("Fallback weather fetch failed", e);
      } finally {
        setIsLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const [weatherData, name] = await Promise.all([
              fetchWeather(latitude, longitude),
              reverseGeocode(latitude, longitude)
            ]);
            setWeather(weatherData);
            setLocationName(name);
          } catch (error) {
            console.error("Failed to fetch weather", error);
            getFallbackWeather();
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          getFallbackWeather();
        },
        { timeout: 5000 } // 5 second timeout
      );
    } else {
      getFallbackWeather();
    }
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun size={28} />;
    if (code <= 3) return <Cloud size={28} />;
    if (code >= 61) return <CloudRain size={28} />;
    return <Sun size={28} />;
  };

  const getDayName = (date: Date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return "Today";
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getDateStr = (date: Date) => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const getDisplayWeather = () => {
    if (!weather) return null;

    // Look for matching date in forecast (format: YYYY-MM-DD)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const selectedDateStr = `${year}-${month}-${day}`;

    const dailyData = weather.forecast.find(f => f.date === selectedDateStr);

    if (dailyData) {
      return {
        temp: dailyData.tempMax,
        condition: dailyData.condition,
        weatherCode: dailyData.weatherCode
      };
    }

    // Fallback if no forecast match
    return {
      temp: weather.temp,
      condition: weather.condition,
      weatherCode: weather.weatherCode
    };
  };

  const displayWeather = getDisplayWeather();
  const isSelectedToday = selectedDate.toDateString() === new Date().toDateString();

  const [showForecast, setShowForecast] = useState(false);
  const [expiringItems, setExpiringItems] = useState(getExpiringSoonItems(initialPantryItems));

  return (
    <div className="px-6 pt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      {/* Waste Zero Notification */}
      {expiringItems.length > 0 && isSelectedToday && (
        <section className="bg-aura-sand/15 border border-aura-sand/30 p-6 rounded-[2.5rem] space-y-4 animate-in fade-in zoom-in duration-700">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Leaf size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Waste Zero</p>
                <h3 className="text-xl font-bold tracking-tight text-foreground">{expiringItems[0].name} Needs Using</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Minimal Living</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-white/50">
            "Your {expiringItems[0].name.toLowerCase()} is expiring soon. Why not make a quick {expiringItems[0].name.toLowerCase() === 'milk' ? 'smoothie or latte' : 'pasta dish'} today?"
          </p>
        </section>
      )}

      {/* Forecast Modal */}
      {showForecast && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
          onClick={() => setShowForecast(false)}
        >
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-white dark:bg-aura-clay/90 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white/20 p-8 space-y-8 animate-in slide-in-from-bottom-10 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tighter text-foreground">5-Day Forecast</h2>
                <p className="text-sm text-slate-500 font-medium">{locationName}</p>
              </div>
              <button
                onClick={() => setShowForecast(false)}
                className="w-10 h-10 bg-aura-sand/20 dark:bg-aura-clay rounded-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
              >
                <ChevronRight className="rotate-90" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {weather?.forecast.slice(0, 5).map((f, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-aura-sand/10 dark:bg-white/5 border border-white/10 group transition-premium hover:bg-aura-sand/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-aura-clay rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                      {getWeatherIcon(f.weatherCode)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {new Date(f.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{f.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold tracking-tighter text-foreground">{f.tempMax}°C</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowForecast(false)}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-premium hover:scale-[1.02] active:scale-95"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Aura</span>
          </div>
          <h1 className="text-3xl font-bold mt-4 tracking-tighter text-foreground">Good morning, Rebecca.</h1>
          <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
            <MapPin size={14} />
            <span>{locationName} • {getDayName(selectedDate)}, {getDateStr(selectedDate)}</span>
          </div>
        </div>
        <button className="bg-white dark:bg-aura-clay/50 p-3 rounded-2xl shadow-sm border border-aura-sand/30 dark:border-aura-clay/20 transition-premium hover:scale-110 active:scale-95">
          <Calendar size={24} className="text-primary" />
        </button>
      </header>

      {/* Week Calendar */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Week</h2>
          <button className="text-xs font-bold text-primary transition-premium hover:opacity-70">Full View</button>
        </div>
        <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {days.map((d, idx) => {
            const isSelected = d.fullDate.toDateString() === selectedDate.toDateString();
            return (
              <div
                key={idx}
                data-today={d.isToday}
                onClick={() => setSelectedDate(d.fullDate)}
                className={`flex-shrink-0 w-12 py-4 rounded-2xl flex flex-col items-center gap-1 transition-premium cursor-pointer ${isSelected
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                  : "bg-white dark:bg-aura-clay/30 text-slate-500 border border-aura-sand/20 hover:border-primary/50"
                  }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">{d.day}</span>
                <span className="text-lg font-bold tracking-tighter">{d.date}</span>
                {d.isToday && <div className={`w-1 h-1 rounded-full mt-1 ${isSelected ? "bg-white" : "bg-primary"}`} />}
              </div>
            );
          })}
        </div>
      </section>

      {/* Weather & Routine Notification */}
      <section
        onClick={() => setShowForecast(true)}
        className="bg-aura-sage/10 border border-aura-sage/20 p-6 rounded-[2.5rem] space-y-4 cursor-pointer transition-premium hover:bg-aura-sage/15 active:scale-[0.98]"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white dark:bg-aura-clay/50 rounded-2xl flex items-center justify-center text-primary shadow-sm">
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : (displayWeather ? getWeatherIcon(displayWeather.weatherCode) : <Sun size={28} />)}
            </div>
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest">
                {isSelectedToday ? "Weather Intelligence" : "Forecast Insight"}
              </p>
              <h3 className="text-xl font-bold text-foreground">
                {isLoading ? "Fetching..." : (displayWeather ? `${displayWeather.temp}°C • ${displayWeather.condition}` : "22°C • Sunny")}
              </h3>
            </div>
          </div>
          <div className="p-2 bg-white dark:bg-aura-clay/50 rounded-xl shadow-sm">
            <Shirt className="text-primary" size={24} />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {displayWeather && displayWeather.temp < 15
              ? `A bit chilly ${isSelectedToday ? "today" : "on this day"}. We suggest the `
              : `Perfect for the `}
            <span className="text-foreground font-bold underline decoration-primary/30">
              {displayWeather && displayWeather.temp < 15 ? "Wool Blend Overcoat & Knit" : "Linen Shirt & Chinos"}
            </span> you haven't worn in {displayWeather && displayWeather.temp < 15 ? "12" : "8"} days.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
            <AlertCircle size={10} />
            <span>
              {displayWeather && displayWeather.weatherCode >= 61
                ? "Rain expected. Reschedule plans?"
                : isSelectedToday ? "Evening Walk suggested at 4:30 PM (before sunset)" : "Good day for your routine."}
            </span>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Timeline</h2>
        <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-aura-sand/30 dark:before:bg-aura-clay/30">
          {currentSchedule.map((item, idx) => (
            <div key={idx} className="flex gap-6 relative pl-8 group cursor-pointer">
              <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-aura-cream dark:border-aura-clay transition-premium group-hover:scale-125 ${item.color}`} />
              <div className="flex-1 glass p-5 rounded-3xl transition-premium group-hover:translate-x-1 group-active:scale-95 shadow-sm border border-white/50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.time}</span>
                    <h3 className="font-bold text-lg leading-tight text-foreground">{item.title}</h3>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-slate-500 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expiring Soon */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Food Inventory</h2>
          <button className="text-xs font-bold text-primary transition-premium hover:opacity-70">See Full Pantry</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {alerts.map((item, idx) => (
            <div key={idx} className="glass p-5 rounded-3xl flex flex-col items-center text-center space-y-3 cursor-pointer transition-premium hover:scale-[1.02] active:scale-95 border border-white/50">
              <div className={`w-14 h-14 ${item.bgColor} rounded-full flex items-center justify-center text-primary shadow-inner`}>
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">{item.name}</h3>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-widest ${item.bgColor} ${item.color}`}>
                  Expire {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

