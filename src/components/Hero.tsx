import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { MorphReveal } from './ui/MorphReveal';
import { SectionReveal } from './ui/SectionReveal';

// --- KOMPONEN BACKGROUND GELOMBANG ---
const WaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let waves: any[] = [];
    let animationId: number;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const initWaves = () => {
      waves = [];
      for (let i = 0; i < 3; i++) {
        waves.push({
          y: height * 0.5,
          len: 0.002 + Math.random() * 0.005,
          amp: 40 + Math.random() * 40,
          speed: 0.005 + Math.random() * 0.01,
          off: Math.random() * Math.PI * 2
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      waves.forEach((w, i) => {
        ctx.beginPath();
        // Warna garis gelombang biru terang
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 + (i * 0.1)})`;
        ctx.lineWidth = 2;
        for (let x = 0; x < width; x++) {
          ctx.lineTo(x, w.y + Math.sin(x * w.len + w.off) * w.amp * Math.sin(w.off * 0.5));
        }
        ctx.stroke();
        w.off += w.speed;
      });
      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      initWaves();
    };

    window.addEventListener('resize', handleResize);
    resize();
    initWaves();
    draw();

    // Cleanup memori saat pindah halaman
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-none">
      {/* Warna Dasar Gelap */}
      <div className="absolute inset-0 bg-[#0B1120] z-[-3]" />
      
      {/* Canvas Efek Gelombang */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[-2] w-full h-full opacity-50 mix-blend-screen"
      />
      
      {/* Overlay Gradasi agar menyatu */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, #0B1120 90%)'
        }}
      />
    </div>
  );
};

// --- KOMPONEN HERO UTAMA ---
export const Hero: React.FC = () => {
  return (
    <SectionReveal direction="fade" className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10 pt-12 overflow-hidden">

      {/* Memanggil Background Gelombang */}
      <WaveBackground />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-left max-w-2xl">

          <MorphReveal animation="slideRight" easing="bouncy" delay={0.1}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/8 border border-white/10 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs tracking-[0.15em] text-emerald-300 uppercase" style={{ fontWeight: 600 }}>
                Pendaftaran Dibuka 2026
              </span>
            </div>
          </MorphReveal>

          {/* Main Heading — Cinzel Font dengan spasi (tracking) renggang */}
          <MorphReveal animation="clip" easing="sharp" duration={1} delay={0.2}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-[0.92] tracking-tight"
              style={{ fontFamily: "'Cinzel', serif", fontWeight: 400 }}
            >
              <span style={{ color: '#F9F9F9' }}>SMP IT</span>
              <br />
              <span style={{ color: '#F9F9F9' }}>Thoriqul</span>
              <br />
              <span style={{ color: '#FFD700' }}>Jannah</span>
            </h1>
          </MorphReveal>

          <MorphReveal animation="slideUp" easing="smooth" delay={0.4}>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg leading-relaxed border-l-2 border-yellow-500/60 pl-6" style={{ fontWeight: 300 }}>
              SMPIT Thoriqul Jannah adalah sekolah tingkat menengah yang akan mencetak peserta didiknya menjadi pribadi yang Sholeh, Mandiri, Kreatif dan Berprestasi.
            </p>
          </MorphReveal>

          <div className="flex flex-wrap gap-4">
            <MorphReveal animation="zoom" easing="bouncy" delay={0.6}>
              <a
                href="#ppdb"
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/30 flex items-center gap-2.5 border border-blue-500/30"
                style={{ fontWeight: 600 }}
              >
                Daftar Sekarang <ArrowRight size={18} />
              </a>
            </MorphReveal>

            <MorphReveal animation="zoom" easing="bouncy" delay={0.7}>
              <button
                className="px-8 py-4 bg-white/5 text-white rounded-2xl hover:bg-white/10 transition-all border border-white/10 flex items-center gap-3 group"
                style={{ fontWeight: 600 }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={12} fill="currentColor" />
                </div>
                Lihat Video
              </button>
            </MorphReveal>
          </div>
        </div>

        {/* Right Side Visual */}
        <div className="hidden lg:block relative h-[550px]">
          <MorphReveal animation="slideLeft" easing="slow" duration={1.2} className="absolute top-8 right-8 z-10">
            <div className="w-[380px] h-[480px] bg-slate-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 relative">
              <img
                src="https://images.unsplash.com/photo-1719159381916-062fa9f435a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwc2Nob29sJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NzE0NzMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Siswa Thoriqul Jannah"
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-8 left-8"
              >
                <p className="text-4xl text-white" style={{ fontWeight: 800 }}>98%</p>
                <p className="text-sm text-slate-400 uppercase tracking-[0.15em]" style={{ fontWeight: 600 }}>Lulusan PTN</p>
              </motion.div>
            </div>
          </MorphReveal>

          {/* Background card shape */}
          <MorphReveal animation="slideLeft" easing="slow" delay={0.2} duration={1.2} className="absolute bottom-8 left-8 z-0">
            <div className="w-[300px] h-[400px] bg-gradient-to-br from-yellow-600/30 to-amber-700/30 rounded-3xl opacity-60 scale-95" />
          </MorphReveal>
        </div>
      </div>
    </SectionReveal>
  );
};
