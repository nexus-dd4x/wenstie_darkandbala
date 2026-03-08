"use client";

import { useState, useEffect } from "react";

const players = [
  {
    id: "dd4x",
    codename: "DD4X",
    realRole: "IMMA DD4X",
    title: "NEXUS Leader",
    roles: ["IGL Caller", "All-Rounder", "Editor", "Content Creator"],
    rank: "LEADER",
    color: "#D4AF37",
    glow: "rgba(212,175,55,0.6)",
    icon: "👑",
    image: "1.jpeg",
    stats: { Leadership: 98, Combat: 92, Strategy: 96 },
    badge: "FOUNDER",
  },
  {
    id: "bala",
    codename: "BALA",
    realRole: "IMMA BALA",
    title: "Acting Guild Leader",
    roles: ["Content Creator", "Software Developer", "Shoutcaster", "Rusher"],
    rank: "GUILD LEADER",
    color: "#C0392B",
    glow: "rgba(192,57,43,0.6)",
    icon: "⚡",
    image: "2.jpeg",
    stats: { Rushing: 95, Coding: 90, Content: 88 },
    badge: "GUILD LEADER",
  },
  {
    id: "phoenix",
    codename: "PHOENIX",
    realRole: "IMMA PHOENIX",
    title: "Officer",
    roles: ["Sniper", "Shoutcaster", "Content Creator"],
    rank: "OFFICER",
    color: "#FF6B00",
    glow: "rgba(255,107,0,0.6)",
    icon: "🔭",
    image: "3.jpeg",
    stats: { Sniping: 97, Casting: 85, Precision: 94 },
    badge: "OFFICER",
  },
];

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="mb-2.5 group">
      <div className="flex justify-between text-[0.58rem] text-gray-400 tracking-[0.2em] mb-1">
        <span>{label}</span>
        <span style={{ color }} className="animate-pulse">{value}</span>
      </div>
      <div className="h-0.5 bg-neutral-900 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}50, ${color})`,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}

function PlayerCard({ player, isActive, onClick }: { player: typeof players[0]; isActive: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden group hover:z-10 ${
        isActive ? "translate-y-[-8px] scale-102" : "translate-y-0 scale-100"
      }`}
      style={{
        borderColor: isActive ? player.color : player.color + "30",
        background: isActive ? `${player.color}08` : "rgba(255,255,255,0.012)",
        boxShadow: isActive ? `0 24px 60px ${player.glow}, 0 0 0 1px ${player.color}40` : "none",
      }}
    >
      {/* animated corner glitch */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: player.color, filter: `drop-shadow(0 0 5px ${player.color})` }} />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: player.color, filter: `drop-shadow(0 0 5px ${player.color})` }} />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: player.color, filter: `drop-shadow(0 0 5px ${player.color})` }} />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: player.color, filter: `drop-shadow(0 0 5px ${player.color})` }} />
      </div>

      {/* top edge glow with animation */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-400 animate-pulse"
        style={{
          background: `linear-gradient(90deg, transparent, ${player.color}, transparent)`,
          opacity: isActive ? 1 : 0.3,
        }}
      />

      {/* corner accents */}
      {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((pos) => {
        const [v, h] = pos.split("-");
        return (
          <div
            key={pos}
            className={`absolute w-3.5 h-3.5 transition-opacity duration-400`}
            style={{
              [v]: -1,
              [h]: -1,
              borderTop: v === "top" ? `2px solid ${player.color}` : "none",
              borderBottom: v === "bottom" ? `2px solid ${player.color}` : "none",
              borderLeft: h === "left" ? `2px solid ${player.color}` : "none",
              borderRight: h === "right" ? `2px solid ${player.color}` : "none",
              opacity: isActive ? 1 : 0.4,
            }}
          />
        );
      })}

      {/* header section */}
      <div
        className="px-6 py-5 border-b transition-colors duration-400"
        style={{
          borderBottomColor: player.color + "15",
          background: isActive ? `linear-gradient(180deg, ${player.color}10, transparent)` : "transparent",
        }}
      >
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className="w-16 h-16 rounded-full border-2 flex-shrink-0 relative overflow-hidden bg-neutral-950 group-hover:animate-[spin_4s_linear_infinite]"
            style={{
              borderColor: player.color,
              boxShadow: isActive ? `0 0 20px ${player.glow}, 0 0 40px ${player.glow}` : `0 0 8px ${player.color}40`,
              transition: "box-shadow 0.4s",
            }}
          >
            <img
              src={player.image}
              alt={player.codename}
              className={`w-full h-full object-cover object-top transition-all duration-400 group-hover:scale-110 group-hover:rotate-3 ${
                isActive ? "brightness-110 contrast-105" : "brightness-75 grayscale-25"
              }`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const fallback = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div
              className="hidden absolute inset-0 items-center justify-center text-2xl animate-pulse"
              style={{
                background: `radial-gradient(circle at 40% 40%, ${player.color}20, #000)`,
              }}
            >
              {player.icon}
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, transparent 40%, ${player.color}35 100%)`,
              }}
            />
          </div>

          <div>
            <div className="text-[0.52rem] tracking-[0.35em] mb-1 opacity-80 animate-pulse" style={{ color: player.color }}>
              [ {player.rank} ]
            </div>
            <div
              className="text-2xl font-black tracking-[0.1em] leading-none transition-all duration-400 group-hover:tracking-[0.15em]"
              style={{
                color: player.color,
                fontFamily: "'Arial Black', sans-serif",
                textShadow: isActive ? `0 0 20px ${player.glow}` : "none",
              }}
            >
              {player.codename}
            </div>
          </div>

          <div
            className="ml-auto px-2 py-0.5 text-[0.48rem] tracking-[0.2em] whitespace-nowrap animate-pulse"
            style={{
              border: `1px solid ${player.color}50`,
              color: player.color,
              background: `${player.color}12`,
            }}
          >
            {player.badge}
          </div>
        </div>

        <div className="text-xs text-neutral-400 tracking-wide mb-1 group-hover:translate-x-1 transition-transform">{player.realRole}</div>
        <div className="text-sm text-neutral-300 italic group-hover:text-white transition-colors">{player.title} – Nexus Esports</div>
      </div>

      {/* expanded stats section */}
      <div
        className="transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden"
        style={{ maxHeight: isActive ? "400px" : "0px" }}
      >
        <div className="p-6 pt-5">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {player.roles.map((r, i) => (
              <span
                key={r}
                className="px-2.5 py-1 text-[0.55rem] tracking-widest animate-[fadeInUp_0.3s_ease_forwards]"
                style={{
                  border: `1px solid ${player.color}35`,
                  color: player.color,
                  background: `${player.color}10`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                {r.toUpperCase()}
              </span>
            ))}
          </div>
          <div className="text-[0.52rem] tracking-[0.3em] text-neutral-600 mb-3 animate-pulse">── STATS ──</div>
          {Object.entries(player.stats).map(([k, v], i) => (
            <div key={k} className="animate-[fadeInUp_0.3s_ease_forwards]" style={{ animationDelay: `${i * 0.1 + 0.3}s`, opacity: 0, animationFillMode: "forwards" }}>
              <StatBar label={k} value={v} color={player.color} />
            </div>
          ))}
        </div>
      </div>

      {/* collapsed roles preview */}
      <div
        className="transition-[max-height] duration-400 ease-in-out overflow-hidden"
        style={{ maxHeight: isActive ? "0px" : "60px" }}
      >
        <div className="px-6 py-3 pb-4">
          <div className="text-xs text-neutral-500 tracking-wide group-hover:text-neutral-300 transition-colors">{player.roles.join(" · ")}</div>
        </div>
      </div>

      {/* footer hint with bounce */}
      <div
        className="px-6 pb-3.5 text-[0.5rem] tracking-widest text-right group-hover:animate-bounce"
        style={{ color: `${player.color}60` }}
      >
        {isActive ? "▲ COLLAPSE" : "▼ VIEW PROFILE"}
      </div>
    </div>
  );
}

function SectionTitle({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="text-center group">
      <div className="text-[0.58rem] tracking-[0.5em] text-neutral-600 mb-3 uppercase group-hover:tracking-[0.7em] transition-all duration-500">{label}</div>
      <h2
        className="text-[clamp(1.8rem,6vw,3.2rem)] font-black tracking-[0.15em] text-[#D4AF37] m-0 relative inline-block"
        style={{ fontFamily: "'Arial Black',sans-serif", textShadow: "0 0 40px rgba(212,175,55,0.3)" }}
      >
        {sub}
        <span className="absolute -inset-1 blur-xl bg-[#D4AF37]/20 animate-pulse rounded-lg -z-10"></span>
      </h2>
      <div className="mt-4 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent group-hover:w-32 transition-all duration-700" />
    </div>
  );
}

function InputField({ label, placeholder, value, onChange, accent }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; accent: string;
}) {
  return (
    <div className="group">
      <div className="text-[0.58rem] tracking-widest mb-2 group-hover:translate-x-1 transition-transform" style={{ color: accent }}>{label}</div>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-white border px-4 py-3 text-sm outline-none transition-all duration-200 block group-hover:scale-105 origin-left"
        style={{ borderColor: `${accent}40` }}
        onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.boxShadow = `0 0 12px ${accent}30`; }}
        onBlur={(e) => { e.target.style.borderColor = `${accent}40`; e.target.style.boxShadow = "none"; }}
      />
    </div>
  );
}

export default function NexusEsportsPage() {
  const [platform, setPlatform] = useState<"pc" | "mobile" | null>(null);
  const [introStep, setIntroStep] = useState(0);
  const [showMain, setShowMain] = useState(false);
  const [regForm, setRegForm] = useState({ teamName: "", phone: "", gameName: "" });
  const [regType, setRegType] = useState<"player" | "team" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [activePlayer, setActivePlayer] = useState<string | null>("dd4x");
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number; dur: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setParticles(
      Array.from({ length: 60 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 5,
        dur: Math.random() * 6 + 4,
      }))
    );

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!platform) return;
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setIntroStep(1), 300));
    t.push(setTimeout(() => setIntroStep(2), 1000));
    t.push(setTimeout(() => setIntroStep(3), 1800));
    t.push(setTimeout(() => setIntroStep(4), 2600));
    t.push(setTimeout(() => { setIntroStep(5); setShowMain(true); }, 3800));
    return () => t.forEach(clearTimeout);
  }, [platform]);

  const isMobile = platform === "mobile";

  // Particles component with mouse follow effect
  const Particles = ({ fixed = false }: { fixed?: boolean }) => (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute ${fixed ? "fixed" : ""} rounded-full pointer-events-none z-0 transition-transform duration-300`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#C0392B" : "#FF6B00",
            animation: `floatUp ${p.dur}s ${p.delay}s infinite ease-in-out`,
            opacity: 0.4,
            transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`,
          }}
        />
      ))}
    </>
  );

  // Platform selector
  if (!platform) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <style>{`
          @keyframes floatUp { 
            0%,100%{transform:translateY(0) scale(1);opacity:0.5;} 
            50%{transform:translateY(-30px) scale(1.3);opacity:0.9;} 
          }
          @keyframes glowPulse { 
            0%,100%{opacity:0.6;filter:blur(0px);} 
            50%{opacity:1;filter:blur(2px);} 
          }
          @keyframes rotateGlow {
            0%{transform:rotate(0deg) scale(1);}
            100%{transform:rotate(360deg) scale(1.2);}
          }
          @keyframes borderPulse {
            0%,100%{border-color:rgba(212,175,55,0.5);box-shadow:0 0 20px rgba(212,175,55,0.3);}
            50%{border-color:rgba(212,175,55,1);box-shadow:0 0 40px rgba(212,175,55,0.8);}
          }
        `}</style>
        <Particles />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:60px_60px] z-0 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] z-0 animate-[rotateGlow_20s_linear_infinite]" />
        <div className="relative z-10 text-center px-6">
          <div className="mb-12 animate-[glowPulse_2s_infinite]">
            <img src="/logo.png" alt="Nexus" className="w-[120px] h-[120px] object-contain mx-auto mb-4 drop-shadow-[0_0_30px_rgba(212,175,55,0.9)] hover:scale-110 transition-transform duration-300" />
            <div className="text-[clamp(2.4rem,9vw,4rem)] font-black tracking-[0.2em] text-[#D4AF37] leading-none drop-shadow-[0_0_40px_rgba(212,175,55,0.8)] animate-pulse" style={{ fontFamily: "'Arial Black',sans-serif" }}>NEXUS</div>
            <div className="text-xs tracking-[0.5em] text-neutral-600 mt-1.5 animate-pulse">ESPORTS</div>
          </div>
          <p className="text-neutral-500 text-sm tracking-[0.35em] mb-12 animate-bounce">SELECT YOUR PLATFORM TO ENTER</p>
          <div className="flex gap-5 justify-center flex-wrap">
            {([
              { key: "pc" as const, icon: "🖥️", label: "PC", sub: "Desktop Experience", accent: "#D4AF37" },
              { key: "mobile" as const, icon: "📱", label: "MOBILE", sub: "Mobile Experience", accent: "#C0392B" },
            ]).map(({ key, icon, label, sub, accent }) => (
              <button
                key={key}
                onClick={() => setPlatform(key)}
                className="relative bg-transparent border-2 p-7 cursor-pointer transition-all duration-250 min-w-[155px] text-white hover:scale-110 hover:rotate-1 hover:shadow-[0_0_40px_#00000060] group"
                style={{ borderColor: accent, animation: "borderPulse 2s infinite" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1) rotate(1deg)"; e.currentTarget.style.boxShadow = `0 0 40px ${accent}60`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
                  <div key={v+h} className="absolute w-3 h-3 group-hover:w-4 group-hover:h-4 transition-all duration-300" style={{ [v]: -2, [h]: -2, borderTop: v==="top"?`2px solid ${accent}`:"none", borderBottom: v==="bottom"?`2px solid ${accent}`:"none", borderLeft: h==="left"?`2px solid ${accent}`:"none", borderRight: h==="right"?`2px solid ${accent}`:"none" }} />
                ))}
                <div className="text-4xl mb-2.5 group-hover:scale-125 transition-transform duration-300">{icon}</div>
                <div className="text-base font-black tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-300" style={{ color: accent, fontFamily: "'Arial Black',sans-serif" }}>{label}</div>
                <div className="text-xs text-neutral-500 tracking-wider mt-1 group-hover:text-white transition-colors">{sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Intro loading
  if (!showMain) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-[9999]">
        <Particles />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] transition-all duration-1000 pointer-events-none z-1 animate-ping" style={{ opacity: introStep >= 2 ? 0.5 : 0 }} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
          <div className="w-full flex justify-center mb-5 transition-all duration-700" style={{ opacity: introStep >= 1 ? 1 : 0, animation: introStep >= 1 ? "logoIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards" : "none" }}>
            <img src="/logo.png" alt="Nexus Logo" className="w-[150px] h-[150px] object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.95)_0_0_100px_rgba(212,175,55,0.5)] animate-spin-slow" />
          </div>
          <div className="w-full mb-2.5" style={{ opacity: introStep >= 2 ? 1 : 0, animation: introStep >= 2 ? "textSlam 0.65s cubic-bezier(0.22,1,0.36,1) forwards" : "none" }}>
            <span className="block text-[clamp(3.5rem,15vw,6rem)] font-black tracking-[0.18em] text-[#D4AF37] leading-none drop-shadow-[0_0_80px_#D4AF37_0_0_150px_rgba(212,175,55,0.5)] animate-pulse" style={{ fontFamily: "'Arial Black',sans-serif" }}>NEXUS</span>
          </div>
          <div className="w-full mb-7" style={{ opacity: introStep >= 3 ? 1 : 0, animation: introStep >= 3 ? "slideUp 0.5s ease forwards" : "none" }}>
            <span className="block text-lg font-bold tracking-[0.75em] text-[#C0392B] drop-shadow-[0_0_30px_rgba(192,57,43,0.8)] animate-pulse" style={{ fontFamily: "'Arial Black',sans-serif" }}>ESPORTS</span>
          </div>
          <div className="w-full flex flex-col items-center gap-2.5 mb-7 transition-opacity duration-600" style={{ opacity: introStep >= 4 ? 1 : 0 }}>
            <span className="text-xs tracking-[0.35em] text-neutral-500 animate-pulse">🔥 FREE FIRE DIVISION 🔥</span>
            <div className="w-30 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-2 transition-opacity duration-500 delay-200" style={{ opacity: introStep >= 4 ? 1 : 0 }}>
            <div className="w-64 h-1 bg-neutral-900 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#C0392B] to-[#D4AF37] transition-all duration-1000 animate-pulse" style={{ width: introStep >= 5 ? "100%" : introStep >= 4 ? "75%" : "30%" }} />
            </div>
            <span className="text-xs text-neutral-600 tracking-[0.3em] animate-bounce">ENTERING NEXUS...</span>
          </div>
        </div>
        <style>{`
          @keyframes logoIn { 
            0%{transform:scale(0.1) rotate(-20deg);opacity:0;filter:brightness(5);} 
            60%{transform:scale(1.15) rotate(3deg);opacity:1;filter:brightness(1.8);} 
            100%{transform:scale(1) rotate(0deg);opacity:1;filter:brightness(1);} 
          }
          @keyframes textSlam { 
            0%{transform:scale(2) translateY(-40px);opacity:0;} 
            65%{transform:scale(0.95) translateY(5px);opacity:1;} 
            100%{transform:scale(1) translateY(0);opacity:1;} 
          }
          @keyframes slideUp { 
            from{transform:translateY(30px);opacity:0;} 
            to{transform:translateY(0);opacity:1;} 
          }
          @keyframes spin-slow {
            from{transform:rotate(0deg);}
            to{transform:rotate(360deg);}
          }
          .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  // Main website
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
      {/* background layers with animations */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1)_0%,rgba(192,57,43,0.06)_40%,black_70%)] pointer-events-none z-0 animate-pulse" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none z-0 animate-[spin_60s_linear_infinite]" />
      <Particles fixed />

      {/* mouse follower glow */}
      <div 
        className="fixed w-64 h-64 rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)",
          left: mousePos.x - 128,
          top: mousePos.y - 128,
          transition: "all 0.1s ease",
        }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-black/95 backdrop-blur-md border-b border-[#D4AF37]/20 animate-slideDown">
        <div className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="Nexus" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.7)] group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-lg font-black tracking-[0.18em] text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] group-hover:tracking-[0.25em] transition-all duration-300" style={{ fontFamily: "'Arial Black',sans-serif" }}>NEXUS</span>
          <span className="text-[0.58rem] tracking-[0.4em] text-neutral-600 group-hover:text-neutral-400 transition-colors">ESPORTS</span>
        </div>
        <div className="flex gap-6 items-center">
          {["HOME","TEAM","TOURNAMENTS","REGISTER"].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs tracking-widest no-underline transition-all duration-200 hover:scale-110 hover:tracking-[0.25em]"
              style={{ color: item === "REGISTER" ? "#D4AF37" : "#555", animationDelay: `${i * 0.1}s` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
              onMouseLeave={(e) => (e.currentTarget.style.color = item === "REGISTER" ? "#D4AF37" : "#555")}
            >
              {item}
            </a>
          ))}
          <div className="text-xs px-2.5 py-1 border border-[#D4AF37] text-[#D4AF37] animate-pulse">{isMobile ? "📱 MOBILE" : "🖥️ PC"}</div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
        <div className="relative z-5 text-center px-4 max-w-[900px] w-full mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Nexus" className={`${isMobile ? "w-[110px] h-[110px]" : "w-[140px] h-[140px]"} object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.8)] animate-bounce-slow`} />
          </div>
          <h1 className={`${isMobile ? "text-5xl" : "text-7xl"} font-black tracking-[0.15em] text-[#D4AF37] leading-none mb-3 drop-shadow-[0_0_80px_rgba(212,175,55,0.6)_0_0_160px_rgba(212,175,55,0.3)] animate-pulse`} style={{ fontFamily: "'Arial Black',sans-serif" }}>NEXUS</h1>
          <div className={`${isMobile ? "text-lg" : "text-2xl"} tracking-[0.6em] font-bold text-[#C0392B] mb-6 animate-pulse`} style={{ fontFamily: "'Arial Black',sans-serif" }}>ESPORTS</div>
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="flex-1 max-w-20 h-px bg-gradient-to-r from-transparent to-[#D4AF37] animate-pulse" />
            <span className="text-xs tracking-widest text-neutral-500 animate-bounce">🔥 FREE FIRE DIVISION 🔥</span>
            <div className="flex-1 max-w-20 h-px bg-gradient-to-l from-transparent to-[#D4AF37] animate-pulse" />
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-[460px] mx-auto mb-9 tracking-wide animate-fadeInUp">
            Elite competitive gaming. Built for warriors. Forged in fire.<br />Join the NEXUS family and dominate the battleground.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#register" className="no-underline">
              <button className="px-9 py-3.5 font-black tracking-widest text-black bg-gradient-to-br from-[#D4AF37] to-[#B8860B] border-none cursor-pointer text-xs transition-all duration-200 hover:scale-110 hover:rotate-1 hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] animate-pulse" style={{ fontFamily: "'Arial Black',sans-serif" }}>JOIN NEXUS</button>
            </a>
            <button className="px-9 py-3.5 font-bold tracking-widest text-[#C0392B] bg-transparent border-2 border-[#C0392B] cursor-pointer text-xs transition-all duration-200 hover:scale-110 hover:-rotate-1 hover:shadow-[0_0_30px_rgba(192,57,43,0.6)]" style={{ fontFamily: "'Arial Black',sans-serif" }}>WATCH HIGHLIGHTS</button>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-[400px] mx-auto mt-14">
            {[["200+","MEMBERS"],["50+","TOURNAMENTS"],["#1","RANKED"]].map(([v,l], i) => (
              <div key={l} className="text-center group">
                <div className="text-2xl font-black text-[#D4AF37] group-hover:scale-125 transition-transform duration-300 animate-pulse" style={{ fontFamily: "'Arial Black',sans-serif", animationDelay: `${i * 0.2}s` }}>{v}</div>
                <div className="text-xs text-neutral-500 tracking-widest mt-1 group-hover:text-white transition-colors">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-[#D4AF37]/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-[#D4AF37] rounded-full animate-ping" />
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section id="register" className="relative py-24 px-4 bg-[radial-gradient(ellipse_at_center,rgba(192,57,43,0.1)_0%,#000_70%)]">
        <div className="max-w-2xl mx-auto">
          <SectionTitle label="JOIN THE SQUAD" sub="REGISTRATION" />
          {!submitted ? (
            <>
              <div className="flex gap-5 justify-center mt-12 mb-8 flex-wrap">
                {([
                  { key: "player" as const, icon: "🎮", label: "TOURNAMENT", sub: "Register as Squad", accent: "#D4AF37" },
                  { key: "team"   as const, icon: "🏆", label: "GUILD TEST", sub: "Register as Individual or Squad", accent: "#C0392B" },
                ]).map(({ key, icon, label, sub, accent }) => (
                  <button
                    key={key}
                    onClick={() => setRegType(key)}
                    className="relative flex-1 min-w-[150px] max-w-[260px] p-8 text-center cursor-pointer border-2 transition-all duration-200 text-white hover:scale-110 hover:rotate-1 group"
                    style={{ background: regType === key ? `${accent}12` : "transparent", borderColor: regType === key ? accent : `${accent}40` }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1) rotate(1deg)"; e.currentTarget.style.boxShadow = `0 0 40px ${accent}40`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {regType === key && <div className="absolute top-0 left-0 right-0 h-0.5 animate-pulse" style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />}
                    <div className="absolute top-[-2px] left-[-2px] w-4 h-4 border-t-2 border-l-2 group-hover:w-5 group-hover:h-5 transition-all duration-300" style={{ borderColor: accent }} />
                    <div className="absolute bottom-[-2px] right-[-2px] w-4 h-4 border-b-2 border-r-2 group-hover:w-5 group-hover:h-5 transition-all duration-300" style={{ borderColor: accent }} />
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300 animate-bounce">{icon}</div>
                    <div className="font-black tracking-widest text-base mb-1.5 group-hover:tracking-[0.25em] transition-all duration-300" style={{ color: accent, fontFamily: "'Arial Black',sans-serif" }}>{label}</div>
                    <div className="text-xs text-neutral-500 group-hover:text-white transition-colors">{sub}</div>
                    {regType === key && <div className="mt-3 text-xs px-2 py-0.5 inline-block border animate-pulse" style={{ borderColor: accent, color: accent, background: `${accent}20` }}>✓ SELECTED</div>}
                  </button>
                ))}
              </div>

              {regType && (
                <div className="border p-9 animate-fadeInUp" style={{ borderColor: regType === "player" ? "rgba(212,175,55,0.25)" : "rgba(192,57,43,0.25)", background: "rgba(255,255,255,0.018)" }}>
                  <div className="text-center text-xs tracking-widest mb-7 animate-pulse" style={{ color: regType === "player" ? "#D4AF37" : "#C0392B" }}>
                    ── {regType === "player" ? "TOURNAMENT" : "GUILD TEST"} REGISTRATION FORM ──
                  </div>

                  <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-5 mb-6`}>
                    {regType === "player" && (
                      <>
                        <InputField label="TEAM NAME" placeholder="Your team name" value={regForm.teamName} onChange={(v) => setRegForm(f => ({ ...f, teamName: v }))} accent="#D4AF37" />
                        <InputField label="PHONE NUMBER" placeholder="+91 XXXXX XXXXX" value={regForm.phone} onChange={(v) => setRegForm(f => ({ ...f, phone: v }))} accent="#D4AF37" />
                        <InputField label="PLAYERS GAME NAME" placeholder="Your in-game name" value={regForm.gameName} onChange={(v) => setRegForm(f => ({ ...f, gameName: v }))} accent="#D4AF37" />
                      </>
                    )}
                    {regType === "team" && (
                      <>
                        <InputField label="TEAM NAME / PLAYER NAME" placeholder="Team or player name" value={regForm.teamName} onChange={(v) => setRegForm(f => ({ ...f, teamName: v }))} accent="#C0392B" />
                        <InputField label="PHONE NUMBER" placeholder="+91 XXXXX XXXXX" value={regForm.phone} onChange={(v) => setRegForm(f => ({ ...f, phone: v }))} accent="#C0392B" />
                        <InputField label="PLAYER GAME NAME" placeholder="Your in-game name" value={regForm.gameName} onChange={(v) => setRegForm(f => ({ ...f, gameName: v }))} accent="#C0392B" />
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if ([regForm.teamName, regForm.phone, regForm.gameName].some(v => !v.trim())) return;
                      const msg = regType === "player"
                        ? `🎮 *NEXUS TOURNAMENT REGISTRATION*\n\n🏷️ Team Name: ${regForm.teamName}\n📞 Phone: ${regForm.phone}\n🎯 Players Game Name: ${regForm.gameName}\n\n— Sent from Nexus Esports Website`
                        : `🏆 *NEXUS GUILD TEST REGISTRATION*\n\n🏷️ Team / Player Name: ${regForm.teamName}\n📞 Phone: ${regForm.phone}\n🎯 Player Game Name: ${regForm.gameName}\n\n— Sent from Nexus Esports Website`;
                      window.open(`https://wa.me/917200079242?text=${encodeURIComponent(msg)}`, "_blank");
                      setSubmitted(true);
                    }}
                    className="w-full py-4 font-black tracking-widest text-sm text-black border-none cursor-pointer transition-all duration-200 hover:scale-105 hover:rotate-1 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] animate-pulse"
                    style={{ background: regType === "player" ? "linear-gradient(135deg,#D4AF37,#B8860B)" : "linear-gradient(135deg,#C0392B,#922B21)", fontFamily: "'Arial Black',sans-serif" }}
                  >
                    {regType === "player" ? "⚡ REGISTER ON WHATSAPP" : "🏆 JOIN GUILD ON WHATSAPP"}
                  </button>

                  <div className="text-center mt-3 text-xs text-neutral-600 tracking-widest animate-bounce">
                    📲 YOU WILL BE REDIRECTED TO WHATSAPP TO SEND YOUR REGISTRATION
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 animate-fadeInUp">
              <img src="/logo.png" alt="Nexus" className="w-20 h-20 object-contain mx-auto mb-6 drop-shadow-[0_0_40px_rgba(212,175,55,0.8)] animate-spin-slow" />
              <div className="text-3xl font-black tracking-widest text-[#D4AF37] mb-3 animate-pulse" style={{ fontFamily: "'Arial Black',sans-serif" }}>WELCOME TO NEXUS!</div>
              <div className="text-neutral-500 mb-1.5">Registration submitted successfully.</div>
              <div className="text-xs text-neutral-700 tracking-widest">Our team will contact you within 24 hours.</div>
              <div className="mt-7 text-xs px-6 py-2 inline-block border border-[#D4AF37] text-[#D4AF37] animate-bounce">🔥 FREE FIRE AWAITS 🔥</div>
            </div>
          )}
        </div>
      </section>

      {/* TOURNAMENTS */}
      <section id="tournaments" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionTitle label="UPCOMING EVENTS" sub="TOURNAMENT SCHEDULE" />
          <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4 mt-12`}>
            {[
              { name: "FREE FIRE NATIONALS", date: "SOON · 2026", prize: "₹50,000", status: "SOON", type: "SQUAD" },
              { name: "NEXUS BR SCRIMS", date: "TODAY · 2026", prize: "₹240", status: "OPEN", type: "SQUAD" },
              { name: "NEXUS CS SCRIMS", date: "TODAY · 2026", prize: "₹200", status: "OPEN", type: "SQUAD" },
            ].map((t, i) => (
              <div
                key={t.name}
                className="relative border p-6 flex items-start justify-between transition-all duration-300 hover:-translate-y-2 hover:scale-105 group animate-fadeInUp"
                style={{ borderColor: "rgba(212,175,55,0.18)", background: "rgba(212,175,55,0.018)", animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent group-hover:h-0.5 transition-all duration-300" />
                <div>
                  <div className="text-xs tracking-widest text-neutral-500 mb-1.5 group-hover:text-white transition-colors">{t.date} · {t.type}</div>
                  <div className="font-black tracking-wide text-[#D4AF37] mb-2.5 group-hover:scale-105 transition-transform" style={{ fontFamily: "'Arial Black',sans-serif" }}>{t.name}</div>
                  <div className="text-2xl font-black text-[#C0392B] group-hover:scale-110 transition-transform" style={{ fontFamily: "'Arial Black',sans-serif" }}>{t.prize}</div>
                  <div className="text-xs text-neutral-600 tracking-widest">PRIZE POOL</div>
                </div>
                <div
                  className="px-2 py-1 text-xs font-bold tracking-widest animate-pulse"
                  style={{
                    color: t.status === "OPEN" ? "#008000" : "#444",
                    border: `1px solid ${t.status === "OPEN" ? "#C0392B" : "#333"}`,
                    background: t.status === "OPEN" ? "rgba(192,57,43,0.15)" : "rgba(60,60,60,0.2)",
                  }}
                >
                  {t.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="relative py-24 px-4 bg-gradient-to-b from-black via-[#0d0700] to-black">
        <div className="max-w-5xl mx-auto">
          <SectionTitle label="OUR WARRIORS" sub="NEXUS ROSTER" />
          <div className="text-center mt-4 mb-12 text-xs text-neutral-600 tracking-widest animate-pulse">
            CLICK A CARD TO VIEW FULL PROFILE
          </div>
          <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-5`}>
            {players.map((p, i) => (
              <div key={p.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <PlayerCard
                  player={p}
                  isActive={activePlayer === p.id}
                  onClick={() => setActivePlayer(activePlayer === p.id ? null : p.id)}
                />
              </div>
            ))}
          </div>
          {activePlayer && (() => {
            const p = players.find(x => x.id === activePlayer)!;
            return (
              <div className="mt-8 px-6 py-3.5 border flex items-center gap-4 animate-bounce" style={{ borderColor: `${p.color}25`, background: `${p.color}06` }}>
                <div className="text-lg animate-spin-slow">{p.icon}</div>
                <span className="text-xs tracking-widest animate-pulse" style={{ color: p.color }}>{p.realRole} · {p.title}</span>
                <div className="ml-auto w-15 h-px animate-pulse" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              </div>
            );
          })()}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#D4AF37]/15 py-10 px-4 text-center">
        <img src="/logo.png" alt="Nexus" className="w-12 h-12 object-contain mx-auto mb-3 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] hover:rotate-180 transition-transform duration-500" />
        <div className="font-black tracking-widest text-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.4)] mb-1.5 animate-pulse" style={{ fontFamily: "'Arial Black',sans-serif" }}>NEXUS ESPORTS</div>
        <div className="text-xs tracking-widest text-neutral-700 mb-4">🔥 FREE FIRE DIVISION · EST. 2024</div>
        <div className="flex justify-center gap-5 text-xs tracking-widest text-neutral-600">
          <span className="hover:scale-125 hover:text-[#D4AF37] transition-all duration-300 cursor-pointer">DISCORD</span><span className="text-neutral-800">·</span>
          <span className="hover:scale-125 hover:text-[#D4AF37] transition-all duration-300 cursor-pointer">YOUTUBE</span><span className="text-neutral-800">·</span>
          <span className="hover:scale-125 hover:text-[#D4AF37] transition-all duration-300 cursor-pointer">INSTAGRAM</span>
        </div>
        <div className="mt-6 text-xs text-neutral-900">© 2026 NEXUS NXS ESPORTS. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}