// 404 ilustrado: sapo (verde), pintinho (amarelo) e raposa (vermelha).
// Cores vêm dos tokens de app/globals.css. Classes e keyframes têm prefixo
// (.nf404 / nf-) para não colidir com o Tailwind. CSS puro, sem biblioteca.

const css = `
.nf404 {
  --nf-ink: var(--foreground);
  --nf-surface: var(--neutral-surface);
  --nf-digit: var(--secondary-active);
  --nf-stitch: var(--secondary-hover);
  --nf-red: var(--primary);
  --nf-red-dark: var(--primary-active);
  --nf-orange: var(--primary-hover);
  --nf-gold: var(--warning);
  --nf-frog-dark: var(--success);
  --nf-yellow: var(--mascot-yellow);
  --nf-green: var(--mascot-green);
  --nf-green-light: var(--mascot-green-light);
}
.nf404 svg { width: 100%; max-width: 980px; height: auto; display: block; margin-inline: auto; overflow: visible; }

/* preenchimentos */
.nf404 .f-ink { fill: var(--nf-ink); }
.nf404 .f-surface { fill: var(--nf-surface); }
.nf404 .f-red { fill: var(--nf-red); }
.nf404 .f-red-dark { fill: var(--nf-red-dark); }
.nf404 .f-orange { fill: var(--nf-orange); }
.nf404 .f-gold { fill: var(--nf-gold); }
.nf404 .f-yellow { fill: var(--nf-yellow); }
.nf404 .f-green { fill: var(--nf-green); }
.nf404 .f-green-light { fill: var(--nf-green-light); }
.nf404 .f-frog-dark { fill: var(--nf-frog-dark); }
.nf404 .f-stitch { fill: var(--nf-stitch); }
/* traços */
.nf404 .s-stitch { stroke: var(--nf-stitch); }
.nf404 .s-red { stroke: var(--nf-red); }
.nf404 .s-gold { stroke: var(--nf-gold); }
.nf404 .s-orange { stroke: var(--nf-orange); }
.nf404 .s-ink { stroke: var(--nf-ink); }
.nf404 .s-surface { stroke: var(--nf-surface); }

.nf404 .digit { stroke: var(--nf-digit); stroke-width: 54; }
.nf404 .stitch { stroke: var(--nf-stitch); stroke-width: 2.5; stroke-dasharray: 1 11; }
.nf404 .ol { stroke: var(--nf-ink); stroke-width: 7; }
.nf404 .ln { stroke: var(--nf-ink); stroke-width: 3.5; }
.nf404 .fb { transform-box: fill-box; transform-origin: center; }

/* pintinho */
.nf404 .chick { transform-origin: 220px 64px; animation: nf-hop 2.6s infinite; }
@keyframes nf-hop {
  0% { transform: translateY(0) scale(1.07, .91); animation-timing-function: cubic-bezier(.2, .7, .4, 1); }
  19% { transform: translateY(-30px) scale(.97, 1.04); animation-timing-function: cubic-bezier(.6, 0, .8, .4); }
  38% { transform: translateY(0) scale(1.07, .91); animation-timing-function: cubic-bezier(.2, .7, .4, 1); }
  55% { transform: translateY(-20px) scale(.98, 1.03); animation-timing-function: cubic-bezier(.6, 0, .8, .4); }
  72% { transform: translateY(0) scale(1.05, .94); animation-timing-function: ease-out; }
  80%, 100% { transform: translateY(0) scale(1); }
}
.nf404 .wing { transform-box: fill-box; transform-origin: 85% 25%; animation: nf-flap 2.6s infinite; }
.nf404 .wing.back { transform-origin: 80% 95%; }
@keyframes nf-flap {
  0%, 74%, 100% { transform: rotate(0); }
  6%, 18%, 30%, 44%, 56%, 66% { transform: rotate(-44deg); }
  12%, 24%, 37%, 50%, 61% { transform: rotate(6deg); }
}
.nf404 .blink { animation: nf-blink 5s infinite; }
.nf404 .blink.b2 { animation-duration: 6.3s; animation-delay: -2s; }
@keyframes nf-blink { 0%, 95%, 100% { transform: scaleY(1); } 97.5% { transform: scaleY(.1); } }

/* sapo */
.nf404 .belly { animation: nf-breathe 2.6s ease-in-out infinite alternate; }
@keyframes nf-breathe { from { transform: scale(1); } to { transform: scale(1.08); } }

/* raposa dormindo */
.nf404 .foxbody { transform-box: fill-box; transform-origin: 50% 100%; animation: nf-sleep 3.4s ease-in-out infinite alternate; }
@keyframes nf-sleep { from { transform: scaleY(1); } to { transform: scaleY(1.07); } }
.nf404 .foxhead { animation: nf-nod 3.4s ease-in-out infinite alternate; }
@keyframes nf-nod { from { transform: translateY(0); } to { transform: translateY(-2px); } }
.nf404 .tail { transform-origin: 724px 388px; animation: nf-sway 3.4s ease-in-out infinite alternate; }
@keyframes nf-sway { from { transform: rotate(-1.5deg); } to { transform: rotate(2.5deg); } }
.nf404 .ear { transform-box: fill-box; transform-origin: 50% 100%; animation: nf-twitch 6.5s infinite; }
.nf404 .ear.late { animation-delay: -.15s; }
@keyframes nf-twitch {
  0%, 88%, 100% { transform: rotate(0); }
  91% { transform: rotate(-16deg); }
  94% { transform: rotate(7deg); }
  97% { transform: rotate(-6deg); }
}

/* confetes e cruzes flutuando */
.nf404 .float { transform-box: fill-box; transform-origin: center; animation: nf-float 4s ease-in-out infinite alternate; }
.nf404 .float.f2 { animation-duration: 5.4s; animation-delay: -1.5s; }
.nf404 .float.f3 { animation-duration: 6.6s; animation-delay: -3s; }
@keyframes nf-float { from { transform: translateY(6px) rotate(-8deg); } to { transform: translateY(-10px) rotate(10deg); } }

@media (prefers-reduced-motion: reduce) { .nf404 svg * { animation: none !important; } }
`;

export function NotFoundIllustration() {
  return (
    <div className="nf404 w-full">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <svg
        viewBox="0 -70 900 520"
        role="img"
        aria-label="404 ilustrado: um sapo verde sentado sob a barra do primeiro quatro, um pintinho amarelo pulando em cima do zero e uma raposa vermelha dormindo sob o segundo quatro"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* cruzes e confetes */}
        <g strokeWidth={5}>
          <path className="float s-stitch" d="M52 96 v20 M42 106 h20" />
          <path className="float f2 s-red" d="M852 60 v18 M843 69 h18" />
          <path className="float f3 s-gold" d="M340 20 v14 M333 27 h14" />
        </g>
        <circle className="float f2 f-red" cx="120" cy="20" r="7" />
        <circle className="float f3 f-green" cx="582" cy="34" r="6" />
        <circle className="float f-yellow" cx="800" cy="170" r="5" />
        <circle className="float f3 f-yellow" cx="32" cy="300" r="5" />
        <circle className="float f2 f-stitch" cx="560" cy="150" r="4" />

        {/* sombras no chão */}
        <g className="f-ink" opacity={0.1}>
          <ellipse cx="205" cy="424" rx="120" ry="8" />
          <ellipse cx="450" cy="424" rx="92" ry="8" />
          <ellipse cx="730" cy="424" rx="140" ry="8" />
        </g>

        {/* primeiro 4 */}
        <path className="digit" d="M220 390 V90 L70 290 H290" />
        <path className="stitch" d="M220 390 V90 L70 290 H290" />

        {/* zero */}
        <ellipse className="digit" cx="450" cy="240" rx="95" ry="150" />
        <ellipse className="stitch" cx="450" cy="240" rx="95" ry="150" />

        {/* sapo, sentado sob a barra do primeiro 4 */}
        <g transform="translate(126 417) scale(.9) translate(-450 -331)">
          <g className="ol">
            <ellipse cx="450" cy="284" rx="55" ry="46" />
            <circle cx="424" cy="252" r="17" />
            <circle cx="476" cy="252" r="17" />
          </g>
          <g className="f-green">
            <ellipse cx="450" cy="284" rx="55" ry="46" />
            <circle cx="424" cy="252" r="17" />
            <circle cx="476" cy="252" r="17" />
          </g>
          <ellipse className="fb belly f-green-light" cx="450" cy="302" rx="33" ry="21" />
          <g className="f-frog-dark" opacity={0.55}>
            <circle cx="412" cy="282" r="4" />
            <circle cx="489" cy="279" r="3.2" />
            <circle cx="484" cy="292" r="2.4" />
          </g>
          <g className="fb blink b2">
            <circle className="f-surface" cx="424" cy="251" r="10.5" />
            <circle className="f-surface" cx="476" cy="251" r="10.5" />
            <circle className="f-ink" cx="426" cy="252" r="5.2" />
            <circle className="f-ink" cx="474" cy="252" r="5.2" />
            <circle className="f-surface" cx="427.6" cy="250" r="1.6" />
            <circle className="f-surface" cx="475.6" cy="250" r="1.6" />
          </g>
          <path className="ln" strokeWidth={3} d="M422 284 q28 15 56 0" />
          <circle className="f-red s-ink" cx="450" cy="274" r="7.5" strokeWidth={2.5} />
          <circle className="f-surface" cx="447.8" cy="271.8" r="2" opacity={0.7} />
          <ellipse className="ln f-green" cx="428" cy="324" rx="15" ry="7" />
          <ellipse className="ln f-green" cx="472" cy="324" rx="15" ry="7" />
        </g>

        {/* pintinho, pulando em cima do zero */}
        <g transform="translate(230 0)">
          <g className="chick">
            <ellipse className="wing back ln f-gold" cx="204" cy="8" rx="14" ry="10" />
            <path className="s-orange" strokeWidth={4} d="M211 66 V50 M229 66 V50 M204 66 h12 M224 66 h12" />
            <ellipse className="ln f-yellow" cx="220" cy="22" rx="35" ry="32" />
            <path className="ln" d="M213 -8 q-6 -12 1 -17 M221 -9 q1 -13 9 -14" />
            <path className="s-gold" strokeWidth={3} opacity={0.7} d="M196 34 q14 12 34 6" />
            <ellipse className="wing ln f-gold" cx="203" cy="28" rx="15" ry="11" />
            <path className="ln f-orange" d="M252 14 l19 7 l-19 8 z" />
            <circle className="f-red" cx="242" cy="30" r="5.5" opacity={0.35} />
            <g className="fb blink">
              <circle className="f-ink" cx="235" cy="12" r="4.2" />
              <circle className="f-surface" cx="236.4" cy="10.6" r="1.4" />
            </g>
          </g>
        </g>

        {/* segundo 4 */}
        <path className="digit" d="M760 390 V90 L610 290 H830" />
        <path className="stitch" d="M760 390 V90 L610 290 H830" />

        {/* raposa dormindo sob a barra */}
        <g>
          <ellipse className="foxbody ln f-red" cx="678" cy="376" rx="50" ry="31" />
          <g className="foxhead">
            <g className="ear">
              <path className="ln f-red" d="M611 356 l-3 -25 l22 13 z" />
              <path className="f-red-dark" d="M613 349 l-1 -9 l8 5 z" />
            </g>
            <g className="ear late">
              <path className="ln f-red" d="M634 349 l11 -24 l12 23 z" />
              <path className="f-red-dark" d="M641 344 l4 -9 l5 9 z" />
            </g>
            <circle className="ln f-red" cx="630" cy="372" r="25" />
            <path className="ln f-surface" strokeWidth={3} d="M607 381 q2 -12 18 -10 q12 4 8 16 q-6 9 -18 7 q-9 -4 -8 -13 z" />
            <circle className="f-ink" cx="606" cy="381" r="4.6" />
            <path className="ln" strokeWidth={3} d="M624 365 q7 6 14 0" />
          </g>
          <g className="tail">
            <path className="s-ink" strokeWidth={31} d="M724 388 C716 410 646 414 606 398" />
            <path className="s-red" strokeWidth={24} d="M724 388 C716 410 646 414 606 398" />
            <path
              className="s-surface"
              strokeWidth={24}
              pathLength={100}
              strokeDasharray="20 100"
              strokeDashoffset={-80}
              d="M724 388 C716 410 646 414 606 398"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
