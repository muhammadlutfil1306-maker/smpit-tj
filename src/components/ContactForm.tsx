import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pesan }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setPesan('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4 bg-slate-800/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl"
      >
        <div className="mb-2 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Hubungi Kami</h3>
          <p className="text-sm text-slate-300">
            Punya pertanyaan seputar sekolah atau pendaftaran? Kirimkan pesan Anda di bawah ini.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email Anda</label>
          <input
            type="email"
            placeholder="nama@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Pesan</label>
          <textarea
            placeholder="Tulis pertanyaan Anda di sini..."
            required
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            rows={4}
            className="px-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`mt-2 px-6 py-3.5 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
            status === 'success' 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
          } disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {status === 'loading' && <Loader2 className="animate-spin" size={18} />}
          {status === 'success' && <CheckCircle2 size={18} />}
          {status === 'idle' || status === 'error' ? <Send size={18} /> : null}
          
          {status === 'loading' ? 'Mengirim...' : 
           status === 'success' ? 'Pesan Terkirim!' : 'Kirim Pesan'}
        </button>

        {status === 'error' && (
          <p className="text-red-400 text-sm mt-1 text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
            Gagal mengirim pesan. Silakan coba lagi.
          </p>
        )}
      </form>
    </div>
  );
};
