"use client";

type Props = {
  title: string;
  icon: React.ReactNode;
  color: string;
};

export default function CategoryCard({
  title,
  icon,
  color,
}: Props) {
  return (
    <button
      className="
      card
      group
      flex
      flex-col
      items-center
      justify-center
      gap-5
      p-8
      text-center

      transition-all
      duration-300

      hover:-translate-y-1
      hover:shadow-soft
      "
    >
      <div
        className="
        flex
        h-20
        w-20
        items-center
        justify-center
        rounded-3xl
        transition
        duration-300
        group-hover:scale-110
        "
        style={{
          background: `${color}15`,
          color,
        }}
      >
        {icon}
      </div>

      <div>

        <h3 className="text-lg font-semibold">

          {title}

        </h3>

        <p className="mt-1 text-sm text-[var(--muted)]">

          Explore events

        </p>

      </div>
    </button>
  );
}