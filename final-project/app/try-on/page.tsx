"use client";

import React, { useState, useRef, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, X, Camera, Loader2, Download, Gift, Coins } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

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

interface HistoryType {
  _id: string;
  UserId: string;
  AiImgUrl: string;
  Name: string;
  Theme: string;
  UserImg: string;
  createdAt: Date;
}

interface StatTokenType {
  token: number;
  claimedAt: string | Date | null;
}

function TryOnContent() {
  const searchParams = useSearchParams();
  const key = searchParams.get("productId");

  const [userFile, setUserFile] = useState<File | null>(null);
  const [userPreview, setUserPreview] = useState<string | null>(null);
  const [isDraggingUser, setIsDraggingUser] = useState<boolean>(false);
  const userInputRef = useRef<HTMLInputElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false);

  const [showAllHistory, setShowAllHistory] = useState<boolean>(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryType | null>(null);
  const [aiResult, setAiResult] = useState<string>("https://cdn.fashn.ai/0aac3b42-e9ae-4282-bfb7-c5f1ae0b5db5/try_on_0.png");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [product, setProduct] = useState<ProductType[]>([]);
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [tokenStatus, setTokenStatus] = useState<StatTokenType | null>(null);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/user/product`);
      if (res.ok) {
        const data: ProductType[] = await res.json();
        setProduct(data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/user/history`);
      if (res.ok) {
        const data: HistoryType[] = await res.json();
        setHistory(data);
      }
    } catch (error) {
      console.error("Failed to fetch history", error);
    }
  };

  const fetchToken = useCallback(async () => {
    try {
      const res = await fetch(`/api/user/token`);
      if (res.ok) {
        const data = await res.json();
        setTokenStatus(data.result);
      }
    } catch (error) {
      console.error("Failed to fetch token status", error);
    }
  }, []);

  const handleClaimToken = async () => {
    try {
      const res = await fetch(`/api/user/token`, {
        method: "PATCH",
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to claim token");
      }

      Swal.fire({
        icon: "success",
        title: "Claim Successful!",
        text: data.result?.message || "Successfully claimed your weekly tokens.",
        confirmButtonColor: "#c2410c",
      });

      await fetchToken();

    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Claim Failed",
        text: error.message || "Something went wrong while claiming the token.",
        confirmButtonColor: "#c2410c",
      });
    }
  };

  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  
  const isClaimedRecently = useCallback(() => {
    if (!tokenStatus?.claimedAt) return false;
    const lastClaim = new Date(tokenStatus.claimedAt).getTime();
    const now = new Date().getTime();
    return now - lastClaim < SEVEN_DAYS_MS;
  }, [tokenStatus?.claimedAt, SEVEN_DAYS_MS]);

  const getSisaHari = () => {
    if (!tokenStatus?.claimedAt) return 0;
    const lastClaim = new Date(tokenStatus.claimedAt).getTime();
    const now = new Date().getTime();
    const diff = SEVEN_DAYS_MS - (now - lastClaim);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const isClaimed = isClaimedRecently();

  useEffect(() => {
    if (key) {
      const getPassedTryOn = async () => {
        try {
          const res = await fetch(`/api/user/product/${key}`);
          if (res.ok) {
            const data: ProductType = await res.json();
            setSelectedProduct(data);
          }
        } catch (error) {
          console.error("Failed to fetch selected product detail:", error);
        }
      };
      getPassedTryOn();
    }
    fetchProduct();
    fetchHistory();
    fetchToken();
    
    return () => {
      if (userPreview) {
        URL.revokeObjectURL(userPreview);
      }
    };
  }, [key, fetchToken]);

  const processSelectedFile = useCallback((file?: File) => {
    if (file) {
      if (userPreview) {
        URL.revokeObjectURL(userPreview);
      }
      setUserFile(file);
      setUserPreview(URL.createObjectURL(file));
    }
  }, [userPreview]);

  const handleUserImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processSelectedFile(file);
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
    processSelectedFile(file);
  };

  const clearUserPhoto = () => {
    if (userPreview) {
      URL.revokeObjectURL(userPreview);
    }
    setUserFile(null);
    setUserPreview(null);
    if (userInputRef.current) {
      userInputRef.current.value = "";
    }
  };

  const handleSelectProduct = (p: ProductType) => {
    setSelectedProduct(p);
    setShowAllProducts(false);
  };

  const handleGenerate = async () => {
    if (!userFile || !selectedProduct) {
      alert("Please provide both your photo and select a costume product!");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("User", userFile);
      formData.append("Product", selectedProduct.imgUrl);
      formData.append("CharName", selectedProduct.title);
      formData.append("Theme", selectedProduct.theme);

      const response = await fetch("/api/user/try-on", {
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
      
      fetchToken();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Generation Failed",
        text: error.message || "An error occurred during AI generation.",
        confirmButtonColor: "#c2410c",
      });
    } finally {
      setIsLoading(false);
      fetchHistory(); 
    }
  };

  const downloadImage = async (imgUrl: string, fileName: string) => {
    if (!imgUrl) return;
    try {
      const response = await fetch(imgUrl);
      if (!response.ok) throw new Error("Gagal mengambil gambar");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            {product.length === 0 ? (
              <p className="text-center py-10 text-muted">No products available at the moment.</p>
            ) : (
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
                        Rp{p.finalPrice.toLocaleString("id-ID")}
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
            )}
          </div>
        </div>
      )}

      {/* Pop-up All History */}
      {showAllHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between sticky top-0 bg-white z-10 py-2">
              <div>
                <h2 className="text-3xl font-bold">Generation History</h2>
                <p className="subtitle mt-1">All your AI generated previews</p>
              </div>
              <button
                onClick={() => setShowAllHistory(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            {history.length === 0 ? (
              <p className="text-center py-10 text-muted">No history available yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                {history.map((h) => (
                  <div key={h._id} className="card p-4 hover:shadow-lg transition border border-border">
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-3 bg-gray-100 cursor-pointer" onClick={() => setSelectedHistoryItem(h)}>
                      <Image src={h.AiImgUrl} alt={h.Name} fill className="object-cover" unoptimized />
                    </div>
                    <h4 className="font-semibold text-sm line-clamp-1">{h.Name}</h4>
                    <p className="text-xs text-muted mb-3 line-clamp-1">AI Generated</p>
                    <button
                      onClick={() => setSelectedHistoryItem(h)}
                      className="w-full rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition cursor-pointer"
                    >
                      View Full Image
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pop-up Single History Image Detail */}
      {selectedHistoryItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold line-clamp-1">{selectedHistoryItem.Name}</h3>
              <button
                onClick={() => setSelectedHistoryItem(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl bg-[#F7F4F1] mb-6">
              <Image src={selectedHistoryItem.AiImgUrl} alt={selectedHistoryItem.Name} fill className="object-contain" unoptimized />
            </div>
            <button
              onClick={() => downloadImage(selectedHistoryItem.AiImgUrl, `cosfit-history-${Date.now()}.png`)}
              className="primary-btn w-full flex justify-center items-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition cursor-pointer"
            >
              <Download size={18} /> Download Image
            </button>
          </div>
        </div>
      )}

      {/* Hidden input for user photo */}
      <input type="file" ref={userInputRef} onChange={handleUserImageChange} accept="image/*" className="hidden" />

      <div className="page-container px-6 py-8 max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-3 text-sm">
          <Link href="/wishlist" className="flex items-center gap-2 text-muted hover:text-primary transition">
            <ChevronLeft size={16} /> Wishlist
          </Link>
          <ChevronRight size={15} className="text-muted" />
          <span className="font-medium text-primary">Try On</span>
        </div>

        {/* PAGE TITLE, TOKEN DISPLAY & CLAIM TOKEN BUTTON */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-[38px] font-bold text-gray-900">AI Virtual Try-On</h1>
            <p className="subtitle mt-2 text-gray-500">See how the costume looks on you before renting.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* TOKEN BALANCE DISPLAY */}
            <div className="flex items-center gap-2 rounded-2xl border border-orange-100 bg-[#FFF8F6] px-4 py-3 shadow-xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Coins size={18} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Your Tokens</p>
                <p className="text-base font-bold text-gray-900">
                  {tokenStatus?.token ?? 0} <span className="text-xs font-normal text-gray-500">Tokens</span>
                </p>
              </div>
            </div>

            {/* CLAIM WEEKLY TOKEN BUTTON */}
            <button 
              onClick={handleClaimToken}
              disabled={isClaimed}
              className={`flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-all shadow-sm ${
                isClaimed 
                  ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed" 
                  : "bg-primary text-white shadow-md hover:bg-primary/90 cursor-pointer active:scale-95"
              }`}
            >
              <Gift size={18} />
              {isClaimed ? `Claimed (${getSisaHari()}d left)` : "Claim Weekly Token"}
            </button>
          </div>
        </div>

        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_360px] gap-7">
          
          {/* LEFT SECTION */}
          <section className="space-y-7">
            {/* YOUR PHOTO */}
            <div className="card p-5 bg-white rounded-[32px] shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg text-gray-800">Your Photo</h3>
                {userPreview && (
                  <button onClick={clearUserPhoto} className="text-sm font-medium text-primary hover:underline cursor-pointer">
                    Clear
                  </button>
                )}
              </div>

              {userPreview ? (
                <>
                  <div className="relative overflow-hidden rounded-3xl">
                    <Image src={userPreview} alt="body" width={500} height={700} unoptimized className="h-[420px] w-full object-cover" />
                    <button onClick={() => userInputRef.current?.click()} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:bg-gray-100 transition">
                      <Camera size={18} />
                    </button>
                  </div>
                  <button onClick={() => userInputRef.current?.click()} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white font-medium hover:bg-[#FFF8F6] cursor-pointer transition text-gray-700">
                    <Camera size={18} /> Change Your Photo
                  </button>
                </>
              ) : (
                <div
                  onDragOver={handleUserDragOver}
                  onDragLeave={handleUserDragLeave}
                  onDrop={handleUserDrop}
                  onClick={() => userInputRef.current?.click()}
                  className={`flex h-[420px] w-full cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed transition-all ${
                    isDraggingUser ? "border-primary bg-primary/10 scale-[0.98]" : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm mb-4">
                    <Camera size={24} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-center px-4 text-gray-700">Drag and drop</h4>
                  <p className="text-sm text-gray-500 text-center px-4 mt-2">or click to select your photo here</p>
                </div>
              )}
            </div>

            {/* GENERATION HISTORY */}
            <div className="card p-5 bg-white rounded-[32px] shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Generation History</h3>
                  <p className="subtitle mt-1 text-xs text-gray-500">Recent AI previews</p>
                </div>
                <button onClick={() => setShowAllHistory(true)} className="text-sm font-medium text-primary hover:underline cursor-pointer">View All</button>
              </div>
              
              <div className="space-y-4">
                {history.length > 0 ? (
                  history.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3 hover:bg-gray-50 transition">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image src={item.AiImgUrl} alt={item.Name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate text-gray-800">{item.Name}</h4>
                        <p className="text-xs text-gray-500 mt-1 truncate">AI Generated</p>
                      </div>
                      <button
                        onClick={() => setSelectedHistoryItem(item)}
                        className="shrink-0 rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition cursor-pointer"
                      >
                        View
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-6">No history yet.</p>
                )}
              </div>
            </div>
          </section>

          {/* CENTER SECTION */}
          <section className="space-y-7">
            {/* TRY ON MAIN PREVIEW */}
            <div className="card p-6 bg-white rounded-[32px] shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="section-title text-xl font-bold text-gray-800">AI Virtual Try-On</h2>
                  <p className="subtitle mt-1 text-gray-500">Preview generated using your body profile.</p>
                </div>
                {aiResult && !isLoading && <span className="badge-success px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">✓ Generated</span>}
              </div>

              <div className="relative overflow-hidden rounded-[28px] bg-[#F7F4F1] min-h-[400px]">
                {isLoading ? (
                  <div className="flex h-[600px] w-full flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-3" />
                    <p className="font-semibold text-lg text-gray-800 animate-pulse">Generating your AI Cosplay...</p>
                    <p className="text-sm text-gray-500 mt-1">This may take up to a minute.</p>
                  </div>
                ) : (
                  <Image src={aiResult} alt="Generated Preview" width={900} height={900} unoptimized className="h-[600px] w-full object-contain py-2" />
                )}
                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
                  <p className="text-xs font-medium text-primary text-[#c2410c]">AI Generated Preview</p>
                </div>
              </div>

              <div className="mt-6 justify-center">
                <button onClick={handleGenerate} disabled={isLoading || !selectedProduct || !userFile} className="primary-btn w-full cursor-pointer flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition text-lg">
                  {isLoading && <Loader2 className="animate-spin" size={18} />}
                  {isLoading ? "Generating..." : "Click Here to Generate"}
                </button>
              </div>
            </div>

            {/* AI RECOMMENDATION */}
            <div className="card p-5 bg-white rounded-[32px] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4EE] text-2xl">✨</div>
                <div>
                  <h3 className="font-semibold text-gray-800">AI Recommendation</h3>
                  <p className="subtitle mt-2 leading-6 text-sm text-gray-500">Based on your height, weight and measurements, this costume has an excellent fit. The sleeve length and waist proportions closely match your body profile.</p>
                </div>
              </div>
            </div>

            {/* BEFORE & AFTER */}
            <div className="card p-6 bg-white rounded-[32px] shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="section-title text-xl font-bold text-gray-800">Before & After</h2>
                  <p className="subtitle mt-1 text-xs text-gray-500">Compare your original photo with the AI generated preview.</p>
                </div>
                <button 
                  onClick={() => downloadImage(aiResult, `cosfit-tryon-${Date.now()}.png`)} 
                  disabled={isLoading || !aiResult} 
                  className="secondary-btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 px-3.5 py-2 rounded-xl hover:bg-gray-50 transition font-medium text-xs flex items-center gap-1.5 text-gray-700"
                >
                  <Download size={15} /> Download
                </button>
              </div>
              <div className="overflow-hidden rounded-[26px] border border-gray-100">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={userPreview || "https://cdn.fashn.ai/95e99a9c-608e-4eb8-b52e-9380a74b3516/try_on_0.png"} alt="Original" className="object-cover h-[450px] w-full" />}
                  itemTwo={<ReactCompareSliderImage src={aiResult} alt="Generated" className="object-cover h-[450px] w-full" />}
                />
              </div>
            </div>
          </section>

          {/* RIGHT SECTION */}
          <section className="space-y-7">
            {/* SELECTED COSTUME */}
            <div className="card p-5 bg-white rounded-[32px] shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Selected Costume</h3>
                  <p className="subtitle mt-1 text-sm text-gray-500">Ready to Try-On</p>
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
                    <Image src={selectedProduct.imgUrl} alt="Selected Costume" width={500} height={700} unoptimized className="h-[270px] w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                       <button onClick={() => setShowAllProducts(true)} className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-gray-100">
                         Change Product
                       </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.title}</h2>
                    <p className="subtitle text-sm text-gray-500 mt-1">{selectedProduct.theme}</p>
                    
                    <div className="mt-4 bg-gray-50 rounded-xl p-3 flex justify-between items-center border border-gray-100">
                      <span className="text-sm text-gray-500">Size Selected</span>
                      <span className="font-semibold text-sm text-gray-800">{selectedProduct.size}</span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <p className="subtitle text-xs text-gray-500 mb-1">Rental Price</p>
                        <h3 className="text-2xl font-bold text-primary text-[#c2410c]">Rp{selectedProduct.finalPrice.toLocaleString("id-ID")}</h3>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  onClick={() => setShowAllProducts(true)}
                  className={`flex h-[380px] w-full cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm mb-4">
                    <Camera size={24} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-center px-4 text-gray-700">Click to select</h4>
                  <p className="text-sm text-gray-500 text-center px-4 mt-2">choose your product here</p>
                </div>
              )}
            </div>

            {/* CHOOSE PRODUCTS (LIMIT 3) */}
            <div className="card p-5 bg-white rounded-[32px] shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold text-lg text-gray-800">Products</h3>
                <button onClick={() => setShowAllProducts(true)} className="text-sm font-medium text-primary hover:underline cursor-pointer">
                  See More
                </button>
              </div>
              
              <div className="space-y-4">
                {product.slice(0, 3).map((p) => (
                  <div key={p._id} className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3 hover:bg-gray-50 transition">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      <Image src={p.imgUrl} alt={p.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate text-gray-800">{p.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 truncate">Rp{p.finalPrice.toLocaleString("id-ID")}</p>
                    </div>
                    <button
                      onClick={() => handleSelectProduct(p)}
                      className="shrink-0 rounded-lg bg-[#FFF8F6] px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition cursor-pointer"
                    >
                      Select
                    </button>
                  </div>
                ))}
                {product.length === 0 && (
                   <p className="text-sm text-gray-500 text-center py-4">No products found.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function TryOnPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <TryOnContent />
    </Suspense>
  );
}

type MeasureProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function MeasureCard({ icon, title, value }: MeasureProps) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
        {icon}
      </div>
      <p className="text-xs text-gray-500">{title}</p>
      <h4 className="mt-1 font-semibold text-gray-800">{value}</h4>
    </div>
  );
}