'use client';
import { useState } from 'react';

export default function Home() {
  const [coins, setCoins] = useState(2500);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-center">
        <h1 className="text-3xl font-extrabold text-amber-400 mb-2">👑 تطبيق الأمير 👑</h1>
        <p className="text-sm text-slate-400 mb-6">مجتمع الصوت والترفيه الملكي</p>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
          <h2 className="text-xl font-bold text-white mb-1">الملك محمد عماد</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-amber-400 text-2xl font-black">{coins}</span>
            <span className="text-sm text-amber-200/80 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">🪙 كوينز</span>
          </div>
        </div>

        <button 
          onClick={() => setCoins(coins + 500)}
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition"
        >
          شحن +500 كوينز مجاناً ✨
        </button>
      </div>
    </main>
  );
}
