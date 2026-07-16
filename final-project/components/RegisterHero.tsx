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
    <section className="relative flex h-full flex-col overflow-hidden bg-background px-12 py-8 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
      {/* Character — full-bleed background photo */}

      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/register-girl1.png"
          alt=""
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      {/* Scrim: keeps the left side (where the text sits) legible while the photo stays fully visible on the right */}

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />

      {/* Glow */}
      <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-[#E1BD9C]/30 blur-3xl" />

      {/* Logo */}

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-primary">CosFit</h1>

        <p className="mt-1 text-base text-secondary">AI Virtual Fitting</p>
      </div>

      {/* Heading */}

      <div className="relative z-10 mt-6 max-w-md">
        <h2 className="text-5xl font-bold leading-tight text-(--text)">
          Start Your
          <br />
          <span className="text-(--primary)">Cosplay Journey</span>
          <br />
          with CosFit
          <Sparkles className={newLocal} size={30} />
        </h2>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Create your account and explore endless cosplay possibilities powered
          by AI.
        </p>
      </div>

      {/* Feature Card */}

      <div className="relative z-10 mt-auto w-95 max-w-full rounded-3xl bg-white/85 p-6 shadow-xl backdrop-blur">
        <Feature
          icon={<WandSparkles size={20} />}
          title="AI Virtual Try-On"
          desc="See yourself in any costume before renting."
        />

        <Feature
          icon={<Ruler size={20} />}
          title="Size Match & Compare"
          desc="Find the perfect fit instantly."
        />

        <Feature
          icon={<ShieldCheck size={20} />}
          title="Trusted Rental Vendors"
          desc="Rent with confidence."
        />
      </div>

      {/* Stats */}

      <div className="relative z-10 mt-5 flex overflow-hidden rounded-3xl bg-(--primary) text-white shadow-xl">
        <Stat
          icon={<Users size={24} />}
          value="50K+"
          label="Happy Cosplayers"
        />

        <Stat icon={<Stars size={24} />} value="1M+" label="Virtual Try-Ons" />

        <Stat
          icon={<ShieldCheck size={24} />}
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
    <div className="mb-4 flex gap-4 last:mb-0">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-background text-(--primary)">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-(--text)">{title}</h4>

        <p className="mt-0.5 text-sm text-gray-500">{desc}</p>
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
    <div className="flex flex-1 items-center justify-center gap-3 py-5">
      <div>{icon}</div>

      <div>
        <h3 className="text-3xl font-bold">{value}</h3>

        <p className="text-sm text-white/80">{label}</p>
      </div>
    </div>
  );
}
