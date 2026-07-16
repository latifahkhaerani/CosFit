import Image from "next/image";
import {
  Sparkles,
  WandSparkles,
  Ruler,
  ShieldCheck,
  Users,
  Stars,
} from "lucide-react";

export default function RegisterHero() {
  const newLocal = "ml-2 inline text-[var(--accent)]";
  return (
    <section className="relative flex h-screen flex-col overflow-hidden bg-background px-12 py-10">
      {/* Glow */}
      <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-[#E1BD9C]/30 blur-3xl" />

      {/* Logo */}

      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-primary">CosFit</h1>

        <p className="mt-1 text-lg text-secondary">AI Virtual Fitting</p>
      </div>

      {/* Heading */}

      <div className="relative z-10 mt-16 max-w-md">
        <h2 className="text-6xl font-bold leading-tight text-(--text)">
          Start Your
          <br />
          <span className="text-(--primary)">Cosplay Journey</span>
          <br />
          with CosFit
          <Sparkles className={newLocal} size={34} />
        </h2>

        <p className="mt-8 text-xl leading-9 text-gray-600">
          Create your account and explore endless cosplay possibilities powered
          by AI.
        </p>
      </div>

      {/* Character */}

      <div className="pointer-events-none absolute bottom-0 right-0">
        <Image
          src="/images/register-girl1.png"
          alt="CosFit"
          width={750}
          height={900}
          priority
          className="object-contain"
        />
      </div>

      {/* Feature Card */}

      <div className="relative z-10 mt-auto w-95 rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur">
        <Feature
          icon={<WandSparkles size={22} />}
          title="AI Virtual Try-On"
          desc="See yourself in any costume before renting."
        />

        <Feature
          icon={<Ruler size={22} />}
          title="Size Match & Compare"
          desc="Find the perfect fit instantly."
        />

        <Feature
          icon={<ShieldCheck size={22} />}
          title="Trusted Rental Vendors"
          desc="Rent with confidence."
        />
      </div>

      {/* Stats */}

      <div className="relative z-10 mt-8 flex overflow-hidden rounded-3xl bg-(--primary) text-white shadow-xl">
        <Stat
          icon={<Users size={28} />}
          value="50K+"
          label="Happy Cosplayers"
        />

        <Stat icon={<Stars size={28} />} value="1M+" label="Virtual Try-Ons" />

        <Stat
          icon={<ShieldCheck size={28} />}
          value="200+"
          label="Trusted Vendors"
        />
      </div>
    </section>
  );
}

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="mb-6 flex gap-4 last:mb-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-(--primary)">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-(--text)">{title}</h4>

        <p className="mt-1 text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}

type StatProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

function Stat({ icon, value, label }: StatProps) {
  return (
    <div className="flex flex-1 items-center justify-center gap-4 py-7">
      <div>{icon}</div>

      <div>
        <h3 className="text-3xl font-bold">{value}</h3>

        <p className="text-sm text-white/80">{label}</p>
      </div>
    </div>
  );
}
