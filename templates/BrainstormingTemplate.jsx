import React from 'react';

export default function BrainstormingTemplate() {
  return (
    <div className="relative w-full h-full min-h-[800px]">
      {/* Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <path d="M 500 400 Q 300 200 200 150" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4,4" fill="none" />
        <path d="M 500 400 Q 700 200 800 150" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4,4" fill="none" />
        <path d="M 500 400 Q 300 600 200 650" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4,4" fill="none" />
        <path d="M 500 400 Q 700 600 800 650" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4,4" fill="none" />
      </svg>

      {/* Central Idea */}
      <div className="absolute w-56 h-24 bg-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.4)] rounded-full flex items-center justify-center text-white cursor-grab active:cursor-grabbing hover:scale-105 transition-transform" style={{ top: '352px', left: '388px', zIndex: 10 }}>
        <div className="font-black text-xl text-center outline-none px-2 rounded focus:bg-orange-600" contentEditable suppressContentEditableWarning>LAUNCH IDEAS</div>
      </div>

      {/* Sticky Notes */}
      <div className="absolute w-56 h-56 bg-yellow-200 shadow-xl p-6 font-serif text-gray-800 -rotate-3 cursor-grab active:cursor-grabbing hover:rotate-0 hover:-translate-y-2 transition-all" style={{ top: '50px', left: '100px', zIndex: 10 }}>
        <div className="text-lg leading-relaxed h-full w-full outline-none focus:bg-yellow-100 rounded px-1" contentEditable suppressContentEditableWarning>Partner with design agencies to offer templates out of the box!</div>
      </div>

      <div className="absolute w-56 h-56 bg-green-200 shadow-xl p-6 font-serif text-gray-800 rotate-2 cursor-grab active:cursor-grabbing hover:rotate-0 hover:-translate-y-2 transition-all" style={{ top: '80px', left: '700px', zIndex: 10 }}>
        <div className="text-lg leading-relaxed h-full w-full outline-none focus:bg-green-100 rounded px-1" contentEditable suppressContentEditableWarning>Product Hunt launch video needs to show the drag-and-drop.</div>
      </div>

      <div className="absolute w-56 h-56 bg-pink-200 shadow-xl p-6 font-serif text-gray-800 -rotate-1 cursor-grab active:cursor-grabbing hover:rotate-0 hover:-translate-y-2 transition-all" style={{ top: '550px', left: '120px', zIndex: 10 }}>
        <div className="text-lg leading-relaxed h-full w-full outline-none focus:bg-pink-100 rounded px-1" contentEditable suppressContentEditableWarning>Add dark mode before we launch the beta. Users will ask for it.</div>
      </div>

      <div className="absolute w-56 h-56 bg-blue-200 shadow-xl p-6 font-serif text-gray-800 rotate-3 cursor-grab active:cursor-grabbing hover:rotate-0 hover:-translate-y-2 transition-all" style={{ top: '500px', left: '720px', zIndex: 10 }}>
        <div className="text-lg leading-relaxed h-full w-full outline-none focus:bg-blue-100 rounded px-1" contentEditable suppressContentEditableWarning>Freemium model: 3 boards free, then $10/mo.</div>
      </div>
    </div>
  );
}