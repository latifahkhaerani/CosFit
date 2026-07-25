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
    <section className="rounded-2xl border border-white/80 bg-white/70 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Popular Tags</h3>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-3 border-[#be2727] border-t-transparent"></div>
        </div>
      ) : tags.length === 0 ? (
        <p className="text-sm text-gray-400 py-4 text-center">No tags available.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {tags.map((tag) => (
            <button
              key={tag.name}
              className="group flex items-center justify-between w-full rounded-xl border border-transparent px-3.5 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-200/60 bg-white/50 hover:bg-white"
              style={{
                borderLeftColor: tag.color,
                borderLeftWidth: '4px'
              }}
            >
              <div 
                className="font-semibold text-sm transition-colors group-hover:brightness-90"
                style={{ color: tag.color }}
              >
                {tag.name.startsWith('#') ? tag.name : `#${tag.name}`}
              </div>
              <div className="text-xs font-medium text-gray-400 bg-gray-100/80 px-2 py-0.5 rounded-md group-hover:bg-gray-100 group-hover:text-gray-600 transition-colors">
                {tag.posts} {tag.posts === 1 ? "post" : "posts"}
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}