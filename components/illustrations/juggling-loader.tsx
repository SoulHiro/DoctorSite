// Carregamento: um par de luvas de palhaço fazendo malabarismo em cascata com três bolas
// (amarela, verde e vermelha — as cores do pintinho, do sapo e da raposa).
// A órbita aparece como a "costura de jaleco" pontilhada. CSS puro, sem biblioteca.
// Cores vêm dos tokens de app/globals.css; prefixo .ld / ld- para não colidir.

const ORBIT =
  "M66 104 C76 -4 124 -4 152 100 C160 124 136 124 134 104 C124 -4 76 -4 48 100 C40 124 64 124 66 104 Z";

const css = `
.ld {
  --ld-ink: var(--foreground);
  --ld-muted: var(--muted-foreground);
  --ld-surface: var(--neutral-surface);
  --ld-stitch: var(--secondary-hover);
  --ld-teal: var(--secondary-active);
  --ld-red: var(--primary);
  --ld-red-dark: var(--primary-active);
  --ld-yellow: var(--mascot-yellow);
  --ld-yellow-dark: var(--warning);
  --ld-green: var(--mascot-green);
  --ld-green-dark: var(--success);
  --ld-period: 2.1s;
  min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;
  padding: 32px 16px;
}
.ld-stage { position: relative; width: 200px; height: 150px; }
.ld-stage svg { position: absolute; inset: 0; width: 200px; height: 150px; overflow: visible; }
.ld-orbit { fill: none; stroke: var(--ld-stitch); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 1 8; opacity: .7; }
.ld-shadow { fill: var(--ld-ink); opacity: .1; }

/* bolas: percorrem a órbita, defasadas em 1/3 do ciclo */
.ld-ball {
  position: absolute; left: 0; top: 0; width: 22px; height: 22px; border-radius: 50%;
  border: 2.5px solid var(--ld-ink); box-sizing: border-box;
  offset-path: path('${ORBIT}'); offset-anchor: center; offset-rotate: 0deg;
  animation: ld-orbit var(--ld-period) linear infinite;
}
.ld-ball::after {
  content: ""; position: absolute; left: 4px; top: 3px; width: 6px; height: 4px; border-radius: 50%;
  background: var(--ld-surface); opacity: .75; transform: rotate(-30deg);
}
.ld-b1 { background: radial-gradient(circle at 35% 30%, var(--ld-yellow), var(--ld-yellow-dark)); offset-distance: 0%; }
.ld-b2 { background: radial-gradient(circle at 35% 30%, var(--ld-green), var(--ld-green-dark)); offset-distance: 33.333%; animation-delay: calc(var(--ld-period) / -3); }
.ld-b3 { background: radial-gradient(circle at 35% 30%, var(--ld-red), var(--ld-red-dark)); offset-distance: 66.667%; animation-delay: calc(var(--ld-period) / -1.5); }
@keyframes ld-orbit { from { offset-distance: 0%; } to { offset-distance: 100%; } }

/* luvas: afundam de leve a cada pegada, alternando os lados */
.ld-hand { transform-box: fill-box; transform-origin: 50% 0%; animation: ld-catch calc(var(--ld-period) / 1.5) ease-in-out infinite; }
.ld-hand.right { animation-delay: calc(var(--ld-period) / -3); }
@keyframes ld-catch {
  0%, 100% { transform: translateY(0) rotate(0); }
  18% { transform: translateY(5px) rotate(-3deg); }
  45% { transform: translateY(-1px) rotate(1deg); }
}
.ld-glove { fill: var(--ld-surface); stroke: var(--ld-ink); stroke-width: 2.5; }
.ld-cuff { fill: var(--ld-teal); stroke: var(--ld-ink); stroke-width: 2.5; }
.ld-seam { fill: none; stroke: var(--ld-ink); stroke-width: 1.8; stroke-linecap: round; opacity: .55; }

/* legenda */
.ld-label {
  margin: 0; display: flex; align-items: baseline; gap: 1px;
  font-family: var(--font-sans), system-ui, sans-serif; font-size: 12px; font-weight: 600;
  letter-spacing: .18em; text-transform: uppercase; color: var(--ld-muted);
}
.ld-dot { display: inline-block; animation: ld-dot 1.2s ease-in-out infinite; }
.ld-dot:nth-child(2) { animation-delay: .15s; }
.ld-dot:nth-child(3) { animation-delay: .3s; }
@keyframes ld-dot { 0%, 60%, 100% { opacity: .2; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-2px); } }

@media (prefers-reduced-motion: reduce) {
  .ld-ball, .ld-hand, .ld-dot { animation: none; }
  .ld-dot { opacity: 1; }
}
`;

export function JugglingLoader() {
  return (
    <div className="ld" role="status" aria-live="polite">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="ld-stage" aria-hidden="true">
        <svg viewBox="0 0 200 150">
          <ellipse className="ld-shadow" cx="57" cy="142" rx="22" ry="3.5" />
          <ellipse className="ld-shadow" cx="143" cy="142" rx="22" ry="3.5" />
          <path className="ld-orbit" d={ORBIT} />
        </svg>

        <span className="ld-ball ld-b1" />
        <span className="ld-ball ld-b2" />
        <span className="ld-ball ld-b3" />

        {/* luvas por cima das bolas, como se as segurassem */}
        <svg viewBox="0 0 200 150">
          <g className="ld-hand left">
            <path className="ld-glove" d="M38 112 q0 -9 10 -9 h18 q10 0 10 9 v6 q0 10 -12 10 h-14 q-12 0 -12 -10 z" />
            <ellipse className="ld-glove" cx="77" cy="110" rx="6" ry="5" transform="rotate(-25 77 110)" />
            <path className="ld-seam" d="M48 118 v5 M57 118 v5 M66 118 v5" />
            <rect className="ld-cuff" x="44" y="127" width="26" height="8" rx="3" />
          </g>
          <g className="ld-hand right">
            <path className="ld-glove" d="M124 112 q0 -9 10 -9 h18 q10 0 10 9 v6 q0 10 -12 10 h-14 q-12 0 -12 -10 z" />
            <ellipse className="ld-glove" cx="123" cy="110" rx="6" ry="5" transform="rotate(25 123 110)" />
            <path className="ld-seam" d="M134 118 v5 M143 118 v5 M152 118 v5" />
            <rect className="ld-cuff" x="130" y="127" width="26" height="8" rx="3" />
          </g>
        </svg>
      </div>

      <p className="ld-label">
        Carregando
        <span aria-hidden="true">
          <span className="ld-dot">.</span>
          <span className="ld-dot">.</span>
          <span className="ld-dot">.</span>
        </span>
      </p>
    </div>
  );
}
