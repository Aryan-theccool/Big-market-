import React from 'react';

export default function DSAFlowchartTemplate() {
  const NodeStyle = "absolute w-16 h-16 rounded-full bg-amber-50 border-4 border-amber-400 flex items-center justify-center text-amber-700 font-bold text-2xl shadow-md cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform z-10";

  return (
    <div className="relative w-full h-full min-h-[800px]">
      {/* SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <path d="M 500 150 L 350 300" stroke="#fbbf24" strokeWidth="4" fill="none" />
        <path d="M 500 150 L 650 300" stroke="#fbbf24" strokeWidth="4" fill="none" />
        <path d="M 350 300 L 250 450" stroke="#fbbf24" strokeWidth="4" fill="none" />
        <path d="M 350 300 L 450 450" stroke="#fbbf24" strokeWidth="4" fill="none" />
        <path d="M 650 300 L 750 450" stroke="#fbbf24" strokeWidth="4" fill="none" />
      </svg>

      {/* Nodes */}
      <div className={NodeStyle} style={{ top: '118px', left: '468px' }}>
        <div className="outline-none" contentEditable suppressContentEditableWarning>8</div>
      </div>
      
      <div className={NodeStyle} style={{ top: '268px', left: '318px' }}>
        <div className="outline-none" contentEditable suppressContentEditableWarning>3</div>
      </div>
      
      <div className={NodeStyle} style={{ top: '268px', left: '618px' }}>
        <div className="outline-none" contentEditable suppressContentEditableWarning>10</div>
      </div>
      
      <div className={NodeStyle} style={{ top: '418px', left: '218px' }}>
        <div className="outline-none" contentEditable suppressContentEditableWarning>1</div>
      </div>
      
      <div className={NodeStyle} style={{ top: '418px', left: '418px' }}>
        <div className="outline-none" contentEditable suppressContentEditableWarning>6</div>
      </div>
      
      <div className={NodeStyle} style={{ top: '418px', left: '718px' }}>
        <div className="outline-none" contentEditable suppressContentEditableWarning>14</div>
      </div>

      {/* Helper Annotation */}
      <div className="absolute bg-white p-4 rounded-xl border border-gray-200 shadow-lg font-mono text-sm text-gray-700 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform" style={{ top: '200px', left: '800px', zIndex: 10 }}>
        <div className="text-amber-600 font-bold mb-2 outline-none" contentEditable suppressContentEditableWarning>// Binary Search Tree</div>
        <div className="outline-none px-1 hover:bg-gray-100 rounded" contentEditable suppressContentEditableWarning>Insert: O(log n)</div>
        <div className="outline-none px-1 hover:bg-gray-100 rounded" contentEditable suppressContentEditableWarning>Search: O(log n)</div>
        <div className="outline-none px-1 hover:bg-gray-100 rounded" contentEditable suppressContentEditableWarning>Space:  O(n)</div>
      </div>
    </div>
  );
}