import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Camera, Pencil, Ruler, Weight, HeartPulse } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default function TryOnPage() {
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
  return (
    <main className="min-h-screen bg-(--background)">
      {/* nanti navbar */}

      <div className="page-container">
        {/* Breadcrumb */}

        <div className="mb-8 flex items-center gap-3 text-sm">
          <Link
            href="/wishlist"
            className="flex items-center gap-2 text-(--muted) hover:text-(--primary)"
          >
            <ChevronLeft size={16} />
            Wishlist
          </Link>

          <ChevronRight size={15} className="text-(--muted)" />

          <span className="font-medium text-(--primary)">Hu Tao</span>
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

        {/* ========================= */}

        {/* ROW 1 */}

        {/* ========================= */}

        <div className="grid grid-cols-12 gap-7">
          {/* LEFT */}

          <section className="col-span-3 space-y-6">
            {/* ================= */}

            {/* YOUR PHOTO */}

            {/* ================= */}

            <div className="card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Your Photo</h3>

                <Camera size={16} className="text-(--muted)" />
              </div>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/images/body.png"
                  alt="body"
                  width={500}
                  height={700}
                  className="h-[420px] w-full object-cover"
                />

                <button
                  className="
        absolute
        right-4
        top-4
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-white
        shadow-card
      "
                >
                  <Camera size={18} />
                </button>
              </div>

              <button
                className="
      mt-4
      flex
      h-12
      w-full
      items-center
      justify-center
      gap-2
      rounded-2xl
      border
      border-[var(--border)]
      bg-white
      font-medium
      hover:bg-[#FFF8F6]
    "
              >
                <Camera size={18} />
                Change Photo
              </button>
            </div>

            {/* ================= */}

            {/* BODY PROFILE */}

            {/* ================= */}

            <div className="card p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">Your Measurements</h3>

                <button
                  className="
        flex
        items-center
        gap-1
        text-sm
        font-medium
        text-[var(--primary)]
      "
                >
                  <Pencil size={15} />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MeasureCard
                  icon={<Ruler size={16} />}
                  title="Height"
                  value="155 cm"
                />

                <MeasureCard
                  icon={<Weight size={16} />}
                  title="Weight"
                  value="45 kg"
                />

                <MeasureCard
                  icon={<HeartPulse size={16} />}
                  title="Bust"
                  value="84 cm"
                />

                <MeasureCard
                  icon={<HeartPulse size={16} />}
                  title="Waist"
                  value="62 cm"
                />

                <MeasureCard
                  icon={<HeartPulse size={16} />}
                  title="Hip"
                  value="88 cm"
                />

                <MeasureCard
                  icon={<HeartPulse size={16} />}
                  title="Shoulder"
                  value="36 cm"
                />
              </div>
            </div>
          </section>

          {/* CENTER */}

          <section className="col-span-6 space-y-6">
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
                <Image
                  src="/images/generated-preview.png"
                  alt="Generated Preview"
                  width={900}
                  height={900}
                  className="h-[640px] w-full object-cover"
                />

                {/* AI Badge */}

                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 shadow-card backdrop-blur">
                  <p className="text-xs font-medium text-[var(--primary)]">
                    AI Generated Preview
                  </p>
                </div>

                {/* Match Score */}

                <div className="absolute right-5 top-5 rounded-2xl bg-white p-4 shadow-card">
                  <p className="text-xs text-[var(--muted)]">Match Score</p>

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
                <div
                  className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        bg-[#FFF4EE]
      "
                >
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

          <section className="col-span-3 space-y-6">
            {/* ========================== */}
            {/* Selected Costume */}
            {/* ========================== */}

            <div className="card p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Selected Costume</h3>

                  <p className="subtitle mt-1">Ready for rental</p>
                </div>

                <button className="text-sm font-medium text-[var(--primary)] hover:underline">
                  Change
                </button>
              </div>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/images/hutao-card.jpg"
                  alt="Hu Tao"
                  width={500}
                  height={700}
                  className="h-[270px] w-full object-cover"
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

                    <h3 className="text-3xl font-bold text-[var(--primary)]">
                      Rp450.000
                    </h3>

                    <p className="subtitle">/ 3 Days</p>
                  </div>

                  <button className="secondary-btn">View</button>
                </div>
              </div>
            </div>

            {/* ========================== */}
            {/* Rental Information */}
            {/* ========================== */}

            <div className="card p-5">
              <h3 className="mb-5 font-semibold">Rental Information</h3>

              <div className="space-y-4">
                <InfoItem title="Available Size" value="S • M • L" />

                <InfoItem title="Rental Duration" value="3 Days" />

                <InfoItem title="Deposit" value="Rp300.000" />

                <InfoItem title="Condition" value="Excellent" />
              </div>
            </div>

            {/* ========================== */}
            {/* AI Match */}
            {/* ========================== */}

            <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FFF4EE] to-[#FFFDFB] p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                  🤖
                </div>

                <div>
                  <p className="subtitle">AI Match Score</p>

                  <h2 className="text-4xl font-bold text-green-600">95%</h2>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                Based on your uploaded body profile, this costume has an
                excellent fitting recommendation.
              </p>

              <button className="primary-btn mt-6 w-full">
                Rent This Costume
              </button>
            </div>
          </section>
        </div>

        {/* ========================= */}

        {/* ROW 2 */}

        {/* ========================= */}

        <div className="mt-8 grid grid-cols-12 gap-7">
          <section className="col-span-8 space-y-6">
            {/* ========================= */}
            {/* Before & After */}
            {/* ========================= */}

            <div className="card p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="section-title">Before & After</h2>

                  <p className="subtitle mt-1">
                    Compare your original photo with the AI generated preview.
                  </p>
                </div>

                <button className="secondary-btn">Download</button>
              </div>

              <div className="overflow-hidden rounded-[28px]">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src="https://cdn.fashn.ai/95e99a9c-608e-4eb8-b52e-9380a74b3516/try_on_0.png"
                      alt="Original"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src="https://cdn.fashn.ai/0aac3b42-e9ae-4282-bfb7-c5f1ae0b5db5/try_on_0.png"
                      alt="Generated"
                    />
                  }
                />
              </div>
            </div>
          </section>

          <section className="col-span-4 space-y-6">
            {/* ====================== */}
            {/* Generation History */}
            {/* ====================== */}

            <div className="card p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Generation History</h3>

                  <p className="subtitle mt-1">Recent AI previews</p>
                </div>

                <button className="text-sm text-[var(--primary)] hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="group flex cursor-pointer gap-3 rounded-2xl p-2 transition hover:bg-[#FCFBFA]"
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

            <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FFF4EE] to-[#FFFDFB] p-6 shadow-card">
              <h3 className="text-xl font-semibold">Want another look?</h3>

              <p className="subtitle mt-2">
                Try another costume from your wishlist.
              </p>

              <button className="primary-btn mt-6 w-full">
                Generate New Try-On
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
    <div
      className="
      rounded-2xl
      bg-[#FCFBFA]
      p-4
    "
    >
      <div
        className="
        mb-3
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-xl
        bg-white
        text-[var(--primary)]
      "
      >
        {icon}
      </div>

      <p className="text-xs text-(--muted)">{title}</p>

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
    <div className="flex items-center justify-between rounded-2xl bg-[#FCFBFA] p-4">
      <span className="subtitle">{title}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}
