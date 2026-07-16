"use client";

export default function DiscussionInfo() {
  return (
    <section className="card p-6">

      <h3 className="card-title mb-6">

        Discussion Info

      </h3>

      <div className="space-y-5">

        <InfoRow
          title="Category"
          value="Cosplay Tips"
        />

        <InfoRow
          title="Replies"
          value="24"
        />

        <InfoRow
          title="Views"
          value="1.2K"
        />

        <InfoRow
          title="Created"
          value="May 15, 2025"
        />

      </div>

      <div className="mt-8">

        <h4 className="mb-3 font-semibold">

          Tags

        </h4>

        <div className="flex flex-wrap gap-2">

          {[
            "CosplayTips",
            "Frieren",
            "HairStyling",
            "Wig",
            "Help",
          ].map((tag) => (

            <span
              key={tag}
              className="
              rounded-full
              border
              border-[var(--border)]
              bg-[#FFF8F4]
              px-3
              py-1.5
              text-xs
              text-[var(--primary)]
              "
            >
              {tag}
            </span>

          ))}

        </div>

      </div>

    </section>
  );
}

function InfoRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-sm text-[var(--muted)]">

        {title}

      </span>

      <span className="font-semibold">

        {value}

      </span>

    </div>
  );
}