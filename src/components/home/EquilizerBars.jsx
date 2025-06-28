
export default function PulseCircle() {
  const bars = [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10, 11, 12, 13, 14, 15]; 
  const heightMap = [1.5, 4.9, 3.6, 3];

  return (
    <div className="flex items-center justify-center gap-2 relative">
      {/* Left wave */}
      {/* <div className="">(</div> */}

      {/* Bars */}
      {bars.map((_, i) => (
        <div
          key={i}
          className="w-1.5 bg-black rounded-sm animate-barPulse"
          style={{
            height: `${8 + (heightMap[i%4]) * 10}px`,
            animationDelay: `-${i * 0.15}s`,
          }}
        />
      ))}

      {/* Right wave */}
      {/* <div className="animate-waveFade">)</div> */}
    </div>
  );
}
