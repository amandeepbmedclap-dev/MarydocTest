"use client";

const WAVE_WIDTH = 1440;

/** Seamless tile: y(0) === y(1440) and matching slope at both ends */
const waveTop =
  "M0,52 C120,52 200,78 280,62 C360,46 440,22 520,34 C600,46 680,52 720,52 C840,52 920,22 1000,38 C1080,54 1160,78 1240,62 C1320,46 1400,52 1440,52";

function WaveTile() {
  return (
    <>
      <path className="fill-surface" d={`${waveTop} L${WAVE_WIDTH},96 L0,96 Z`} />
      <g transform="translate(0,-10)">
        <path
          fill="none"
          stroke="#bcdfd3"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          d={waveTop}
        />
      </g>
      <g transform="translate(0,-5)">
        <path
          fill="none"
          stroke="rgba(88,175,145,0.55)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          d={waveTop}
        />
      </g>
    </>
  );
}

export function HeroWaveDivider() {
  return (
    <div className="hero-wave-divider pointer-events-none relative z-10 -mb-px leading-[0]" aria-hidden="true">
      <svg
        viewBox={`0 0 ${WAVE_WIDTH * 2} 96`}
        preserveAspectRatio="none"
        className="hero-wave-divider__svg block h-14 w-[200%] max-w-none sm:h-[4.5rem] md:h-24"
      >
        <g>
          <g transform="translate(0, 0)">
            <WaveTile />
          </g>
          <g transform={`translate(${WAVE_WIDTH}, 0)`}>
            <WaveTile />
          </g>
        </g>
      </svg>
    </div>
  );
}
