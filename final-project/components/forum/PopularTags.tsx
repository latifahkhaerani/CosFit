"use client";

const tags = [
  {
    name: "#CosplayTips",
    posts: "2.4k",
    color: "#F97316",
  },
  {
    name: "#Anime",
    posts: "3.2k",
    color: "#8B5CF6",
  },
  {
    name: "#Photography",
    posts: "1.8k",
    color: "#06B6D4",
  },
  {
    name: "#Armor",
    posts: "1.2k",
    color: "#EF4444",
  },
  {
    name: "#Events",
    posts: "1.1k",
    color: "#10B981",
  },
  {
    name: "#WigStyling",
    posts: "1.5k",
    color: "#EC4899",
  },
];

export default function PopularTags() {
  return (
    <section className="card p-6">

      <div className="mb-6">

        <h3 className="card-title">

          Popular Tags

        </h3>

      </div>

      <div className="flex flex-wrap gap-3">

        {tags.map((tag) => (

          <button
            key={tag.name}
            className="
            rounded-full
            border
            border-[var(--border)]
            px-4
            py-2
            transition
            hover:-translate-y-0.5
            hover:shadow-card
            "
            style={{
              color: tag.color,
            }}
          >

            <div className="font-medium">

              {tag.name}

            </div>

            <div className="text-xs opacity-70">

              {tag.posts} posts

            </div>

          </button>

        ))}

      </div>

    </section>
  );
}