"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { X, MapPin, Upload, Loader2 } from "lucide-react";
import { GetUserProfile } from "@/app/types";

type Props = {
  open: boolean;
  onClose: () => void;
  profile?: GetUserProfile;
  onUpdateImg: (file: File) => Promise<void>;
  onUpdateAddress: (address: string) => Promise<void>;
};

export default function EditProfileModal({
  open,
  onClose,
  profile,
  onUpdateImg,
  onUpdateAddress,
}: Props) {
  const [address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // State khusus untuk preview UI saja
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); 
  
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state tiap modal dibuka/profile berubah
  useEffect(() => {
    if (!profile) return;
    setAddress(profile.address ?? "");
    setSelectedFile(null);
    setPreviewUrl(null); 
  }, [profile, open]);

  // Cleanup Object URL untuk mencegah memory leak
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };

    if (open) {
      document.addEventListener("keydown", close);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose, isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Menyimpan File asli untuk dikirim ke backend
      setPreviewUrl(URL.createObjectURL(file)); // Membuat URL sementara HANYA untuk preview UI
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const promises = [];

      // Update address if changed
      if (address !== (profile?.address ?? "")) {
        promises.push(onUpdateAddress(address));
      }

      // Update image jika ada file baru yang dipilih
      if (selectedFile) {
        promises.push(onUpdateImg(selectedFile)); 
      }

      if (promises.length > 0) {
        await Promise.all(promises);
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm"
      onClick={() => !isLoading && onClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-in fade-in zoom-in-95 w-full max-w-xl overflow-hidden rounded-[32px] border border-[#efe4db] bg-white shadow-[0_30px_90px_rgba(177,71,68,.15)] duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#f3ebe4] px-8 py-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#1f1a17]">
              Edit Profile
            </h2>
            <p className="mt-1 text-sm text-muted">
              Update your photo and delivery address.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[#FFF4EE] disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-8 py-7">
          <div className="mb-8 flex flex-col items-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#FFE7D8] shadow-lg">
              <Image
                // Logika Prioritas Tampilan:
                // 1. previewUrl (jika user baru saja milih foto)
                // 2. profile?.photo (foto dari database jika belum diganti)
                // 3. foto default (jika belum pernah upload)
                src={previewUrl || profile?.photo || "/images/profile/profile.png"}
                alt="avatar"
                fill
                className="object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              className="mt-4 flex items-center gap-2 rounded-xl border border-[#efe4db] px-4 py-2 text-sm font-medium text-[#433934] transition hover:bg-[#FCFAF8]"
            >
              <Upload size={16} />
              Choose new photo
            </button>
            
            {/* Indikator file berhasil dipilih */}
            {selectedFile ? (
              <p className="mt-2 text-xs font-medium text-primary">
                Ready to upload: {selectedFile.name}
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted">
                JPG, PNG or WEBP. Max 2MB.
              </p>
            )}
          </div>

          <div className="space-y-5">
            {/* Address Input */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#433934]">
                Address
              </label>

              <div className="flex items-center rounded-xl border border-[#efe4db] bg-[#FCFAF8] px-4 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                <span className="mr-3 text-muted">
                  <MapPin size={18} />
                </span>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full address"
                  className="min-h-[100px] w-full flex-1 resize-none bg-transparent py-3 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#f3ebe4] px-8 py-5">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl border border-[#efe4db] px-5 py-2.5 font-medium transition hover:bg-[#faf7f4] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}