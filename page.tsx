'use client';
import { useState } from 'react';

export default function AlAmeerApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [coins, setCoins] = useState(2000);
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' or 'room'
  const [roomName, setRoomName] = useState('');

  // محاكاة تسجيل الدخول أو إنشاء الحساب
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegistering && !name)) {
      alert('الرجاء إدخال جميع البيانات المطلوبة يا ملك');
      return;
    }
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center justify-center font-sans">
        <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-amber-400 mb-2">👑 تطبيق الأمير 👑</h1>
            <p className="text-sm text-slate-400">مجتمع الصوت والترفيه الملكي</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-xs text-amber-400 mb-1">اسم الملك (البروفايل)</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: محمد عماد"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-amber-400 mb-1">البريد الإلكتروني</name>
              <input 
                type="email5" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-amber-400 mb-1">كلمة المرور</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition mt-2"
            >
              {isRegistering ? 'إنشاء حساب ملكي جديد ✨' : 'تسجيل الدخول للقصر 🚀'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-amber-400/80 hover:underline"
            >
              {isRegistering ? 'عندك حساب بالفعل؟ تسجيل الدخول' : 'ما عندكش حساب؟ أنشئ حساباً جديداً'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // الواجهة الرئيسية بعد الدخول
  if (currentScreen === 'home') {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center font-sans">
        <div className="w-full max-w-md space-y-6">
          {/* هيدر الملف الشخصي */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 flex items-center justify-between shadow-lg">
            <div>
              <h2 className="text-lg font-bold text-amber-400">{name || 'الملك محمد عماد'}</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-amber-300 font-black">{coins}</span>
                <span className="text-xs text-amber-200/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">🪙 كوينز</span>
              </div>
            </div>
            <button 
              onClick={() => setCoins(coins + 1000)}
              className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-2 rounded-xl shadow hover:bg-amber-400"
            >
              شحن مجاني +1000
            </button>
          </div>

          {/* قسم الروم والصوتيات */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              🎙️ غرف الصوت النشطة
            </h3>
            
            <div className="space-y-3">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-amber-400">سهرة الملوك الكبرى</h4>
                  <p className="text-xs text-slate-400 mt-0.5">المضيف: الأمير العام • 15 مستخدم</p>
                </div>
                <button 
                  onClick={() => { setRoomName('سهرة الملوك الكبرى'); setCurrentScreen('room'); }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  دخول الروم 🎧
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-amber-400">ديوانية الأصدقاء</h4>
                  <p className="text-xs text-slate-400 mt-0.5">المضيف: سارة • 8 مستخدمين</p>
                </div>
                <button 
                  onClick={() => { setRoomName('ديوانية الأصدقاء'); setCurrentScreen('room'); }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  دخول الروم 🎧
                </button>
              </div>
            </div>
          </div>

          {/* زر تسجيل الخروج */}
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold py-2.5 rounded-xl text-xs hover:bg-red-500/20 transition"
          >
            تسجيل الخروج من القصر 🚪
          </button>
        </div>
      </main>
    );
  }

  // شاشة الروم الصوتية داخل التطبيق
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-2xl flex flex-col h-[80vh]">
        {/* هيدر الروم */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <h2 className="font-bold text-amber-400 text-base">{roomName}</h2>
            <span className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> مكالمة صوتية مباشرة نشطة
            </span>
          </div>
          <button 
            onClick={() => setCurrentScreen('home')}
            className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-700"
          >
            مغادرة الروم ✕
          </button>
        </div>

        {/* الميكروفونات (المايكات) داخل الروم */}
        <div className="grid grid-cols-3 gap-3 my-auto">
          {[1, 2, 3, 4, 5, 6].map((micNum) => (
            <div key={micNum} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex flex-col items-center justify-center aspect-square text-center">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold mb-1">
                🎙️
              </div>
              <span className="text-[11px] text-slate-300 font-medium">مايك {micNum}</span>
              <span className="text-[9px] text-emerald-400">متاح</span>
            </div>
          ))}
        </div>

        {/* أزرار تفاعل الروم */}
        <div className="mt-auto pt-3 border-t border-slate-800 flex gap-2">
          <button 
            onClick={() => alert('تم فتح الميكروفون بنجاح يا ملك!')}
            className="flex-1 bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs shadow hover:bg-amber-400"
          >
            فتح المايك 🎤
          </button>
          <button 
            onClick={() => setCoins(coins + 500)}
            className="flex-1 bg-slate-800 border border-amber-500/30 text-amber-400 font-bold py-2.5 rounded-xl text-xs hover:bg-slate-700"
          >
            إرسال هدية 🎁
          </button>
        </div>
      </div>
    </main>
  );
}
