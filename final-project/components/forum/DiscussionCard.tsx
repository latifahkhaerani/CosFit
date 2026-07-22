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
  tagColor = "#be2727",
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
    <article className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/70 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#be2727]/30 hover:bg-white hover:shadow-[0_12px_30px_-4px_rgba(190,39,39,0.12)]">
      
      {/* Pinned Badge */}
      {pinned && (
        <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-l from-amber-500 to-amber-400 px-3.5 py-1 text-xs font-bold text-white shadow-sm flex items-center gap-1.5">
          <Pin size={12} className="fill-white" /> Disematkan
        </div>
      )}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* Avatar Area dengan Ring Gradient */}
        <div className="flex-shrink-0">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-105">
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
        <div className="flex-1 min-w-0">
          {/* Header Card (Author & Time) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500">
            <span className="font-bold text-gray-900 text-sm flex items-center gap-1">
              {author}
              {verified && <CheckCircle2 size={14} className="text-blue-500 fill-blue-50" />}
            </span>
            <span>•</span>
            <span>{time}</span>
          </div>
          
          {/* Title & Desc */}
          <h3 className="mt-1.5 text-lg sm:text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-[#be2727] line-clamp-1">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 font-normal">
            {description}
          </p>
          
          {/* Footer Card (Tags & Stats) */}
          <div className="mt-6 flex flex-col justify-between gap-4 pt-4 border-t border-gray-100/80 sm:flex-row sm:items-center">
            
            {/* Tags List */}
            <div className="flex flex-wrap gap-1.5">
              {tag.map((t, index) => (
                <span 
                  key={index} 
                  className="rounded-lg bg-gray-100/80 px-3 py-1 text-xs font-semibold text-gray-600 transition-colors group-hover:bg-[#be2727]/5 group-hover:text-[#be2727]"
                  style={{ color: index === 0 ? tagColor : undefined }}
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Stats Interactions */}
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
              
              <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 border border-gray-100/80" title="Komentar">
                <MessageCircle size={16} className="text-gray-400" />
                <span>{comments}</span>
              </div>

              {views > 0 && (
                <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 border border-gray-100/80" title="Dilihat">
                  <Eye size={16} className="text-gray-400" />
                  <span>{views}</span>
                </div>
              )}

              {/* Like Button dengan Efek Premium */}
              <button
                type="button"
                onClick={onLike}
                title={isLiked ? "Batal Suka" : "Suka Diskusi"}
                className={`group/btn flex items-center gap-1.5 rounded-lg px-3 py-1.5 border transition-all duration-200 active:scale-95 ${
                  isLiked
                    ? "bg-red-50/80 border-red-200 text-[#be2727] shadow-sm" 
                    : "bg-gray-50 border-gray-100/80 hover:bg-red-50/50 hover:border-red-100 hover:text-[#be2727]" 
                }`}
              >
                <Heart
                  size={16}
                  className={`transition-transform duration-300 group-active/btn:scale-125 ${
                    isLiked
                      ? "fill-[#be2727] text-[#be2727]"
                      : "group-hover/btn:text-[#be2727] text-gray-400"
                  }`}
                />
                <span>{likes}</span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </article>
  );
}