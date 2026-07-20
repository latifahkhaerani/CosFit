"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import Image from "next/image";
import { Camera, Pencil, Ruler, Weight, HeartPulse, Loader2 } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface ProductType {
  _id: string;
  imgUrl: string;
  title: string;
  desc: string;
  size: string;
  theme: string;
  originalPrice: number;
  stock: number;
  vendorId: string;
  views: number;
  discount: number;
  finalPrice: number;
}

export default function TryOnPage() {
  // State User Photo
  const [userFile, setUserFile] = useState<File | null>(null);
  const [userPreview, setUserPreview] = useState<string | null>(null);
  const [isDraggingUser, setIsDraggingUser] = useState<boolean>(false);
  const userInputRef = useRef<HTMLInputElement>(null);

  // State Selected Product
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false);

  // State AI
  const [aiResult, setAiResult] = useState<string>("https://cdn.fashn.ai/0aac3b42-e9ae-4282-bfb7-c5f1ae0b5db5/try_on_0.png");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State Product Database
  const [product, setProduct] = useState<ProductType[]>([]);

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

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/product`);
      if (res.ok) {
        const data: ProductType[] = await res.json();
        setProduct(data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // --- Fungsi Handle User Photo ---
  const handleUserImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserFile(file);
      setUserPreview(URL.createObjectURL(file));
    }
  };

  const handleUserDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingUser(true);
  };

  const handleUserDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingUser(false);
  };

  const handleUserDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingUser(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUserFile(file);
      setUserPreview(URL.createObjectURL(file));
    }
  };

  const clearUserPhoto = () => {
    setUserFile(null);
    setUserPreview(null);
    if (userInputRef.current) {
      userInputRef.current.value = "";
    }
  };

  // --- Fungsi Pilih Produk dari List ---
  const handleSelectProduct = (p: ProductType) => {
    setSelectedProduct(p);
    setShowAllProducts(false);
  };

  // --- Fungsi AI ---
  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const handleGenerate = async () => {
    if (!userPreview || !selectedProduct) {
      alert("Please provide both your photo and select a costume product!");
      return;
    }

    try {
      setIsLoading(true);

      const finalUserFile = userFile || (await urlToFile(userPreview, "user_selected.png"));
      // Tarik gambar kostum berdasarkan URL produk yang dipilih dari DB
      const finalCostumeFile = await urlToFile(selectedProduct.imgUrl, "costume_selected.jpg");

      const formData = new FormData();
      formData.append("User", finalUserFile);
      formData.append("Product", finalCostumeFile);

      const response = await fetch("http://localhost:3000/api/user/try-on", {
        method: "POST",
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
      {/* Pop-up All Products */}
      {showAllProducts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between sticky top-0 bg-white z-10 py-2">
              <div>
                <h2 className="text-3xl font-bold">All Products</h2>
                <p className="subtitle mt-1">Choose a costume to try on</p>
              </div>
              <button
                onClick={() => setShowAllProducts(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
              {product.map((p) => (
                <div key={p._id} className="card p-4 hover:shadow-lg transition">
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-3 bg-gray-100">
                    <Image src={p.imgUrl} alt={p.title} fill className="object-cover" unoptimized />
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-1">{p.title}</h4>
                  <p className="text-xs text-muted mb-3 line-clamp-1">{p.theme}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-sm">
                      Rp{p.finalPrice?.toLocaleString("id-ID")}
                    </span>
                    <button
                      onClick={() => handleSelectProduct(p)}
                      className="rounded-lg bg-[#FFF8F6] px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition cursor-pointer"
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hidden input for user photo */}
      <input type="file" ref={userInputRef} onChange={handleUserImageChange} accept="image/*" className="hidden" />

      <div className="page-container">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-3 text-sm">
          <Link href="/wishlist" className="flex items-center gap-2 text-muted hover:text-primary">
            <ChevronLeft size={16} /> Wishlist
          </Link>
          <ChevronRight size={15} className="text-muted" />
          <span className="font-medium text-primary">Try On</span>
        </div>

        {/* PAGE TITLE */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-[38px] font-bold">AI Virtual Try-On</h1>
            <p className="subtitle mt-2">See how the costume looks on you before renting.</p>
          </div>
        </div>

        {/* ROW 1 */}
        <div className="grid grid-cols-[320px_1fr_360px] gap-7">
          
          {/* LEFT SECTION */}
          <section>
            <div className="card p-5 mb-7">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Your Photo</h3>
                {userPreview && (
                  <button onClick={clearUserPhoto} className="text-sm font-medium text-primary hover:underline cursor-pointer">
                    Clear
                  </button>
                )}
              </div>

              {/* YOUR PHOTO - DRAG & DROP OR PREVIEW */}
              {userPreview ? (
                <>
                  <div className="relative overflow-hidden rounded-3xl">
                    <Image src={userPreview} alt="body" width={500} height={700} unoptimized className="h-[420px] w-full object-cover" />
                    <button onClick={() => userInputRef.current?.click()} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card cursor-pointer hover:bg-gray-100 transition">
                      <Camera size={18} />
                    </button>
                  </div>
                  <button onClick={() => userInputRef.current?.click()} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-white font-medium hover:bg-[#FFF8F6] cursor-pointer transition">
                    <Camera size={18} /> Choose/Change Your Photo
                  </button>
                </>
              ) : (
                <div
                  onDragOver={handleUserDragOver}
                  onDragLeave={handleUserDragLeave}
                  onDrop={handleUserDrop}
                  onClick={() => userInputRef.current?.click()}
                  className={`flex h-[420px] w-full cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed transition-all ${
                    isDraggingUser ? "border-primary bg-primary/10 scale-[0.98]" : "border-border bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm mb-4">
                    <Camera size={24} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-center px-4">Drag and drop</h4>
                  <p className="text-sm text-muted text-center px-4 mt-2">or click to select your photo here</p>
                </div>
              )}
            </div>

            <div className="card p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">Your Measurements</h3>
                <button className="flex items-center gap-1 text-sm font-medium text-primary">
                  <Pencil size={15} /> Edit
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

          {/* CENTER SECTION */}
          <section>
            <div className="card p-6 mb-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="section-title">AI Virtual Try-On</h2>
                  <p className="subtitle mt-1">Preview generated using your body profile.</p>
                </div>
                {aiResult && <span className="badge-success">✓ Generated</span>}
              </div>

              <div className="relative overflow-hidden rounded-[28px] bg-[#F7F4F1]">
                {isLoading ? (
                  <div className="flex h-150 w-full flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-3" />
                    <p className="font-semibold text-lg animate-pulse">Generating your AI Cosplay...</p>
                    <p className="text-sm text-muted mt-1">This may take up to a minute.</p>
                  </div>
                ) : (
                  <Image src={aiResult} alt="Generated Preview" width={900} height={900} unoptimized className="h-150 w-full object-contain py-2" />
                )}
                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 shadow-card backdrop-blur">
                  <p className="text-xs font-medium text-primary">AI Generated Preview</p>
                </div>
              </div>

              <div className="mt-6 justify-center">
                <button onClick={handleGenerate} disabled={isLoading || !selectedProduct || !userPreview} className="primary-btn w-full cursor-pointer flex justify-center items-center gap-2 disabled:opacity-70">
                  {isLoading && <Loader2 className="animate-spin" size={18} />}
                  {isLoading ? "Generating..." : "Generate New Try-On"}
                </button>
              </div>
            </div>

            <div className="card p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4EE]">✨</div>
                <div>
                  <h3 className="font-semibold">AI Recommendation</h3>
                  <p className="subtitle mt-2 leading-7">Based on your height, weight and measurements, this costume has an excellent fit. The sleeve length and waist proportions closely match your body profile.</p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT SECTION */}
          <section>
            {/* SELECTED COSTUME */}
            <div className="card p-5 mb-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Selected Costume</h3>
                  <p className="subtitle mt-1">Ready to Try-On</p>
                </div>
                {selectedProduct && (
                  <button onClick={() => setSelectedProduct(null)} className="text-sm font-medium text-primary hover:underline cursor-pointer">
                    Clear
                  </button>
                )}
              </div>

              {selectedProduct ? (
                <>
                  <div className="relative overflow-hidden rounded-3xl group">
                    <Image src={selectedProduct.imgUrl} alt="Selected Costume" width={500} height={700} unoptimized className="h-67.5 w-full object-cover" />
                    <span className="absolute left-4 top-4 badge-success">Good Match</span>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                       <button onClick={() => setShowAllProducts(true)} className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-gray-100">
                          Change Product
                       </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
                    <p className="subtitle">{selectedProduct.theme}</p>
                    
                    <div className="mt-4 bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                      <span className="text-sm text-muted">Size Selected</span>
                      <span className="font-semibold text-sm">{selectedProduct.size}</span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <p className="subtitle text-xs">Rental Price</p>
                        <h3 className="text-2xl font-bold text-primary">Rp{selectedProduct.finalPrice?.toLocaleString("id-ID")}</h3>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* EMPTY STATE - KLIK MEMUNCULKAN SEMUA PRODUK */
                <div
                  onClick={() => setShowAllProducts(true)}
                  className={`flex h-[380px] w-full cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-border bg-gray-50 hover:bg-gray-100 transition-all`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm mb-4">
                    <Camera size={24} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-center px-4">Click to select</h4>
                  <p className="text-sm text-muted text-center px-4 mt-2">choose your product here</p>
                </div>
              )}
            </div>

            {/* CHOOSE PRODUCTS (LIMIT 3) */}
            <div className="card p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">Products</h3>
                <button onClick={() => setShowAllProducts(true)} className="text-sm font-medium text-primary hover:underline cursor-pointer">
                  See More
                </button>
              </div>
              
              <div className="space-y-4">
                {product.slice(0, 3).map((p) => (
                  <div key={p._id} className="flex items-center gap-3 rounded-2xl border border-border p-3 hover:bg-gray-50 transition">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
                      <Image src={p.imgUrl} alt={p.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-medium text-sm truncate">{p.title}</h4>
                      <p className="text-xs text-muted mt-1 truncate">Rp{p.finalPrice?.toLocaleString("id-ID")}</p>
                    </div>
                    <button
                      onClick={() => handleSelectProduct(p)}
                      className="rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition cursor-pointer"
                    >
                      Select
                    </button>
                  </div>
                ))}
                {product.length === 0 && (
                   <p className="text-sm text-muted text-center py-4">No products found.</p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* ROW 2: History & Comparison */}
        <div className="mt-8 grid grid-cols-12 gap-7">
          <section className="col-span-8 space-y-6">
            <div className="card p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="section-title">Before & After</h2>
                  <p className="subtitle mt-1">Compare your original photo with the AI generated preview.</p>
                </div>
                <button onClick={handleDownload} disabled={isLoading || !userPreview} className="secondary-btn cursor-pointer disabled:opacity-50">
                  Download
                </button>
              </div>
              <div className="overflow-hidden rounded-[28px]">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={userPreview || "/images/body.png"} alt="Original" />}
                  itemTwo={<ReactCompareSliderImage src={aiResult} alt="Generated" />}
                />
              </div>
            </div>
          </section>

          <section className="col-span-4 space-y-6">
            <div className="card p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Generation History</h3>
                  <p className="subtitle mt-1">Recent AI previews</p>
                </div>
                <button className="text-sm text-primary hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {history.map((item) => (
                  <div key={item.id} className="group flex cursor-pointer gap-3 rounded-2xl p-2 transition hover:soft-bg">
                    <div className="relative h-24 w-20 overflow-hidden rounded-xl">
                      <Image src={item.image} alt="" fill className="object-cover" />
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
          </section>
        </div>
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