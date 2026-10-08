// Manutenção ilustrada: guindaste levando uma "janela do site", com o sapo na
// cabine, o pintinho de carona na carga e a raposa dormindo ao lado do cone.
// Cores vêm dos tokens de app/globals.css. Classes e keyframes têm prefixo
// (.mnt / mnt-) para não colidir com o Tailwind. CSS puro, sem biblioteca.

const css = `
.mnt {
  --mnt-ink: var(--foreground);
  --mnt-surface: var(--neutral-surface);
  --mnt-border: var(--border);
  --mnt-beam: var(--secondary-active);
  --mnt-stitch: var(--secondary-hover);
  --mnt-teal-subtle: var(--secondary-subtle);
  --mnt-red: var(--primary);
  --mnt-red-dark: var(--primary-active);
  --mnt-orange: var(--primary-hover);
  --mnt-gold: var(--warning);
  --mnt-yellow: var(--mascot-yellow);
  --mnt-green: var(--mascot-green);
}
/* Limitado pela largura e pela altura da tela (viewBox 940x440 ≈ 2.14:1),
   para o título abaixo caber sem scroll. */
.mnt svg {
  width: min(100%, 760px, calc(55dvh * 2.14));
  height: auto; display: block; margin-inline: auto; overflow: visible;
}

/* preenchimentos */
.mnt .f-ink { fill: var(--mnt-ink); }
.mnt .f-surface { fill: var(--mnt-surface); }
.mnt .f-beam { fill: var(--mnt-beam); }
.mnt .f-teal-subtle { fill: var(--mnt-teal-subtle); }
.mnt .f-red { fill: var(--mnt-red); }
.mnt .f-red-dark { fill: var(--mnt-red-dark); }
.mnt .f-orange { fill: var(--mnt-orange); }
.mnt .f-gold { fill: var(--mnt-gold); }
.mnt .f-yellow { fill: var(--mnt-yellow); }
.mnt .f-green { fill: var(--mnt-green); }
/* traços */
.mnt .s-ink { stroke: var(--mnt-ink); }
.mnt .s-surface { stroke: var(--mnt-surface); }
.mnt .s-border { stroke: var(--mnt-border); }
.mnt .s-stitch { stroke: var(--mnt-stitch); }
.mnt .s-red { stroke: var(--mnt-red); }
.mnt .s-gold { stroke: var(--mnt-gold); }
.mnt .s-orange { stroke: var(--mnt-orange); }

.mnt .beam { stroke: var(--mnt-beam); }
.mnt .stitch { stroke: var(--mnt-stitch); stroke-width: 2.5; }
.mnt .ln { stroke: var(--mnt-ink); stroke-width: 3.5; }
.mnt .ol { stroke: var(--mnt-ink); stroke-width: 7; }
.mnt .fb { transform-box: fill-box; transform-origin: center; }

/* guindaste: carrinho, cabo e carga — um ciclo de 12s */
.mnt .travel { animation: mnt-travel 12s ease-in-out infinite; }
@keyframes mnt-travel { 0%, 30%, 100% { transform: translateX(0); } 50%, 80% { transform: translateX(230px); } }
.mnt .hoist { animation: mnt-hoist 12s ease-in-out infinite; }
@keyframes mnt-hoist { 0%, 30%, 50%, 80%, 100% { transform: translateY(0); } 15%, 65% { transform: translateY(108px); } }
.mnt .cable { transform-origin: 320px 112px; animation: mnt-cable 12s ease-in-out infinite; }
@keyframes mnt-cable { 0%, 30%, 50%, 80%, 100% { transform: scaleY(1); } 15%, 65% { transform: scaleY(2.256); } }
.mnt .sway { transform-origin: 320px 198px; animation: mnt-sway 3.2s ease-in-out infinite alternate; }
@keyframes mnt-sway { from { transform: rotate(-1.6deg); } to { transform: rotate(1.6deg); } }
.mnt .beacon { animation: mnt-beacon 1.6s ease-in-out infinite alternate; }
@keyframes mnt-beacon { from { opacity: .25; } to { opacity: 1; } }

/* pintinho */
.mnt .chick { transform-origin: 220px 64px; animation: mnt-hop 2.6s infinite; }
@keyframes mnt-hop {
  0% { transform: translateY(0) scale(1.07, .91); animation-timing-function: cubic-bezier(.2, .7, .4, 1); }
  19% { transform: translateY(-26px) scale(.97, 1.04); animation-timing-function: cubic-bezier(.6, 0, .8, .4); }
  38% { transform: translateY(0) scale(1.07, .91); animation-timing-function: cubic-bezier(.2, .7, .4, 1); }
  55% { transform: translateY(-16px) scale(.98, 1.03); animation-timing-function: cubic-bezier(.6, 0, .8, .4); }
  72% { transform: translateY(0) scale(1.05, .94); animation-timing-function: ease-out; }
  80%, 100% { transform: translateY(0) scale(1); }
}
.mnt .wing { transform-box: fill-box; transform-origin: 85% 25%; animation: mnt-flap 2.6s infinite; }
.mnt .wing.back { transform-origin: 80% 95%; }
@keyframes mnt-flap {
  0%, 74%, 100% { transform: rotate(0); }
  6%, 18%, 30%, 44%, 56%, 66% { transform: rotate(-44deg); }
  12%, 24%, 37%, 50%, 61% { transform: rotate(6deg); }
}
.mnt .blink { animation: mnt-blink 5s infinite; }
.mnt .blink.b2 { animation-duration: 6.3s; animation-delay: -2s; }
@keyframes mnt-blink { 0%, 95%, 100% { transform: scaleY(1); } 97.5% { transform: scaleY(.1); } }

/* raposa */
.mnt .foxbody { transform-box: fill-box; transform-origin: 50% 100%; animation: mnt-sleep 3.4s ease-in-out infinite alternate; }
@keyframes mnt-sleep { from { transform: scaleY(1); } to { transform: scaleY(1.06); } }
.mnt .foxhead { animation: mnt-nod 3.4s ease-in-out infinite alternate; }
@keyframes mnt-nod { from { transform: translateY(0); } to { transform: translateY(-2px); } }
.mnt .tail { transform-origin: 724px 388px; animation: mnt-tail 3.4s ease-in-out infinite alternate; }
@keyframes mnt-tail { from { transform: rotate(-1.5deg); } to { transform: rotate(2.5deg); } }
.mnt .ear { transform-box: fill-box; transform-origin: 50% 100%; animation: mnt-twitch 6.5s infinite; }
.mnt .ear.late { animation-delay: -.15s; }
@keyframes mnt-twitch {
  0%, 88%, 100% { transform: rotate(0); }
  91% { transform: rotate(-16deg); }
  94% { transform: rotate(7deg); }
  97% { transform: rotate(-6deg); }
}

/* confetes e cruzes flutuando */
.mnt .float { transform-box: fill-box; transform-origin: center; animation: mnt-float 4s ease-in-out infinite alternate; }
.mnt .float.f2 { animation-duration: 5.4s; animation-delay: -1.5s; }
.mnt .float.f3 { animation-duration: 6.6s; animation-delay: -3s; }
@keyframes mnt-float { from { transform: translateY(6px) rotate(-8deg); } to { transform: translateY(-10px) rotate(10deg); } }

@media (prefers-reduced-motion: reduce) { .mnt svg * { animation: none !important; } }
`;

export function MaintenanceIllustration() {
  return (
    <div className="mnt w-full">
      <style dangerouslySetInnerHTML={{ __html: css }} />

        <svg
          viewBox="0 0 940 440"
          role="img"
          aria-label="Canteiro de obras: um guindaste operado por um sapo carrega uma janela do site com um pintinho em cima, enquanto uma raposa dorme ao lado de um cone"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <clipPath id="mnt-win">
              <rect x="173" y="115" width="52" height="32" rx="4" />
            </clipPath>
          </defs>

          {/* confetes e cruzes */}
          <g strokeWidth={5}>
            <path className="float s-stitch" d="M770 110 v20 M760 120 h20" />
            <path className="float f2 s-gold" d="M884 206 v16 M876 214 h16" />
            <path className="float f3 s-red" d="M30 220 v14 M23 227 h14" />
          </g>
          <circle className="float f2 f-red" cx="730" cy="30" r="6" />
          <circle className="float f3 f-green" cx="840" cy="70" r="5" />
          <circle className="float f-yellow" cx="700" cy="200" r="5" />
          <circle className="float f3 f-yellow" cx="250" cy="24" r="5" />

          {/* chão */}
          <path className="s-border" d="M10 421 H930" strokeWidth={2.5} />
          <g className="f-ink" opacity={0.1}>
            <ellipse cx="145" cy="424" rx="80" ry="7" />
            <ellipse cx="800" cy="424" rx="110" ry="7" />
          </g>

          {/* guindaste */}
          <path className="s-ink" d="M145 46 L70 84 M145 46 L670 84" strokeWidth={3} />
          <path className="beam" d="M145 402 V48" strokeWidth={30} />
          <path
            className="stitch"
            d="M137 388 l16 -22 l-16 -22 l16 -22 l-16 -22 l16 -22 l-16 -22 l16 -22 l-16 -22 l16 -22 l-16 -22 l16 -22 l-16 -22"
          />
          <path className="beam" d="M62 90 H690" strokeWidth={20} />
          <path className="stitch" d="M62 90 H690" strokeDasharray="1 11" />
          <rect className="f-beam" x="88" y="398" width="114" height="22" rx="5" />
          <path className="s-ink" d="M145 30 V22" strokeWidth={3} />
          <circle className="beacon f-red" cx="145" cy="18" r="7" />
          <rect className="ln f-gold" x="48" y="100" width="58" height="40" rx="6" />
          <path className="s-ink" d="M60 113 h34 M60 126 h34" strokeWidth={3} opacity={0.35} />

          {/* cabine com o sapo */}
          <rect className="ln f-surface" x="163" y="104" width="72" height="62" rx="8" />
          <rect className="f-teal-subtle" x="173" y="115" width="52" height="32" rx="4" />
          <g clipPath="url(#mnt-win)">
            <g transform="translate(199 152) scale(.42) translate(-450 -300)">
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
              <g className="fb blink b2">
                <circle className="f-surface" cx="424" cy="251" r="10.5" />
                <circle className="f-surface" cx="476" cy="251" r="10.5" />
                <circle className="f-ink" cx="428" cy="252" r="5.6" />
                <circle className="f-ink" cx="480" cy="252" r="5.6" />
              </g>
              <path className="s-ink" d="M422 284 q28 15 56 0" strokeWidth={5} />
              <circle className="f-red s-ink" cx="450" cy="274" r="8" strokeWidth={4} />
            </g>
          </g>
          <rect className="ln" x="173" y="115" width="52" height="32" rx="4" strokeWidth={3} />
          <path className="s-stitch" d="M176 157 h46" strokeWidth={4} />

          {/* carrinho + cabo + carga */}
          <g className="travel">
            <rect className="f-ink" x="298" y="100" width="44" height="13" rx="5" />
            <path
              className="cable s-ink"
              d="M320 112 V198"
              strokeWidth={3}
              strokeLinecap="butt"
              vectorEffect="non-scaling-stroke"
            />
            <g className="hoist">
              <g className="sway">
                <path className="s-ink" d="M320 198 L280 228 M320 198 L346 228" strokeWidth={3} />
                <circle className="f-ink" cx="320" cy="198" r="6.5" />

                {/* janela do site */}
                <rect className="ln f-surface" x="250" y="228" width="140" height="80" rx="8" />
                <path className="s-ink" d="M250 247 h140" strokeWidth={3} />
                <circle className="f-red" cx="264" cy="238" r="3.6" />
                <circle className="f-gold" cx="276" cy="238" r="3.6" />
                <circle className="f-green" cx="288" cy="238" r="3.6" />
                <rect className="f-teal-subtle" x="262" y="258" width="50" height="38" rx="4" />
                <path className="s-border" d="M324 262 h54 M324 276 h54 M324 290 h34" strokeWidth={6} />

                {/* pintinho de carona */}
                <g transform="translate(372 227) scale(.5) translate(-220 -64)">
                  <g className="chick">
                    <ellipse className="wing back ln f-gold" cx="204" cy="8" rx="14" ry="10" strokeWidth={5} />
                    <path className="s-orange" d="M211 66 V50 M229 66 V50 M204 66 h12 M224 66 h12" strokeWidth={5} />
                    <ellipse className="ln f-yellow" cx="220" cy="22" rx="35" ry="32" strokeWidth={5} />
                    <path className="ln" d="M213 -8 q-6 -12 1 -17 M221 -9 q1 -13 9 -14" strokeWidth={5} />
                    <ellipse className="wing ln f-gold" cx="203" cy="28" rx="15" ry="11" strokeWidth={5} />
                    <path className="ln f-orange" d="M252 14 l19 7 l-19 8 z" strokeWidth={5} />
                    <g className="fb blink">
                      <circle className="f-ink" cx="235" cy="12" r="5" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* raposa dormindo, com o capacete nas costas */}
          <g transform="translate(110 0)">
            <g className="foxbody">
              <ellipse className="ln f-red" cx="678" cy="376" rx="50" ry="31" />
              <path className="ln f-yellow" d="M664 348 a24 22 0 0 1 48 0 z" />
              <path className="s-ink" d="M657 348 h62 M688 327 v20" strokeWidth={3.5} />
            </g>
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
              <path
                className="ln f-surface"
                strokeWidth={3}
                d="M607 381 q2 -12 18 -10 q12 4 8 16 q-6 9 -18 7 q-9 -4 -8 -13 z"
              />
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

          {/* cone */}
          <path className="ln f-red" d="M886 346 l17 66 h-34 z" />
          <path className="s-surface" d="M878 380 h16" strokeWidth={9} strokeLinecap="butt" />
          <rect className="ln f-red-dark" x="860" y="410" width="52" height="10" rx="4" />
        </svg>
    </div>
  );
}
