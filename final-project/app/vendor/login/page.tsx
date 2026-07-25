import Image from "next/image";
import {
  Check,
  HelpCircle,
  Shirt,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import LoginVendorForm from "@/components/LoginVendorForm";

export default function VendorLoginPage() {


  const features = [
    "Inventory Management",
    "AI Virtual Try-On Integration",
    "Rental Request Management",
    "Vendor Analytics",
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "500+",
      label: "Rental Vendors",
    },
    {
      icon: <Shirt className="w-6 h-6" />,
      value: "20K+",
      label: "Costumes Listed",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      value: "100K+",
      label: "Virtual Try-Ons",
    },
  ];

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/vendor/vendor-login.png"
          alt="Cosplay"
          fill
          priority
          className="object-cover object-left"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col justify-between h-full p-16 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 fill-white" />
            <h1 className="text-5xl font-bold font-[Poppins]">
              CosFit
            </h1>
          </div>

          {/* Hero */}
          <div className="max-w-xl space-y-8">
            <h2 className="text-7xl font-bold leading-tight font-[Poppins]">
              Grow Your
              <br />
              Cosplay Rental
              <br />
              Business.
            </h2>

            <p className="text-xl text-white/90 leading-9">
              Manage your costumes, receive rental requests,
              and reach thousands of cosplayers through
              CosFit.
            </p>

            {/* Features */}
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 w-[420px] space-y-6">
              {features.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-(--primary) flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>

                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 flex items-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-(--accent)/20 flex items-center justify-center">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-4xl font-bold">
                    {item.value}
                  </h3>

                  <p className="text-white/80">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT */}
      <section className="bg-[#FBF8F5] flex flex-col">
        {/* Top */}
        <div className="flex justify-end p-10">
          <button className="flex items-center gap-2 text-sm">
            Need help?
            <HelpCircle className="w-4 h-4 text-(--primary)" />
            <span className="text-(--primary)">
              Contact Support
            </span>
          </button>
        </div>

        {/* Card */}
        <div className="flex-1 flex items-center justify-center px-12 pb-16">
          <div className="w-full max-w-xl rounded-[40px] bg-white shadow-xl p-14">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-8">
                <Store className="w-12 h-12 text-(--primary)" />
              </div>

              <h2 className="text-5xl font-bold font-[Poppins]">
                Vendor Login
              </h2>

              <p className="text-gray-500 mt-4 text-lg">
                Sign in to manage your cosplay rental
                store.
              </p>
            </div>

            <LoginVendorForm/>
          </div>
        </div>
      </section>
    </main>
  );
}