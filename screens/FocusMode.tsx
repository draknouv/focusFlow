
import React, { useState, useEffect, useRef } from 'react';
import { storageService } from '../services/storageService';
import { Play, Pause, RotateCcw, Coffee, Zap, Info } from 'lucide-react';

const MODES = {
  POMODORO: { label: 'Focus', time: 25 * 60, color: 'text-blue-400 border-blue-400' },
  SHORT_BREAK: { label: 'Short Break', time: 5 * 60, color: 'text-emerald-400 border-emerald-400' },
  LONG_BREAK: { label: 'Long Break', time: 15 * 60, color: 'text-indigo-400 border-indigo-400' },
};

export const FocusMode: React.FC = () => {
  const [activeMode, setActiveMode] = useState<keyof typeof MODES>('POMODORO');
  const [timeLeft, setTimeLeft] = useState(MODES.POMODORO.time);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  // Fixed: Replaced NodeJS.Timeout with any to avoid "Cannot find namespace 'NodeJS'" in typical frontend builds
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft]);

  const handleComplete = () => {
    setIsActive(false);
    if (activeMode === 'POMODORO') {
      setSessionsCompleted(prev => prev + 1);
      storageService.addSession({
        id: Date.now().toString(),
        startTime: Date.now() - (MODES.POMODORO.time * 1000),
        durationSeconds: MODES.POMODORO.time,
        type: 'Work'
      });
      // Update streak if needed
      const profile = storageService.getProfile();
      storageService.saveProfile({ ...profile, streak: profile.streak + 1 });
      alert("Deep focus session complete! Take a break.");
    } else {
      alert("Break over. Ready to grind?");
    }
    resetTimer();
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[activeMode].time);
  };

  const changeMode = (mode: keyof typeof MODES) => {
    setActiveMode(mode);
    setIsActive(false);
    setTimeLeft(MODES[mode].time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((MODES[activeMode].time - timeLeft) / MODES[activeMode].time) * 100;

  return (
    <div className="h-full flex flex-col justify-center items-center space-y-12 py-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex bg-slate-900/50 p-1.5 rounded-[2rem] border border-slate-800 w-full max-w-xs mx-auto">
        {Object.keys(MODES).map((mode) => (
          <button
            key={mode}
            onClick={() => changeMode(mode as keyof typeof MODES)}
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-[1.5rem] transition-all ${
              activeMode === mode ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-400'
            }`}
          >
            {MODES[mode as keyof typeof MODES].label}
          </button>
        ))}
      </div>

      <div className="relative group">
        {/* Animated Rings */}
        <div className="absolute inset-0 -m-4 rounded-full border border-blue-500/10 scale-110 animate-pulse" />
        <div className="absolute inset-0 -m-8 rounded-full border border-indigo-500/5 scale-125" />
        
        <div className="w-64 h-64 rounded-full border-8 border-slate-900 flex flex-col items-center justify-center relative bg-slate-950 shadow-[0_0_60px_rgba(30,41,59,0.5)]">
          {/* Visual Progress Arc */}
          <svg className="absolute inset-0 -rotate-90 w-full h-full p-1 overflow-visible">
            <circle
              cx="128" cy="128" r="124"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
              className="text-slate-900"
            />
            <circle
              cx="128" cy="128" r="124"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 124}
              strokeDashoffset={2 * Math.PI * 124 * (1 - progress / 100)}
              strokeLinecap="round"
              className={`${MODES[activeMode].color.split(' ')[0]} transition-all duration-300 shadow-[0_0_10px_currentColor]`}
            />
          </svg>

          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-1">Session</span>
          <span className="text-6xl font-black text-white tabular-nums tracking-tighter">
            {formatTime(timeLeft)}
          </span>
          <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-slate-900/50 rounded-full border border-slate-800">
            {activeMode === 'POMODORO' ? <Zap size={10} className="text-yellow-500" /> : <Coffee size={10} className="text-emerald-400" />}
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{MODES[activeMode].label}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={resetTimer}
          className="p-5 bg-slate-900 border border-slate-800 text-slate-400 rounded-full hover:bg-slate-800 hover:text-white transition-all shadow-xl"
        >
          <RotateCcw size={24} />
        </button>
        <button 
          onClick={toggleTimer}
          className={`p-10 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 ${
            isActive 
              ? 'bg-slate-900 border-2 border-red-500/30 text-red-500' 
              : 'bg-blue-500 text-white shadow-blue-500/20'
          }`}
        >
          {isActive ? <Pause size={48} fill="currentColor" /> : <Play size={48} fill="currentColor" className="ml-2" />}
        </button>
        <div className="w-16 h-16 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-full text-blue-400">
           <span className="text-lg font-bold">{sessionsCompleted}</span>
           <span className="text-[8px] uppercase font-bold text-slate-500">Done</span>
        </div>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl max-w-xs flex gap-3">
        <Info className="text-blue-400 flex-shrink-0" size={18} />
        <p className="text-xs text-slate-400 italic leading-relaxed">
          Tip: Enable Do Not Disturb on your phone to lock distractions during study sessions.
        </p>
      </div>
    </div>
  );
};
