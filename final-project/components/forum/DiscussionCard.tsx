"use client";

import Image from "next/image";
import { MessageCircle, Heart, Eye, Pin, CheckCircle2 } from "lucide-react";

type Props = {
  slug?: string;
  avatar: string;
  author: string;
  title: string;
  description: string;
  tag: string[];
  tagColor?: string;
  comments: number;
  likes: number;
  isLiked?: boolean;
  time: string;
  views?: number;
  pinned?: boolean;
  verified?: boolean;
  onLike: (e: React.MouseEvent) => void;
};

export default function DiscussionCard({
  avatar,
  author,
  title,
  description,
  tag,
  tagColor = "#06B6D4",
  comments,
  likes,
  isLiked = false, 
  time,
  views = 0,
  pinned = false,
  verified = false,
  onLike,
}: Props) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D64C4C]/30 hover:shadow-lg">
      
      {/* Pinned Badge (Optional) */}
      {pinned && (
        <div className="absolute right-0 top-0 rounded-bl-xl bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 flex items-center gap-1">
          <Pin size={12} className="fill-amber-700" /> Disematkan
        </div>
      )}

      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Avatar Area */}
        <div className="flex-shrink-0">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-100">
            <Image 
              src={avatar} 
              alt={`Avatar ${author}`} 
              fill 
              sizes="48px"
              className="object-cover" 
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Header Card (Author & Time) */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900 flex items-center gap-1">
              {author}
              {verified && <CheckCircle2 size={14} className="text-blue-500 fill-blue-50" />}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{time}</span>
          </div>
          
          {/* Title & Desc */}
          <h3 className="mt-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#D64C4C]">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
            {description}
          </p>
          
          {/* Footer Card (Tags & Stats) */}
          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            
            {/* Tags List */}
            <div className="flex flex-wrap gap-2">
              {tag.map((t, index) => (
                <span 
                  key={index} 
                  className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 border border-gray-100"
                  style={{ color: index === 0 ? tagColor : undefined }}
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Stats Interactions */}
            <div className="flex items-center gap-5 text-sm text-gray-500">
              
              <div className="flex items-center gap-1.5" title="Komentar">
                <MessageCircle size={18} />
                <span>{comments}</span>
              </div>

              {views > 0 && (
                <div className="flex items-center gap-1.5" title="Dilihat">
                  <Eye size={18} />
                  <span>{views}</span>
                </div>
              )}

              {/* Like Button */}
              <button
                type="button"
                onClick={onLike}
                title={isLiked ? "Batal Suka" : "Suka Diskusi"}
                className={`group/btn flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors active:scale-95 ${
                  isLiked
                    ? "bg-red-50 text-red-500" 
                    : "hover:bg-red-50 hover:text-red-500" 
                }`}
              >
                <Heart
                  size={18}
                  className={`transition-transform group-hover/btn:scale-110 ${
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "group-hover/btn:fill-red-500 group-hover/btn:text-red-500 text-gray-400"
                  }`}
                />
                <span className="font-medium">{likes}</span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </article>
  );
}