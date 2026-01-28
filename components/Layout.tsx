
import React from 'react';
import { NAV_ITEMS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 max-w-md mx-auto relative border-x border-slate-800 shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 bg-slate-950/80 backdrop-blur-md z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              FocusFlow JEE
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">Aspire • Focus • Achieve</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
            <span className="text-sm font-bold text-blue-400">JEE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 px-6">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 px-2 py-3 z-20 flex justify-around">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === item.id ? 'text-blue-400 scale-110' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium uppercase tracking-tight">{item.label}</span>
            {activeTab === item.id && (
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-0.5 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};
