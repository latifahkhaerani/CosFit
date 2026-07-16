"use client";

type Props = {
  title: string;

  desc: string;

  color: string;

  icon: React.ReactNode;
};

export default function QuickAction({
  title,

  desc,

  color,

  icon,
}: Props) {
  return (
    <button className="group rounded-3xl border border-(--border) bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-card">
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{
          background: `${color}15`,
          color,
        }}
      >
        {icon}
      </div>

      <h4 className="font-semibold">{title}</h4>

      <p className="mt-1 text-sm text-(--muted)">{desc}</p>
    </button>
  );
}
