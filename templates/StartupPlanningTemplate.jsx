import React from 'react';

export default function StartupPlanningTemplate() {
  return (
    <div className="relative w-full h-full min-h-[800px] flex items-center justify-center">
      
      {/* Background Lean Canvas Grid (Static) */}
      <div className="relative w-full max-w-6xl h-[600px] grid grid-cols-5 grid-rows-2 gap-4 pointer-events-none bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-gray-300">
        <div className="border-2 border-gray-300/50 rounded-lg p-4 row-span-2 bg-white"><span className="font-bold text-gray-400 uppercase text-xs">1. Problem</span></div>
        <div className="border-2 border-gray-300/50 rounded-lg p-4 bg-white"><span className="font-bold text-gray-400 uppercase text-xs">4. Solution</span></div>
        <div className="border-2 border-gray-300/50 rounded-lg p-4 row-span-2 bg-white"><span className="font-bold text-gray-400 uppercase text-xs">3. Unique Value</span></div>
        <div className="border-2 border-gray-300/50 rounded-lg p-4 bg-white"><span className="font-bold text-gray-400 uppercase text-xs">9. Unfair Advantage</span></div>
        <div className="border-2 border-gray-300/50 rounded-lg p-4 row-span-2 bg-white"><span className="font-bold text-gray-400 uppercase text-xs">2. Customer Segments</span></div>
        
        <div className="border-2 border-gray-300/50 rounded-lg p-4 bg-white"><span className="font-bold text-gray-400 uppercase text-xs">8. Key Metrics</span></div>
        <div className="border-2 border-gray-300/50 rounded-lg p-4 bg-white"><span className="font-bold text-gray-400 uppercase text-xs">5. Channels</span></div>
      </div>

      {/* Floating Sticky Notes (Positioned absolute relative to container) */}
      <div className="absolute w-48 h-48 bg-yellow-200 shadow-lg p-4 font-serif text-gray-800 -rotate-2 cursor-grab active:cursor-grabbing hover:rotate-0 hover:scale-105 transition-all" style={{ top: '150px', left: '100px', zIndex: 10 }}>
        <div className="text-lg outline-none focus:bg-yellow-100 rounded px-1 h-full w-full" contentEditable suppressContentEditableWarning>Hard to visualize complex systems remotely.</div>
      </div>
      
      <div className="absolute w-48 h-48 bg-green-200 shadow-lg p-4 font-serif text-gray-800 rotate-1 cursor-grab active:cursor-grabbing hover:rotate-0 hover:scale-105 transition-all" style={{ top: '250px', left: '600px', zIndex: 10 }}>
        <div className="text-lg outline-none focus:bg-green-100 rounded px-1 h-full w-full" contentEditable suppressContentEditableWarning>Infinite, real-time multiplayer canvas.</div>
      </div>
      
      <div className="absolute w-48 h-48 bg-blue-200 shadow-lg p-4 font-serif text-gray-800 -rotate-1 cursor-grab active:cursor-grabbing hover:rotate-0 hover:scale-105 transition-all" style={{ top: '180px', left: '950px', zIndex: 10 }}>
        <div className="text-lg outline-none focus:bg-blue-100 rounded px-1 h-full w-full" contentEditable suppressContentEditableWarning>Engineering Teams & Startup Founders.</div>
      </div>

    </div>
  );
}