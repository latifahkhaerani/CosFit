"use client";

import { GetProduct } from "@/app/types";
import {
  CalendarDays,
  Coins,
  Package2,
  Boxes,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductInfoCard({product}: {product: GetProduct}) {

  // const [imgUrl, setImgUrl] = useState<File | string>("")
  const [isEdit, setIsEdit] = useState(false)
  const [desc, setDesc] = useState(product.desc)
  const [size, setSize] = useState(product.size)
  const [theme, setTheme] = useState(product.theme)
  const [title, setTitle] = useState(product.title)
  const [originalPrice, setOriginalPrice] = useState(product.originalPrice)
  const [stock, setStock] = useState(product.stock)
  const [discount, setDiscount] = useState(product.discount)

  useEffect(() => {
    console.log(isEdit);
  }, [isEdit])

  return (
    <section className="card p-7">

      <button className="secondary-btn" onClick={() => {setIsEdit(true)}}>Edit</button>
      {/* Header */}

      <div className="mb-8">

        <h2 className="card-title">
          Product Information
        </h2>

        <p className="card-subtitle">
          Rental settings and size specifications.
        </p>

      </div>

      {/* Information */}
      {!isEdit? (
        <div className="space-y-5">

          <InfoItem
            icon={<Coins size={18} />}
            title="Original Price"
            value={originalPrice + ""}
          />

          <InfoItem
            icon={<CalendarDays size={18} />}
            title="Minimum Rental"
          />

          <InfoItem
            icon={<Package2 size={18} />}
            title="Deposit"
            value="Rp 1.000.000"
          />

          <InfoItem
            icon={<Boxes size={18} />}
            title="Current Stock"
            value="2 Sets"
          />

          <InfoItem
            icon={<UserCheck size={18} />}
            title="Currently Rented"
            value="1 Set"
          />

        </div>

      ): (
        <div>

        </div>
      )}

    </section>
  );
}

/* -------------------------- */

function InfoItem({
  icon,
  title,
  value,
  subtitle,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl p-3 transition hover:bg-[#FCFBFA]">

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF5F0] text-[var(--primary)]">

          {icon}

        </div>

        <div>

          <p className="text-sm text-[var(--muted)]">

            {title}

          </p>

        </div>

      </div>

      {badge ? (
        <span className="badge-success">

          {badge}

        </span>
      ) : (
        <div className="text-right">

          <h4 className="font-semibold">

            {value}

          </h4>

          {subtitle && (
            <p className="text-xs text-[var(--muted)]">

              {subtitle}

            </p>
          )}

        </div>
      )}
    </div>
  );
}
