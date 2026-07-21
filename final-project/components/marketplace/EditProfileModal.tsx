"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { X, Eye, EyeOff, User, MapPin, Mail, Lock } from "lucide-react";
import { GetUserProfile } from "@/app/types";

type Props = {
  open: boolean;
  onClose: () => void;
  profile?: GetUserProfile;
};

export default function EditProfileModal({
  open,
  onClose,
  profile,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    address: "",
    photo: "",
    password: "",
  });

  useEffect(() => {
    if (!profile) return;

    setForm({
      username: profile.userId?.[0]?.username ?? "",
      email: profile.userId?.[0]?.email ?? "",
      address: profile.address ?? "",
      photo: profile.photo ?? "",
      password: "",
    });
  }, [profile]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", close);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-in fade-in zoom-in-95 w-full max-w-2xl overflow-hidden rounded-[32px] border border-[#efe4db] bg-white shadow-[0_30px_90px_rgba(177,71,68,.15)] duration-200"
      >
        {/* Header */}

        <div className="flex items-start justify-between border-b border-[#f3ebe4] px-8 py-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#1f1a17]">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-muted">
              Keep your profile information up to date.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[#FFF4EE]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="max-h-[70vh] overflow-y-auto px-8 py-7">
          <div className="mb-8 flex flex-col items-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#FFE7D8] shadow-lg">
              <Image
                src={
                  form.photo.trim()
                    ? form.photo
                    : "/images/profile/profile.png"
                }
                alt="avatar"
                fill
                className="object-cover"
              />
            </div>

            <p className="mt-3 text-sm text-muted">
              Preview Profile Picture
            </p>
          </div>

          <div className="space-y-5">
            {/* Image */}

            <Input
              label="Profile Image URL"
              icon={<User size={18} />}
              value={form.photo}
              onChange={(v) => setForm({ ...form, photo: v })}
              placeholder="https://..."
            />

            {/* Username */}

            <Input
              label="Username"
              icon={<User size={18} />}
              value={form.username}
              onChange={(v) => setForm({ ...form, username: v })}
              placeholder="Username"
            />

            {/* Email */}

            <Input
              label="Email"
              icon={<Mail size={18} />}
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="Email"
            />

            {/* Address */}

            <Input
              label="Address"
              icon={<MapPin size={18} />}
              value={form.address}
              onChange={(v) => setForm({ ...form, address: v })}
              placeholder="Address"
            />

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#433934]">
                New Password
              </label>

              <div className="flex h-12 items-center rounded-xl border border-[#efe4db] bg-[#FCFAF8] px-4 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                <Lock size={18} className="mr-3 text-muted" />

                <input
                  type={showPassword ? "text" : "password"}
                  className="flex-1 bg-transparent outline-none"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  placeholder="Leave blank to keep current password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-[#f3ebe4] px-8 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#efe4db] px-5 py-2.5 font-medium transition hover:bg-[#faf7f4]"
          >
            Cancel
          </button>

          <button
            className="rounded-xl bg-primary px-6 py-2.5 font-medium text-white transition hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

type InputProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>> | ((v: string) => void);
};

function Input({
  label,
  icon,
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#433934]">
        {label}
      </label>

      <div className="flex h-12 items-center rounded-xl border border-[#efe4db] bg-[#FCFAF8] px-4 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        <span className="mr-3 text-muted">{icon}</span>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none"
        />
      </div>
    </div>
  );
}