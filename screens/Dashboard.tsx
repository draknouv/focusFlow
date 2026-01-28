
import React, { useEffect, useState } from 'react';
import { storageService } from '../services/storageService';
import { MOTIVATIONAL_QUOTES, SUBJECT_COLORS } from '../constants';
import { Target, Flame, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Subject, BacklogItem } from '../types';

export const Dashboard: React.FC = () => {
  const [backlog, setBacklog] = useState<BacklogItem[]>([]);
  const [quote, setQuote] = useState('');
  const [profile, setProfile] = useState(storageService.getProfile());

  useEffect(() => {
    setBacklog(storageService.getBacklog());
    setQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
  }, []);

  const pendingCount = backlog.filter(i => !i.isCompleted).length;
  const completedCount = backlog.filter(i => i.isCompleted).length;
  const progressPercent = backlog.length ? Math.round((completedCount / backlog.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome & Streak */}
      <section className="flex justify-between items-center bg-blue-500/10 border border-blue-500/20 p-5 rounded-3xl relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Flame size={120} className="text-blue-400" />
        </div>
        <div className="z-10">
          <p className="text-slate-400 text-sm mb-1">Welcome back, Aspirant!</p>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {profile.streak} Day Streak <Flame className="text-orange-500 fill-orange-500" size={24} />
          </h2>
          <p className="text-xs text-blue-300/80 mt-2 font-medium">Keep going, the dream is worth it.</p>
        </div>
      </section>

      {/* Quote Card */}
      <section className="italic text-slate-300 text-sm border-l-4 border-indigo-500 pl-4 py-1 leading-relaxed">
        "{quote}"
      </section>

      {/* Overview Stats */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Cleared</span>
          </div>
          <div className="text-2xl font-bold">{completedCount}</div>
          <p className="text-[10px] text-slate-500 mt-1 uppercase">Chapters total</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/10 text-red-400 rounded-xl">
              <Target size={20} />
            </div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pending</span>
          </div>
          <div className="text-2xl font-bold">{pendingCount}</div>
          <p className="text-[10px] text-slate-500 mt-1 uppercase">To complete</p>
        </div>
      </section>

      {/* Progress Chart Simulation */}
      <section className="bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Backlog Health</h3>
          <span className="text-blue-400 font-bold text-xl">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6">
          {Object.values(Subject).map(sub => {
            const subItems = backlog.filter(i => i.subject === sub);
            const subComp = subItems.filter(i => i.isCompleted).length;
            const subPerc = subItems.length ? Math.round((subComp / subItems.length) * 100) : 0;
            return (
              <div key={sub} className="text-center">
                <div className="text-[10px] text-slate-500 uppercase mb-1">{sub}</div>
                <div className={`text-sm font-bold ${SUBJECT_COLORS[sub].split(' ')[0]}`}>{subPerc}%</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent High Priority */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-300">Urgent Backlogs</h3>
          <button className="text-blue-400 text-xs font-semibold hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {backlog.filter(i => !i.isCompleted && i.priority === 'High').slice(0, 3).map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-colors">
              <div className={`w-2 h-10 rounded-full ${SUBJECT_COLORS[item.subject].split(' ')[1]}`} />
              <div className="flex-1">
                <h4 className="text-sm font-semibold">{item.title}</h4>
                <p className="text-[10px] text-slate-500">{item.subject} • {item.estimatedHours}h effort</p>
              </div>
              <ChevronRight size={16} className="text-slate-600" />
            </div>
          ))}
          {backlog.filter(i => !i.isCompleted && i.priority === 'High').length === 0 && (
            <p className="text-center text-slate-600 text-sm py-4">No urgent backlogs. Good job!</p>
          )}
        </div>
      </section>
    </div>
  );
};
