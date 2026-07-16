"use client";

import Image from "next/image";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
];

export default function CommunityGallery() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="card-title">Community Gallery</h2>

        <p className="card-subtitle">
          Moments shared by our amazing cosplayers.
        </p>
      </div>

      <div className="columns-2 gap-5 md:columns-3 xl:columns-4">
        {images.map((image) => (
          <div
            key={image}
            className="
            card
            mb-5
            overflow-hidden
            transition
            hover:shadow-soft
            "
          >
            <Image
              src={image}
              alt=""
              width={500}
              height={700}
              className="w-full transition duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
