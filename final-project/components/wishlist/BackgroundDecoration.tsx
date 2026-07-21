import { Sparkles } from "lucide-react";

export default function BackgroundDecoration() {
  return (
    <>
      {/* Top Left */}
      <div className="absolute left-80 top-34 text-[#F3CDB8] opacity-70">
        <Sparkles size={36} />
      </div>

      {/* Top Center */}
      <div className="absolute left-1/2 top-48 text-[#F3CDB8] opacity-70">
        <Sparkles size={40} />
      </div>

      {/* Right */}
      <div className="absolute right-10 top-40 text-[#F3CDB8] opacity-60">
        <Sparkles size={30} />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-72 left-20 text-[#F3CDB8] opacity-60">
        <Sparkles size={30} />
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-56 right-40 text-[#F3CDB8] opacity-60">
        <Sparkles size={36} />
      </div>
    </>
  );
}
