"use client";

type TagData = {
  name: string;
  posts: number;
  color: string;
};

type Props = {
  tags: TagData[];
  isLoading?: boolean;
};

export default function PopularTags({ tags, isLoading }: Props) {
  return (
    <section className="card p-6">
      <div className="mb-6">
        <h3 className="card-title">Popular Tags</h3>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent"></div>
        </div>
      ) : tags.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">No tags available.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag.name}
              className="
                rounded-full
                border
                px-4
                py-2
                transition
                hover:-translate-y-0.5
                hover:shadow-card
              "
              style={{
                color: tag.color,
                borderColor: `${tag.color}40`,
                backgroundColor: `${tag.color}10`,
              }}
            >
              <div className="font-medium">
                {tag.name.startsWith('#') ? tag.name : `#${tag.name}`}
              </div>
              <div className="text-xs opacity-70">
                {tag.posts} {tag.posts === 1 ? "post" : "posts"}
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}