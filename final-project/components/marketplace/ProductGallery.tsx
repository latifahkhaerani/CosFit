"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import type { GetProduct } from "@/app/types";

export interface ProductGalleryProps {
  product: GetProduct;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = useMemo(() => {
    const gallery = product.imgGalery ?? [];

    const merged = [product.imgUrl, ...gallery];

    return [...new Set(merged.filter(Boolean))];
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex gap-5">
      {/* Thumbnail */}

      <div className="flex flex-col gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`
              relative
              h-22
              w-22
              overflow-hidden
              rounded-2xl
              border-2
              transition-all

              ${
                selectedImage === image
                  ? "border-primary shadow-lg"
                  : "border-[#EFE4DB] hover:border-[#D8C8BA]"
              }
            `}
          >
            <Image
              src={image}
              alt={`Gallery ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main */}

      <div className="group relative aspect-[4/5] flex-1 overflow-hidden rounded-[32px] border border-[#EFE4DB] bg-[#FAF8F5]">
        <Image
          src={selectedImage}
          alt={product.title}
          fill
          priority
          className="object-cover object-top transition duration-500 "
        />

        {/* Zoom */}

        <div className="absolute bottom-5 right-5 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur transition opacity-0 group-hover:opacity-100">
          <ZoomIn size={20} className="text-[#555]" />
        </div>
      </div>
    </div>
  );
}
