
import React from 'react';
import { Terminal, Database, Layers, Smartphone, Copy } from 'lucide-react';

export const DeveloperGuide: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Code snippet copied!');
  };

  const snippets = {
    entity: `
@Entity(tableName = "backlog_items")
data class BacklogItem(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val subject: String,
    val priority: String,
    val estimatedHours: Int,
    val progress: Int = 0,
    val isCompleted: Boolean = false,
    val createdAt: Long = System.currentTimeMillis()
)
    `,
    viewModel: `
class BacklogViewModel(private val repository: BacklogRepository) : ViewModel() {
    val allBacklogs: LiveData<List<BacklogItem>> = repository.allBacklogs.asLiveData()

    fun insert(item: BacklogItem) = viewModelScope.launch {
        repository.insert(item)
    }
}
    `
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-left-4 duration-500">
      <section className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-3xl">
        <h3 className="text-xl font-bold text-indigo-400 flex items-center gap-2 mb-2">
          <Smartphone size={24} /> FocusFlow Android Dev
        </h3>
        <p className="text-sm text-slate-400">Blueprint for your native Kotlin implementation.</p>
      </section>

      {/* Architecture */}
      <section className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <Layers size={16} /> App Architecture (MVVM)
        </h4>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex gap-3">
             <div className="w-1 bg-blue-500 rounded-full" />
             <div>
               <p className="text-xs font-bold text-slate-300">View (UI)</p>
               <p className="text-[10px] text-slate-500">Fragments/Activities using Material Design 3 and Jetpack Compose.</p>
             </div>
          </div>
          <div className="flex gap-3">
             <div className="w-1 bg-emerald-500 rounded-full" />
             <div>
               <p className="text-xs font-bold text-slate-300">ViewModel</p>
               <p className="text-[10px] text-slate-500">Holds UI state and interacts with Repository via Flow/LiveData.</p>
             </div>
          </div>
          <div className="flex gap-3">
             <div className="w-1 bg-orange-500 rounded-full" />
             <div>
               <p className="text-xs font-bold text-slate-300">Repository</p>
               <p className="text-[10px] text-slate-500">Single source of truth (Room Database + Remote Firebase).</p>
             </div>
          </div>
        </div>
      </section>

      {/* Database Schema */}
      <section className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <Database size={16} /> Room DB Entities
        </h4>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-slate-800 px-4 py-2 flex justify-between items-center">
            <span className="text-[10px] font-mono text-slate-400">BacklogItem.kt</span>
            <button onClick={() => copyToClipboard(snippets.entity)} className="text-blue-400"><Copy size={14}/></button>
          </div>
          <pre className="p-4 text-[10px] font-mono text-emerald-400 overflow-x-auto">
            {snippets.entity}
          </pre>
        </div>
      </section>

      {/* Starter Step */}
      <section className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <Terminal size={16} /> Dev Roadmap
        </h4>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Setup Project', desc: 'Use Empty Compose Activity, set Min SDK 24.' },
            { step: '2', title: 'Dependency Injection', desc: 'Add Hilt for providing Room DB and Repositories.' },
            { step: '3', title: 'Room Setup', desc: 'Create DAO for CRUD operations on Backlog items.' },
            { step: '4', title: 'WorkManager', desc: 'Use for periodic notifications and backlog reminders.' }
          ].map(item => (
            <div key={item.step} className="flex gap-4 items-start bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
               <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                 {item.step}
               </div>
               <div>
                 <h5 className="text-xs font-bold text-slate-200">{item.title}</h5>
                 <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
