import Image from "next/image";

export function StaticLoadFallback() {
  return (
    <div className="initial-load-fallback flex flex-col items-center gap-6 sm:gap-7">
      <div className="initial-load-fallback__mark relative h-32 w-32 sm:h-36 sm:w-36">
        <svg viewBox="0 0 192 192" className="h-full w-full" fill="none" aria-hidden="true">
          <circle
            cx="95.77"
            cy="95.77"
            r="92"
            stroke="#552c85"
            strokeWidth="2.2"
            className="initial-load-fallback__ring"
          />
          <circle cx="76.3" cy="47.3" r="14" stroke="#188a44" strokeWidth="2" />
          <circle cx="117.91" cy="47.3" r="14" stroke="#188a44" strokeWidth="2" />
          <path
            d="M100.57,79.73c-1.44-1.15-3-2.15-4.68-3.02-5.34-2.78-11.87-4.16-19.59-4.16-.99,0-1.96.02-2.91.08-3.98.19-7.64.8-10.95,1.84-3.89,1.2-7.32,2.97-10.29,5.32-6.12,4.83-9.19,12.23-9.19,22.2v58.89h10.95v-57.79c0-8.78,2.84-14.83,8.53-18.15,2.91-1.69,6.56-2.68,10.95-2.95.82-.05,1.67-.07,2.54-.07,4.4,0,8.17.6,11.3,1.8,3.76,1.42,6.6,3.72,8.5,6.87,1.91-3.27,4.78-5.61,8.62-7.02-1.09-1.43-2.35-2.71-3.78-3.84Z"
            stroke="#552c85"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M109.64,101.99v47.31c0,6.03-4.93,11.21-10.95,11.5h0c-.95.06-1.92.08-2.91.08s-1.96-.02-2.91-.08h0c-6.13-.28-10.95-5.33-10.95-11.47v-47.34c0-.99.03-1.96.1-2.9.39-6.25,2.13-11.37,5.21-15.37,3.76,1.42,6.6,3.72,8.5,6.87-1.91,3.25-2.86,7.42-2.86,12.5v45.85c0,1.41,1.13,2.55,2.53,2.57.24,0,.49,0,.74,0h0c1.4,0,2.55-1.15,2.55-2.55v-45.87c0-5.08-.98-9.25-2.96-12.5,1.91-3.27,4.78-5.61,8.62-7.02,3.07,4.01,4.8,9.19,5.19,15.52.07.94.1,1.91.1,2.9Z"
            stroke="#552c85"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M139.53,79.73c-6.05-4.79-14.14-7.18-24.28-7.18-7.56,0-14.01,1.39-19.36,4.16-1.71.88-3.3,1.91-4.79,3.08-1.47,1.16-2.76,2.47-3.87,3.93,3.76,1.42,6.6,3.72,8.5,6.87,1.91-3.27,4.78-5.61,8.62-7.02,2.95-1.1,6.46-1.65,10.54-1.65,1.13,0,2.22.04,3.27.12,3.93.29,7.26,1.14,10,2.55,6.32,3.22,9.48,9.39,9.48,18.5v57.79h10.95v-58.89c0-10.05-3.02-17.48-9.06-22.26Z"
            stroke="#552c85"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <Image
        src="/marydoc.svg"
        alt="Marydoc"
        width={168}
        height={38}
        className="h-8 w-auto opacity-80 sm:h-9"
        priority
      />
    </div>
  );
}
