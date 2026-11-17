'use client';
import { useState } from 'react';

export default function Home() {
  const [coins, setCoins] = useState(2500);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [roomName, setRoomName] = useState('');
  
  const [chatLog, setChatLog] = useState<string[]>([
    '👑 أهلاً بك في قصر الأمير الملكي!',
    '💬 صالة الدردشة وغرف الصوت الحية وصناديق الحظ نشطة.'
  ]);

  const [showGiftModal, setShowGiftModal] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [showMultiplierMenu, setShowMultiplierMenu] = useState(false);

  const giftsList = [
    { name: 'هدية الاحتفال 🎉', cost: 10 },
    { name: 'العنكبوت 🕷️', cost: 10 },
    { name: 'جرس ذهبي 🔔', cost: 10 },
    { name: 'مرحباً (ترحيبية) 🤍', cost: 20 },
    { name: 'ساعة ذهبية فخمة ⌚', cost: 200 },
    { name: 'تاج الذهب الملكي 👑', cost: 500 },
  ];

  const sendGiftWithMultiplier = (giftName: string, baseCost: number) => {
    const totalCost = baseCost * multiplier;
    if (coins < totalCost) {
      alert('عفواً يا ملك، رصيد الكوينز لا يكفي لإرسال هذه الهدية بالمضاعف الحالي!');
      return;
    }
    setCoins(coins - totalCost);
    
    const luckyBonus = multiplier > 10 ? multiplier * 50 : 0;
    if (luckyBonus > 0) {
      setCoins((prev) => prev + luckyBonus);
    }

    const giftMsg = `🎁 أرسل الملك محمد عماد (${giftName}) بـ [×${multiplier} مرة] بتكلفة ${totalCost} ذهب! ${luckyBonus > 0 ? `✨ (كسبت صندوق حظ: +${luckyBonus} ذهب)` : ''}`;
    setChatLog((prev) => [giftMsg, ...prev.slice(0, 5)]);
    setShowGiftModal(false);
  };

  if (currentScreen === 'home') {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center font-sans">
        <div className="w-full max-w-md space-y-6">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 flex items-center justify-between shadow-lg">
            <div>
              <h2 className="text-lg font-bold text-amber-400">الملك محمد عماد</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-amber-300 font-black">{coins}</span>
                <span className="text-xs text-amber-200/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">🪙 ذهب</span>
              </div>
            </div>
            <button 
              onClick={() => setCoins(coins + 1000)}
              className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-2 rounded-xl shadow hover:bg-amber-400 transition"
            >
              شحن +1000 ✨
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              🎙️ غرف الصوت الملكية وصناديق الحظ
            </h3>
            
            <div className="space-y-3">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-amber-400">سهرة الملوك الكبرى (15 مقعد)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">المضيف: الأمير العام • 15 مستخدم</p>
                </div>
                <button 
                  onClick={() => { setRoomName('سهرة الملوك الكبرى'); setCurrentScreen('room'); }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  دخول الغرفة 🎧
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 flex flex-col items-center font-sans relative">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-4 shadow-2xl flex flex-col h-[90vh]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <div>
            <h2 className="font-bold text-amber-400 text-sm">{roomName}</h2>
            <span className="text-[10px] text-emerald-400">مكالمة صوتية نشطة</span>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/40 px-2 py-0.5 rounded-xl text-center">
            <div className="text-[9px] text-amber-300">صندوق الحظ</div>
            <div className="text-[11px] font-black text-amber-400">151,337 ذهب</div>
          </div>
          <button 
            onClick={() => setCurrentScreen('home')}
            className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-bold"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1.5 mb-3">
          {Array.from({ length: 15 }, (_, i) => i + 1).map((micNum) => (
            <div key={micNum} className="bg-slate-950 border border-slate-800 p-2 rounded-xl flex flex-col items-center justify-center text-center aspect-square">
              <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs mb-1">
                {micNum === 8 ? '👑' : '+'}
              </div>
              <span className="text-[9px] text-slate-400">No.{micNum}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex-1 overflow-y-auto mb-3 text-xs space-y-1">
          <div className="text-[10px] font-bold text-amber-400 mb-1 border-b border-slate-800 pb-0.5">📜 سجل التفاعل:</div>
          {chatLog.map((log, index) => (
            <div key={index} className="text-slate-300 bg-slate-900/60 p-1.5 rounded border border-slate-800/50 text-[11px]">
              {log}
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
          <button 
            onClick={() => alert('تم فتح الميكروفون بنجاح يا ملك!')}
            className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs"
          >
            🎤 مايك
          </button>

          <button 
            onClick={() => setShowGiftModal(true)}
            className="flex-1 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 text-slate-950 font-black py-2 rounded-xl text-xs shadow-lg"
          >
            🎁 الهدايا (×{multiplier})
          </button>

          <button 
            onClick={() => setCoins(coins + 500)}
            className="bg-slate-800 border border-amber-500/30 text-amber-400 font-bold px-3 py-2 rounded-xl text-xs"
          >
            ✨ شحن
          </button>
        </div>
      </div>

      {showGiftModal && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex items-end justify-center z-50">
          <div className="w-full max-w-md bg-slate-900 border-t border-amber-500/50 rounded-t-3xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-amber-400">🎁 خزانة الهدايا الملكية</h3>
              <button onClick={() => setShowGiftModal(false)} className="text-slate-400 hover:text-white text-xs font-bold">✕</button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 max-h-[35vh] overflow-y-auto">
              {giftsList.map((gift, idx) => (
                <div 
                  key={idx}
                  onClick={() => sendGiftWithMultiplier(gift.name, gift.cost)}
                  className="bg-slate-950 border border-slate-800 hover:border-amber-500 p-3 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition"
                >
                  <span className="text-2xl mb-1">{gift.name.split(' ').pop()}</span>
                  <div className="text-[11px] font-bold text-white">{gift.name.replace(/[^أ-ي]/g, '')}</div>
                  <div className="text-[10px] text-amber-400">{gift.cost * multiplier} ذهب</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-2 relative">
              <span className="text-xs text-amber-400 font-bold">مضاعف الهدية (X):</span>
              
              <div className="relative">
                <button 
                  onClick={() => setShowMultiplierMenu(!showMultiplierMenu)}
                  className="bg-amber-500 text-slate-950 font-black px-4 py-1.5 rounded-lg text-xs shadow"
                >
                  ×{multiplier} ∧
                </button>

                {showMultiplierMenu && (
                  <div className="absolute bottom-10 right-0 bg-slate-950 border border-amber-500/50 rounded-xl shadow-2xl w-28 py-1 z-50">
                    {[1, 3, 10, 50, 100, 500, 1000].map((num) => (
                      <div 
                        key={num}
                        onClick={() => { setMultiplier(num); setShowMultiplierMenu(false); }}
                        className="px-4 py-2 text-xs text-center text-white hover:bg-amber-500 hover:text-slate-950 font-bold cursor-pointer"
                      >
                        ×{num}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
