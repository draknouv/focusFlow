
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { generateStudyPlan } from '../services/geminiService';
import { BacklogItem, Subject, Priority } from '../types';
// Fixed: Added BookOpen to the imports to resolve the error on line 176
import { Plus, Sparkles, Trash2, CheckCircle, Circle, BrainCircuit, BookOpen } from 'lucide-react';
import { SUBJECT_COLORS } from '../constants';

export const BacklogManager: React.FC = () => {
  const [items, setItems] = useState<BacklogItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [aiPlan, setAiPlan] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newSub, setNewSub] = useState<Subject>(Subject.PHYSICS);
  const [newPriority, setNewPriority] = useState<Priority>(Priority.MEDIUM);
  const [newHours, setNewHours] = useState(2);

  useEffect(() => {
    setItems(storageService.getBacklog());
  }, []);

  const handleAdd = () => {
    if (!newTitle) return;
    const newItem: BacklogItem = {
      id: Date.now().toString(),
      title: newTitle,
      subject: newSub,
      priority: newPriority,
      estimatedHours: newHours,
      completedPercentage: 0,
      createdAt: Date.now(),
      isCompleted: false
    };
    const updated = [...items, newItem];
    storageService.saveBacklog(updated);
    setItems(updated);
    setShowAdd(false);
    setNewTitle('');
  };

  const toggleComplete = (id: string) => {
    const updated = items.map(i => i.id === id ? { ...i, isCompleted: !i.isCompleted } : i);
    storageService.saveBacklog(updated);
    setItems(updated);
  };

  const deleteItem = (id: string) => {
    const updated = items.filter(i => i.id !== id);
    storageService.saveBacklog(updated);
    setItems(updated);
  };

  const handleAiPlan = async () => {
    setLoadingAi(true);
    const plan = await generateStudyPlan(items);
    setAiPlan(plan);
    setLoadingAi(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center sticky top-0 bg-slate-950/80 backdrop-blur-md py-4 z-10">
        <h2 className="text-xl font-bold">Backlog Vault</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleAiPlan}
            className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl hover:bg-indigo-500/30 transition-colors"
          >
            <Sparkles size={20} />
          </button>
          <button 
            onClick={() => setShowAdd(true)}
            className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {aiPlan && (
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 p-5 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
             <BrainCircuit className="text-indigo-500/20 w-16 h-16" />
          </div>
          <h3 className="text-indigo-400 font-bold mb-3 flex items-center gap-2">
            <Sparkles size={16} /> AI Mentor's Plan
          </h3>
          <div className="text-xs leading-relaxed text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {aiPlan}
          </div>
          <button 
            onClick={() => setAiPlan(null)}
            className="mt-4 text-[10px] uppercase font-bold text-slate-500 tracking-widest hover:text-slate-300"
          >
            Dismiss Plan
          </button>
        </div>
      )}

      {loadingAi && (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 rounded-3xl animate-pulse">
          <div className="relative w-12 h-12 mb-4">
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-indigo-400 text-sm font-medium">Strategizing your victory...</p>
        </div>
      )}

      {showAdd && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-blue-500/30 space-y-4 animate-in zoom-in-95">
          <h3 className="font-bold text-slate-100">Add New Backlog</h3>
          <input 
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-blue-500"
            placeholder="Chapter name (e.g., Rotation)"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-2">
            {Object.values(Subject).map(sub => (
              <button 
                key={sub}
                onClick={() => setNewSub(sub)}
                className={`p-2 rounded-xl text-xs font-semibold border ${newSub === sub ? 'bg-blue-500 border-blue-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
              >
                {sub}
              </button>
            ))}
          </div>
          <div className="flex gap-4 items-center">
             <div className="flex-1">
               <label className="text-[10px] uppercase text-slate-500 font-bold ml-1">Priority</label>
               <select 
                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs"
                value={newPriority}
                onChange={e => setNewPriority(e.target.value as Priority)}
               >
                 <option value={Priority.HIGH}>High</option>
                 <option value={Priority.MEDIUM}>Medium</option>
                 <option value={Priority.LOW}>Low</option>
               </select>
             </div>
             <div className="w-24">
               <label className="text-[10px] uppercase text-slate-500 font-bold ml-1">Hours</label>
               <input 
                 type="number"
                 className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs"
                 value={newHours}
                 onChange={e => setNewHours(Number(e.target.value))}
               />
             </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button 
              onClick={() => setShowAdd(false)}
              className="flex-1 p-3 bg-slate-800 rounded-xl font-bold text-sm text-slate-400"
            >
              Cancel
            </button>
            <button 
              onClick={handleAdd}
              className="flex-1 p-3 bg-blue-500 rounded-xl font-bold text-sm text-white shadow-lg shadow-blue-500/30"
            >
              Add Item
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {items.length === 0 && !showAdd && (
          <div className="text-center py-20 opacity-30 flex flex-col items-center gap-4">
            <BookOpen size={64} />
            <p className="font-bold">Your backlog is empty. Rare sight!</p>
          </div>
        )}
        
        {items.sort((a, b) => b.createdAt - a.createdAt).map(item => (
          <div key={item.id} className={`group bg-slate-900 border ${item.isCompleted ? 'border-slate-800/50 opacity-60' : 'border-slate-800'} p-5 rounded-3xl relative transition-all`}>
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4 flex-1">
                <button 
                  onClick={() => toggleComplete(item.id)}
                  className={`mt-1 transition-colors ${item.isCompleted ? 'text-emerald-500' : 'text-slate-700'}`}
                >
                  {item.isCompleted ? <CheckCircle size={22} /> : <Circle size={22} />}
                </button>
                <div className="flex-1">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${SUBJECT_COLORS[item.subject]}`}>
                    {item.subject}
                  </span>
                  <h4 className={`text-base font-bold mt-2 ${item.isCompleted ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                    {item.title}
                  </h4>
                  <div className="flex gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                       <span className={`w-1.5 h-1.5 rounded-full ${item.priority === Priority.HIGH ? 'bg-red-500 animate-pulse' : item.priority === Priority.MEDIUM ? 'bg-yellow-500' : 'bg-slate-500'}`} />
                       <span className="text-[10px] uppercase font-bold text-slate-500">{item.priority} Priority</span>
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">
                      ~{item.estimatedHours} Hours
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteItem(item.id)}
                className="p-2 text-slate-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
