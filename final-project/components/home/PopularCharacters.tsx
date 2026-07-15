"use client";

import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { GetProduct } from "@/app/types";

export interface PopularCharactersProps {
  title?: string;
  viewAllLabel?: string;
  /** Products rendered as character cards (imgUrl -> photo, title -> name, theme -> series). */
  characters?: GetProduct[];
  onViewAll?: () => void;
  onSelectCharacter?: (productId: string) => void;
}

const placeholderCharacters: GetProduct[] = Array.from({ length: 6 }, (_, i) => ({
  _id: `character-${i}`,
  imgUrl: "",
  desc: "",
  size: "",
  theme: "",
  title: "",
  OriginalPrice: 0,
}));

function CharacterCard({
  character,
  onSelect,
}: {
  character: GetProduct;
  onSelect?: (productId: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(character._id)}
      className="group w-40 flex-shrink-0 text-left sm:w-44"
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-cream/30">
        {character.imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={character.imgUrl}
            alt={character.title || "Character"}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            Character image
          </div>
        )}
      </div>
      <p className="mt-2 truncate text-sm font-medium text-foreground">
        {character.title || "Character Name"}
      </p>
      <p className="truncate text-xs text-muted">{character.theme || "Series"}</p>
    </button>
  );
}

export default function PopularCharacters({
  title = "Popular Characters",
  viewAllLabel = "View All Characters",
  characters = placeholderCharacters,
  onViewAll,
  onSelectCharacter,
}: PopularCharactersProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 font-serif text-xl font-semibold text-foreground">
          {title}
          <Sparkles className="h-4 w-4 text-accent" />
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-primary hover:text-secondary"
        >
          {viewAllLabel} &rarr;
        </button>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Scroll left"
          className="absolute -left-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-sm hover:bg-cream/40 sm:flex"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {characters.map((character) => (
            <CharacterCard key={character._id} character={character} onSelect={onSelectCharacter} />
          ))}
        </div>

        <button
          type="button"
          aria-label="Scroll right"
          className="absolute -right-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-sm hover:bg-cream/40 sm:flex"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
