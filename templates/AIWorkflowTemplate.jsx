import React from 'react';

export default function AIWorkflowTemplate() {
  return (
    <div className="relative w-full h-full min-h-[800px] bg-slate-900 rounded-2xl overflow-hidden shadow-inner border border-slate-700">
      {/* Deep Dark Grid for AI Theme */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <path d="M 300 400 L 450 400" stroke="#6366f1" strokeWidth="3" strokeDasharray="6,6" fill="none" />
        <path d="M 550 400 L 700 250" stroke="#6366f1" strokeWidth="3" fill="none" />
        <path d="M 550 400 L 700 550" stroke="#6366f1" strokeWidth="3" fill="none" />
        <path d="M 900 250 L 1050 400" stroke="#6366f1" strokeWidth="3" fill="none" />
        <path d="M 900 550 L 1050 400" stroke="#6366f1" strokeWidth="3" fill="none" />
      </svg>

      {/* Nodes */}
      <div className="absolute w-56 bg-slate-800 border-2 border-indigo-500 rounded-xl p-4 shadow-2xl cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '350px', left: '60px', zIndex: 10 }}>
        <div className="flex items-center gap-2 mb-2 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
          <span className="text-xs font-bold text-indigo-400 tracking-wider">TRIGGER</span>
        </div>
        <div className="text-white font-medium outline-none focus:bg-slate-700 px-1 rounded" contentEditable suppressContentEditableWarning>User Input Prompt</div>
      </div>

      <div className="absolute w-48 h-48 bg-slate-800 border-2 border-slate-600 rounded-full p-4 shadow-2xl flex items-center justify-center text-center cursor-grab active:cursor-grabbing hover:border-slate-500 transition-colors" style={{ top: '304px', left: '406px', zIndex: 10 }}>
        <div className="text-white font-bold text-lg outline-none focus:bg-slate-700 px-2 rounded" contentEditable suppressContentEditableWarning>Decision Router</div>
      </div>

      <div className="absolute w-56 bg-purple-900/40 border-2 border-purple-500 rounded-xl p-4 shadow-2xl backdrop-blur-md cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '200px', left: '700px', zIndex: 10 }}>
        <div className="flex items-center gap-2 mb-2 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"></div>
          <span className="text-xs font-bold text-purple-400 tracking-wider">LLM NODE</span>
        </div>
        <div className="text-white font-medium outline-none focus:bg-purple-800/50 px-1 rounded" contentEditable suppressContentEditableWarning>Claude 3.5 Sonnet</div>
      </div>

      <div className="absolute w-56 bg-blue-900/40 border-2 border-blue-500 rounded-xl p-4 shadow-2xl backdrop-blur-md cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '500px', left: '700px', zIndex: 10 }}>
        <div className="flex items-center gap-2 mb-2 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></div>
          <span className="text-xs font-bold text-blue-400 tracking-wider">LLM NODE</span>
        </div>
        <div className="text-white font-medium outline-none focus:bg-blue-800/50 px-1 rounded" contentEditable suppressContentEditableWarning>GPT-4o Fast</div>
      </div>
      
      <div className="absolute w-56 bg-emerald-900/40 border-2 border-emerald-500 rounded-xl p-4 shadow-2xl backdrop-blur-md cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '350px', left: '1050px', zIndex: 10 }}>
        <div className="flex items-center gap-2 mb-2 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
          <span className="text-xs font-bold text-emerald-400 tracking-wider">ACTION</span>
        </div>
        <div className="text-white font-medium outline-none focus:bg-emerald-800/50 px-1 rounded" contentEditable suppressContentEditableWarning>Save to Vector DB</div>
      </div>
    </div>
  );
}