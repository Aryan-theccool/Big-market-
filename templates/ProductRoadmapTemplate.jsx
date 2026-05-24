import React from 'react';

export default function ProductRoadmapTemplate() {
  return (
    <div className="relative w-full h-full min-h-[800px] flex items-center justify-center">
      {/* Background Kanban Board (Static) */}
      <div className="relative w-full max-w-5xl h-[600px] bg-white/60 backdrop-blur-md border border-gray-300 rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50">
          <div className="flex-1 p-4 text-center font-bold text-gray-500 uppercase tracking-widest text-sm">Q1 (Jan - Mar)</div>
          <div className="flex-1 p-4 text-center font-bold text-gray-500 uppercase tracking-widest text-sm border-l border-gray-200">Q2 (Apr - Jun)</div>
          <div className="flex-1 p-4 text-center font-bold text-gray-500 uppercase tracking-widest text-sm border-l border-gray-200">Q3 (Jul - Sep)</div>
        </div>
        <div className="flex-1 flex relative">
          <div className="flex-1 border-r border-dashed border-gray-200"></div>
          <div className="flex-1 border-r border-dashed border-gray-200"></div>
          <div className="flex-1"></div>
          
          {/* Draggable Feature Cards (Positioned relative to the board for now) */}
          <div className="absolute w-64 bg-purple-100 border-2 border-purple-300 text-purple-900 rounded-xl p-3 shadow-sm cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '40px', left: '20px', zIndex: 10 }}>
            <div className="font-bold text-sm outline-none focus:ring-2 focus:ring-purple-400 rounded px-1" contentEditable suppressContentEditableWarning>Real-time Collaboration</div>
            <div className="text-xs opacity-70 mt-1 outline-none focus:ring-2 focus:ring-purple-400 rounded px-1" contentEditable suppressContentEditableWarning>WebSockets refactor</div>
          </div>

          <div className="absolute w-64 bg-blue-100 border-2 border-blue-300 text-blue-900 rounded-xl p-3 shadow-sm cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '140px', left: '250px', zIndex: 10 }}>
            <div className="font-bold text-sm outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>GPT-4 Integration</div>
            <div className="text-xs opacity-70 mt-1 outline-none focus:ring-2 focus:ring-blue-400 rounded px-1" contentEditable suppressContentEditableWarning>Auto-generate nodes</div>
          </div>

          <div className="absolute w-64 bg-emerald-100 border-2 border-emerald-300 text-emerald-900 rounded-xl p-3 shadow-sm cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '40px', left: '600px', zIndex: 10 }}>
            <div className="font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-400 rounded px-1" contentEditable suppressContentEditableWarning>Mobile App Beta</div>
            <div className="text-xs opacity-70 mt-1 outline-none focus:ring-2 focus:ring-emerald-400 rounded px-1" contentEditable suppressContentEditableWarning>iOS and Android</div>
          </div>
          
          <div className="absolute w-48 bg-orange-100 border-2 border-orange-300 text-orange-900 rounded-xl p-3 shadow-sm cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '240px', left: '100px', zIndex: 10 }}>
            <div className="font-bold text-sm outline-none focus:ring-2 focus:ring-orange-400 rounded px-1" contentEditable suppressContentEditableWarning>SSO Login</div>
            <div className="text-xs opacity-70 mt-1 outline-none focus:ring-2 focus:ring-orange-400 rounded px-1" contentEditable suppressContentEditableWarning>Enterprise plan</div>
          </div>
        </div>
      </div>
    </div>
  );
}