import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Check,
  Eye,
  Globe,
  Lock,
  Mail,
  Phone,
  TrendingUp,
  User,
  Users,
  ArrowRight,
} from "lucide-react";

import { BiCloset } from "react-icons/bi";
import { poppins } from "@/app/layout";

export default function VendorRegisterPage() {
  const features = [
    "Upload Unlimited Costumes",
    "AI Virtual Try-On Ready",
    "Rental Management",
    "Customer Orders",
    "Analytics Dashboard",
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "500+",
      label: "Partners",
    },
    {
      icon: <BiCloset className="text-2xl" />,
      value: "20K+",
      label: "Costumes",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: "50K+",
      label: "Monthly Visitors",
    },
  ];

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-[#F9F6F3]">

      {/* LEFT */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/vendor/vendor-register.png"
          alt="Vendor"
          fill
          priority
          sizes="100vw"
          unoptimized
          className="object-cover object-left"
        />

        <div
        className="absolute top-0 left-0 w-2/3 h-1/2 bg-white/30 backdrop-blur-md"
        style={{
            WebkitMaskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%)",
            maskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full p-12">

          {/* Logo */}

          <div>
            <h1 className="text-5xl font-bold text-(--primary)">
              ✦ CosFit
            </h1>

            <p className={`uppercase tracking-[4px] text-gray-500 mt-2 text-sm`}>
              AI-Powered Cosplay Rental Marketplace
            </p>
          </div>

          {/* Hero */}

          <div className="max-w-xl">

            <h2 className="text-7xl font-bold leading-tight">
              Start Growing Your
              <span className="block text-(--primary)">
                Cosplay Rental
              </span>
              Business
            </h2>

            <p className="mt-8 text-xl text-gray-700 leading-7">
              Reach thousands of cosplayers and let AI
              help customers preview your costumes before renting.
            </p>

            {/* Feature Card */}

            <div className="mt-12 w-[360px] rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-xl p-8">

              <div className="space-y-6">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-(--accent) flex items-center justify-center">
                      <Check className="text-white w-5 h-5" />
                    </div>

                    <span className="text-lg">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-5">

            {stats.map((stat) => (

              <div
                key={stat.label}
                className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-lg p-7 flex items-center gap-5"
              >

                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  {stat.icon}
                </div>

                <div>

                  <h3 className="text-4xl font-bold">
                    {stat.value}
                  </h3>

                  <p className="text-gray-500">
                    {stat.label}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* RIGHT */}

      <section className="flex flex-col">

        {/* Top */}

        <div className="flex justify-end p-10">

          <div className="flex items-center gap-2 text-gray-500">

            <BadgeCheck className="text-green-600 w-5 h-5" />

            <span>Your business is safe with us</span>

          </div>

        </div>

        {/* Register Card */}

        <div className="flex-1 flex justify-center items-center px-10 pb-10">

          <div className="bg-white rounded-[36px] shadow-xl w-full max-w-3xl p-14">

            <div className="text-center">

              <h2 className="text-5xl font-bold">
                Become a CosFit Vendor
              </h2>

              <p className="text-gray-500 mt-4 text-lg">
                Create your rental business account.
              </p>

            </div>

            {/* Form */}

            <form className="mt-12 space-y-7">

              <div className="grid md:grid-cols-2 gap-6">

                <Input
                  label="Business Name"
                  icon={<Building2 />}
                  placeholder="Enter your business name"
                />

                <Input
                  label="Owner Name"
                  icon={<User />}
                  placeholder="Enter owner full name"
                />

                <Input
                  label="Business Email"
                  icon={<Mail />}
                  placeholder="you@yourbusiness.com"
                />

                <Input
                  label="Phone Number"
                  icon={<Phone />}
                  placeholder="+62 812 3456 7890"
                />

              </div>

              <Input
                label="Website / Instagram"
                icon={<Globe />}
                placeholder="https://instagram.com/yourbusiness"
              />

              <div className="grid md:grid-cols-2 gap-6">

                <PasswordInput
                  label="Password"
                  placeholder="Create a strong password"
                />

                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                />

              </div>

              <label className="flex items-center gap-3">

                <input type="checkbox" />

                <span className="text-gray-600">
                  I agree to the CosFit
                  <span className="text-red-600">
                    {" "}Vendor Terms of Service
                  </span>
                  {" "}and{" "}
                  <span className="text-red-600">
                    Privacy Policy
                  </span>
                </span>

              </label>

              <button className="w-full h-16 bg-(--primary) rounded-xl text-white font-semibold text-xl flex justify-center items-center gap-3">
                Create Vendor Account
                <ArrowRight />
              </button>

              <div className="flex items-center gap-4">

                <div className="flex-1 h-px bg-gray-200" />

                <span className="text-gray-400">
                  or continue with
                </span>

                <div className="flex-1 h-px bg-gray-200" />

              </div>

              <button
                type="button"
                className="w-full h-16 rounded-xl border text-lg"
              >
                Continue with Google
              </button>

              <p className="text-center text-gray-600">

                Already have a Vendor Account?

                <button
                  type="button"
                  className="ml-2 text-red-600 font-semibold inline-flex items-center gap-2"
                >
                  Login
                  <ArrowRight className="w-4 h-4" />
                </button>

              </p>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

function Input({
  label,
  placeholder,
  icon,
}: {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label className="block mb-3 font-medium">
        {label}
      </label>

      <div className="h-14 border rounded-xl px-4 flex items-center gap-3">
        {icon}
        <input
          className="flex-1 outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function PasswordInput({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block mb-3 font-medium">
        {label}
      </label>

      <div className="h-14 border rounded-xl px-4 flex items-center gap-3">
        <Lock className="w-5 h-5 text-gray-400" />

        <input
          type="password"
          className="flex-1 outline-none"
          placeholder={placeholder}
        />

        <Eye className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}