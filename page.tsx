'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ckrfnznzjfmdynjfnxie.supabase.co';
const SUPABASE_ANON_KEY = 'Sb_publishable_rL91ij61_bevbAkk3tTR3A_rIebaeQm';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function AlAmeerApp() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isReg, setIsReg] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) fetchProfile(session.user.id);
    });
  }, []);

  const fetchProfile = async (id: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (data) setProfile(data);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.includes('@') ? email : `${email.trim()}@alameer.app`;
    if (isReg) {
      const { data, error } = await supabase.auth.signUp({ email: cleanEmail, password });
      if (error) { alert('خطأ: ' + error.message); return; }
      if (data.user) {
        await supabase.from('profiles').insert([{ id: data.user.id, username: name || 'أمير', coins: 1500 }]);
        alert('تم إنشاء الحساب الملكي بنجاح! 👑');
        setUser(data.user);
        fetchProfile(data.user.id);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
      if (error) { alert('خطأ في الدخول: ' + error.message); return; }
      setUser(data.user);
      fetchProfile(data.user.id);
    }
  };

  const addCoins = async () => {
    const newCoins = (profile?.coins || 0) + 500;
    await supabase.from('profiles').update({ coins: newCoins }).eq('id', user.id);
    setProfile({ ...profile, coins: newCoins });
    alert('تم شحن 500 كوينز بنجاح! 🪙');
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-900 border border-amber-500/30 p-6 rounded-3xl shadow-2xl text-center">
          <h1 className="text-3xl font-black text-amber-400 mb-2">👑 AL AMEER 👑</h1>
          <p className="text-xs text-slate-400 mb-6">مملكة الصوت الملكي</p>
          <div className="flex bg-slate-950 p-1 rounded-xl mb-4 border border-slate-800">
            <button onClick={() => setIsReg(false)} className={`flex-1 py-2 text-xs font-bold rounded-lg ${!isReg ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>دخول</button>
            <button onClick={() => setIsReg(true)} className={`flex-1 py-2 text-xs font-bold rounded-lg ${isReg ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>حساب جديد</button>
          </div>
          <form onSubmit={handleAuth} className="space-y-3 text-right">
            {isReg && (
              <div>
                <label className="text-[11px] text-amber-400 block mb-1">اسمك الملكي</label>
                <input type="text" placeholder="محمد عماد" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-white" required />
              </div>
            )}
            <div>
              <label className="text-[11px] text-amber-400 block mb-1">رقم الهاتف أو المعرف</label>
              <input type="text" placeholder="اكتب رقمك" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-white" required />
            </div>
            <div>
              <label className="text-[11px] text-amber-400 block mb-1">كلمة المرور</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-white" required />
            </div>
            <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl text-sm mt-3 shadow-lg">{isReg ? 'إنشاء حساب جديد ✨' : 'دخول القصر 🚪'}</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <div className="bg-slate-900 border border-amber-500/40 p-5 rounded-3xl flex justify-between items-center shadow-xl">
          <div>
            <h2 className="text-lg font-black text-amber-400">أهلاً، {profile?.username || 'أمير'} 👑</h2>
            <p className="text-[10px] text-slate-400">متصل الآن داخل القصر</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-300 font-bold text-xs">
            🪙 {profile?.coins || 0}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
          <h3 className="text-sm font-bold text-amber-400 mb-2">🎁 شحن الرصيد الملكي</h3>
          <button onClick={addCoins} className="w-full bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs shadow-md">شحن +500 كوينز مجاناً</button>
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => setUser(null))} className="w-full bg-red-600/10 border border-red-500/30 text-red-400 py-2.5 rounded-xl text-xs font-bold">تسجيل الخروج</button>
      </div>
    </main>
  );
}
