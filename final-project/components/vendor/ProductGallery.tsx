"use client";

import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

const images = [
  "/images/costume-main.jpg",
  "/images/costume-2.jpg",
  "/images/costume-3.jpg",
  "/images/costume-4.jpg",
  "/images/costume-5.jpg",
];

export default function ProductGallery({imgUrl} : {imgUrl: string}) {

  return (
    <section className="card p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="card-title">Product Gallery</h3>

          <p className="card-subtitle">
            Showcase your costume from multiple angles.
          </p>
        </div>

        <span className="badge-success">Main Photo</span>
      </div>

      {/* Gallery */}

      <div className="grid grid-cols-[2.3fr_1fr] gap-5">
        {/* Main Image */}

        <div className="group relative overflow-hidden rounded-[26px]">
          <Image
            src={imgUrl}
            alt="Costume"
            width={900}
            height={1100}
            className=" h-full w-full object-cover transition duration-500 group-hover:scale-105 cursor-pointer hover:ring-2 hover:ring-(--primary)"
          />

          <div className="absolute left-5 top-5 rounded-full bg-black/70 px-4 py-2 text-sm text-white backdrop-blur">
            Main Photo
          </div>
        </div>

        {/* Thumbnail */}

        {/* <div className="grid grid-cols-2 gap-4">
          {images.map((img) => (
            <button
              key={img}
              onClick={() => setSelected(img)}
              className={`group overflow-hidden rounded-3xl border transition ${
                selected === img
                  ? "border-[var(--primary)] ring-2 ring-[#FCEAE3]"
                  : "border-[var(--border)]"
              }`}
            >
              <Image
                src={img}
                alt=""
                width={300}
                height={300}
                className="aspect-square h-full w-full object-cover transition duration-300 group-hover:scale-110"
              />
            </button>
          ))} */}

          {/* Upload */}

          {/* <button className="flex aspect-square flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[var(--border)] bg-[#FCFBFA] transition hover:border-[var(--primary)] hover:bg-[#FFF8F5]">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-card">
              <UploadCloud size={30} className="text-[var(--primary)]" />
            </div>

            <h4 className="font-semibold">Upload Image</h4>

            <p className="mt-2 text-center text-sm text-[var(--muted)]">
              JPG / PNG
              <br />
              up to 10 MB
            </p>
          </button>
        </div> */}
      </div>
    </section>
  );
}
