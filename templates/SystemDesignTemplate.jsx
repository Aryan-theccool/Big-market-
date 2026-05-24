import React from 'react';

export default function SystemDesignTemplate() {
  return (
    <div className="relative w-full h-full min-h-[800px]">
      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <path d="M 400 150 L 400 300" stroke="#3B82F6" strokeWidth="3" strokeDasharray="6,6" fill="none" />
        <path d="M 400 350 L 400 500" stroke="#94A3B8" strokeWidth="2" fill="none" />
        <path d="M 400 350 L 150 500" stroke="#94A3B8" strokeWidth="2" fill="none" />
        <path d="M 400 350 L 650 500" stroke="#94A3B8" strokeWidth="2" fill="none" />
        <path d="M 150 550 L 250 700" stroke="#94A3B8" strokeWidth="2" fill="none" />
        <path d="M 150 550 L 400 700" stroke="#94A3B8" strokeWidth="2" fill="none" />
      </svg>

      {/* Nodes */}
      <div className="absolute w-48 bg-white border-2 border-blue-200 shadow-xl rounded-xl p-4 flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '80px', left: '304px', zIndex: 10 }}>
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center pointer-events-none">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        </div>
        <div className="font-bold text-center outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>Load Balancer</div>
        <div className="text-xs text-gray-500 text-center outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>Route 53</div>
      </div>

      <div className="absolute w-64 bg-gray-900 border border-gray-700 shadow-2xl rounded-xl p-4 flex items-center justify-center gap-3 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '300px', left: '272px', zIndex: 10 }}>
        <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)] pointer-events-none"></div>
        <div className="font-bold text-white tracking-wider text-sm outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>API GATEWAY</div>
      </div>

      <div className="absolute w-48 bg-white border border-gray-200 shadow-lg rounded-xl p-4 border-t-4 border-t-purple-500 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '500px', left: '54px', zIndex: 10 }}>
        <div className="font-bold mb-1 outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>Auth Service</div>
        <div className="text-xs text-gray-500 outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>Node.js / Express</div>
      </div>

      <div className="absolute w-48 bg-white border border-gray-200 shadow-lg rounded-xl p-4 border-t-4 border-t-emerald-500 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '500px', left: '304px', zIndex: 10 }}>
        <div className="font-bold mb-1 outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>Core API</div>
        <div className="text-xs text-gray-500 outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>Go (Golang)</div>
      </div>

      <div className="absolute w-48 bg-white border border-gray-200 shadow-lg rounded-xl p-4 border-t-4 border-t-rose-500 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '500px', left: '554px', zIndex: 10 }}>
        <div className="font-bold mb-1 outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>Media Service</div>
        <div className="text-xs text-gray-500 outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>Python / FastAPI</div>
      </div>

      <div className="absolute w-48 bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-center gap-3 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '700px', left: '154px', zIndex: 10 }}>
        <div className="font-bold text-sm outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>PostgreSQL</div>
      </div>

      <div className="absolute w-48 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '700px', left: '304px', zIndex: 10 }}>
        <div className="font-bold text-sm outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>Redis Cache</div>
      </div>
    </div>
  );
}