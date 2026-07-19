"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Camera, Pencil, Ruler, Weight, HeartPulse, Loader2 } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default function TryOnPage() {
  const [userFile, setUserFile] = useState<File | null>(null);
  const [userPreview, setUserPreview] = useState<string>("/images/body.png");

  const [costumeFile, setCostumeFile] = useState<File | null>(null);
  const [costumePreview, setCostumePreview] = useState<string>("/images/hutao-card.jpg");

  const [aiResult, setAiResult] = useState<string>("https://cdn.fashn.ai/0aac3b42-e9ae-4282-bfb7-c5f1ae0b5db5/try_on_0.png");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userInputRef = useRef<HTMLInputElement>(null);
  const costumeInputRef = useRef<HTMLInputElement>(null);

  const history = [
    {
      id: 1,
      title: "Hu Tao",
      image: "/images/history1.jpg",
      date: "2 hours ago",
    },
    {
      id: 2,
      title: "Raiden Shogun",
      image: "/images/history2.jpg",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "Makima",
      image: "/images/history3.jpg",
      date: "3 days ago",
    },
  ];

  const handleUserImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserFile(file);
      setUserPreview(URL.createObjectURL(file));
    }
  };

  const handleCostumeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCostumeFile(file);
      setCostumePreview(URL.createObjectURL(file));
    }
  };

  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const handleGenerate = async () => {
    try {
      setIsLoading(true);

      const finalUserFile = userFile || (await urlToFile(userPreview, "user_default.png"));
      const finalCostumeFile = costumeFile || (await urlToFile(costumePreview, "costume_default.jpg"));

      const formData = new FormData();
      formData.append("User", finalUserFile);
      formData.append("Product", finalCostumeFile);

      const response = await fetch("http://localhost:3000/api/user/try-on", {
        method: "POST",
        headers: {
      Cookie: cookieStore.toString(),
    },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Gagal memproses AI Try-On");
      }

      if (typeof data === "string") {
        setAiResult(data);
      } else if (data?.AiImgUrl || data?.url) {
        setAiResult(data.AiImgUrl || data.url);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(aiResult);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cosfit-tryon-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Gagal mengunduh gambar. Silakan coba lagi.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <input
        type="file"
        ref={userInputRef}
        onChange={handleUserImageChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={costumeInputRef}
        onChange={handleCostumeImageChange}
        accept="image/*"
        className="hidden"
      />

      <div className="page-container">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-3 text-sm">
          <Link
            href="/wishlist"
            className="flex items-center gap-2 text-muted hover:text-primary"
          >
            <ChevronLeft size={16} />
            Wishlist
          </Link>

          <ChevronRight size={15} className="text-muted" />

          <span className="font-medium text-primary">Hu Tao</span>
        </div>

        {/* PAGE TITLE */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-[38px] font-bold">AI Virtual Try-On</h1>

            <p className="subtitle mt-2">
              See how the costume looks on you before renting.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="secondary-btn">How it Works</button>
            <button className="secondary-btn">Try Tips</button>
          </div>
        </div>

        {/* ROW 1 */}

        <div className="grid grid-cols-[320px_1fr_360px] gap-7">
          {/* LEFT */}
          <section>
            {/* YOUR PHOTO */}
            <div className="card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Your Photo</h3>
                <Camera size={16} className="text-muted" />
              </div>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src={userPreview}
                  alt="body"
                  width={500}
                  height={700}
                  unoptimized
                  className="h-105 w-full object-cover"
                />

                <button
                  onClick={() => userInputRef.current?.click()}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card cursor-pointer hover:bg-gray-100 transition"
                >
                  <Camera size={18} />
                </button>
              </div>

              <button
                onClick={() => userInputRef.current?.click()}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-white font-medium hover:bg-[#FFF8F6] cursor-pointer transition"
              >
                <Camera size={18} />
                Change Photo
              </button>
            </div>

            {/* BODY PROFILE */}
            <div className="card p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">Your Measurements</h3>
                <button className="flex items-center gap-1 text-sm font-medium text-primary">
                  <Pencil size={15} />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MeasureCard icon={<Ruler size={16} />} title="Height" value="155 cm" />
                <MeasureCard icon={<Weight size={16} />} title="Weight" value="45 kg" />
                <MeasureCard icon={<HeartPulse size={16} />} title="Bust" value="84 cm" />
                <MeasureCard icon={<HeartPulse size={16} />} title="Waist" value="62 cm" />
                <MeasureCard icon={<HeartPulse size={16} />} title="Hip" value="88 cm" />
                <MeasureCard icon={<HeartPulse size={16} />} title="Shoulder" value="36 cm" />
              </div>
            </div>
          </section>

          {/* CENTER */}
          <section>
            {/* AI Preview */}
            <div className="card p-6">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="section-title">AI Virtual Try-On</h2>
                  <p className="subtitle mt-1">
                    Preview generated using your body profile.
                  </p>
                </div>
                <span className="badge-success">✓ Generated</span>
              </div>

              {/* Preview */}
              <div className="relative overflow-hidden rounded-[28px] bg-[#F7F4F1]">
                {isLoading ? (
                  <div className="flex h-150 w-full flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-3" />
                    <p className="font-semibold text-lg animate-pulse">Generating your AI Cosplay...</p>
                    <p className="text-sm text-muted mt-1">This may take up to a minute.</p>
                  </div>
                ) : (
                  <Image
                    src={aiResult}
                    alt="Generated Preview"
                    width={900}
                    height={900}
                    unoptimized
                    className="h-150 w-full object-contain py-2"
                  />
                )}

                {/* AI Badge */}
                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 shadow-card backdrop-blur">
                  <p className="text-xs font-medium text-primary">
                    AI Generated Preview
                  </p>
                </div>

                {/* Match Score */}
                <div className="absolute right-5 top-5 rounded-2xl bg-white p-4 shadow-card">
                  <p className="text-xs text-muted">Match Score</p>
                  <h3 className="mt-1 text-3xl font-bold text-green-600">
                    95%
                  </h3>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <button className="secondary-btn w-full">Compare</button>
                <button className="secondary-btn w-full">Save Look</button>
                <button className="primary-btn w-full">Rent Costume</button>
              </div>
            </div>

            {/* AI Information */}
            <div className="card p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4EE]">
                  ✨
                </div>
                <div>
                  <h3 className="font-semibold">AI Recommendation</h3>
                  <p className="subtitle mt-2 leading-7">
                    Based on your height, weight and measurements, this costume
                    has an excellent fit. The sleeve length and waist
                    proportions closely match your body profile.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <section>
            {/* Selected Costume */}
            <div className="card p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Selected Costume</h3>
                  <p className="subtitle mt-1">Ready for rental</p>
                </div>

                <button
                  onClick={() => costumeInputRef.current?.click()}
                  className="text-sm font-medium text-primary hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src={costumePreview}
                  alt="Hu Tao"
                  width={500}
                  height={700}
                  unoptimized
                  className="h-67.5 w-full object-cover"
                />
                <span className="absolute left-4 top-4 badge-success">
                  Good Match
                </span>
              </div>

              <div className="mt-5">
                <h2 className="text-2xl font-bold">Hu Tao</h2>
                <p className="subtitle">Genshin Impact</p>

                <div className="mt-5 flex items-center gap-3">
                  <Image
                    src="/images/vendor-avatar.jpg"
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">Starlight Cosplay</p>
                    <p className="subtitle">⭐ 4.9 • 128 Reviews</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="subtitle">Rental Price</p>
                    <h3 className="text-3xl font-bold text-primary">
                      Rp450.000
                    </h3>
                    <p className="subtitle">/ 3 Days</p>
                  </div>
                  <button className="secondary-btn">View</button>
                </div>
              </div>
            </div>

            {/* Rental Information */}
            <div className="card p-5">
              <h3 className="mb-5 font-semibold">Rental Information</h3>
              <div className="space-y-4">
                <InfoItem title="Available Size" value="S • M • L" />
                <InfoItem title="Rental Duration" value="3 Days" />
                <InfoItem title="Deposit" value="Rp300.000" />
                <InfoItem title="Condition" value="Excellent" />
              </div>
            </div>
          </section>
        </div>

        {/* ROW 2 */}

        <div className="mt-8 grid grid-cols-12 gap-7">
          <section className="col-span-8 space-y-6">
            {/* Before & After */}
            <div className="card p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="section-title">Before & After</h2>
                  <p className="subtitle mt-1">
                    Compare your original photo with the AI generated preview.
                  </p>
                </div>

                <button
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="secondary-btn cursor-pointer disabled:opacity-50"
                >
                  Download
                </button>
              </div>

              <div className="overflow-hidden rounded-[28px]">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={userPreview}
                      alt="Original"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={aiResult}
                      alt="Generated"
                    />
                  }
                />
              </div>
            </div>
          </section>

          <section className="col-span-4 space-y-6">
            {/* Generation History */}
            <div className="card p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Generation History</h3>
                  <p className="subtitle mt-1">Recent AI previews</p>
                </div>
                <button className="text-sm text-primary hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="group flex cursor-pointer gap-3 rounded-2xl p-2 transition hover:soft-bg"
                  >
                    <div className="relative h-24 w-20 overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="subtitle">{item.date}</p>
                      </div>
                      <span className="badge-success">95% Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate */}
            <div className="overflow-hidden rounded-[28px] bg-linear-to-br from-[#FFF4EE] to-[#FFFDFB] p-6 shadow-card">
              <h3 className="text-xl font-semibold">Want another look?</h3>
              <p className="subtitle mt-2">
                Try another costume from your wishlist.
              </p>

              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="primary-btn mt-6 w-full cursor-pointer flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isLoading && <Loader2 className="animate-spin" size={18} />}
                {isLoading ? "Generating..." : "Generate New Try-On"}
              </button>
            </div>
          </section>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-8">{/* Part 3 */}</div>
      </div>
    </main>
  );
}

type MeasureProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function MeasureCard({ icon, title, value }: MeasureProps) {
  return (
    <div className="rounded-2xl soft-bg p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary">
        {icon}
      </div>
      <p className="text-xs text-muted">{title}</p>
      <h4 className="mt-1 font-semibold">{value}</h4>
    </div>
  );
}

type InfoItemProps = {
  title: string;
  value: string;
};

function InfoItem({ title, value }: InfoItemProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl soft-bg p-4">
      <span className="subtitle">{title}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}