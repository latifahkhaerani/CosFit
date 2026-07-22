"use client";

import { BookMarked, Heart, LayoutGrid, List } from "lucide-react";
import { useMemo, useState } from "react";
import LookCard from "./LookCard";

type Tab = "all" | "ready" | "wishlist";

type SavedLook = {
  _id: string;
  UserId: string;
  UserImg: string;
  AiImgUrl: string;
  Name: string;
  Theme: string;
  createdAt: string;
};

type Props = {
  savedLooks: SavedLook[];
};

export default function ProfileSavedLooks({ savedLooks }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredLooks = useMemo(() => savedLooks, [savedLooks]);

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-[#efe4db] bg-white p-8 lg:flex-row lg:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF3EF]">
            <BookMarked className=" text-[#B14744]" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#1f1a17]">Saved Looks</h1>

            <p className="mt-1 text-[#7d746d]">
              All your AI generated cosplay previews.
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}

      {filteredLooks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#efe4db] bg-white py-24 text-center">
          <BookMarked className="mx-auto mb-5 text-[#B14744]" size={42} />

          <h2 className="text-xl font-semibold text-[#1f1a17]">
            No saved looks yet
          </h2>

          <p className="mt-2 text-[#7d746d]">
            Generate your first AI cosplay preview to see it here.
          </p>
        </div>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              : "space-y-5"
          }
        >
          {filteredLooks.map((look) => (
            <LookCard
              key={look._id}
              beforeImage={look.UserImg}
              afterImage={look.AiImgUrl}
              character={look.Name}
              series={look.Theme}
              generatedAt={new Date(look.createdAt).toLocaleDateString("id-ID")}
              status="saved"
              tags={[]}
              liked={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
