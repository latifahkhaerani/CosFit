import { User, Mail, Lock, Eye, Sparkles } from "lucide-react";

export default function RegisterForm() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[var(--background)] p-10">
      <div className="w-full max-w-2xl rounded-[32px] bg-white p-12 shadow-xl">
        {/* Header */}

        <div className="mb-10">
          <h1 className="flex items-center gap-2 text-5xl font-bold text-[var(--text)]">
            Create Your Account
            <Sparkles size={28} className="text-[var(--accent)]" />
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            Join thousands of cosplayers in the CosFit community.
          </p>
        </div>

        {/* Username */}

        <div className="mb-6">
          <label className="mb-2 block font-medium text-[var(--text)]">
            Username
          </label>

          <div className="flex h-14 items-center rounded-2xl border border-[var(--border)] px-4">
            <User size={20} className="text-gray-400" />

            <input
              type="text"
              placeholder="Enter your username"
              className="ml-3 w-full bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Email */}

        <div className="mb-6">
          <label className="mb-2 block font-medium text-[var(--text)]">
            Email
          </label>

          <div className="flex h-14 items-center rounded-2xl border border-[var(--border)] px-4">
            <Mail size={20} className="text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              className="ml-3 w-full bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Password */}

        <div className="mb-6">
          <label className="mb-2 block font-medium text-[var(--text)]">
            Password
          </label>

          <div className="flex h-14 items-center rounded-2xl border border-[var(--border)] px-4">
            <Lock size={20} className="text-gray-400" />

            <input
              type="password"
              placeholder="Create a password"
              className="ml-3 w-full bg-transparent outline-none placeholder:text-gray-400"
            />

            <Eye size={20} className="text-gray-400" />
          </div>
        </div>

        {/* Confirm Password */}

        <div className="mb-8">
          <label className="mb-2 block font-medium text-[var(--text)]">
            Confirm Password
          </label>

          <div className="flex h-14 items-center rounded-2xl border border-[var(--border)] px-4">
            <Lock size={20} className="text-gray-400" />

            <input
              type="password"
              placeholder="Confirm your password"
              className="ml-3 w-full bg-transparent outline-none placeholder:text-gray-400"
            />

            <Eye size={20} className="text-gray-400" />
          </div>
        </div>

        {/* Role */}

        <div className="mb-8">
          <p className="mb-4 font-medium text-[var(--text)]">
            I want to register as
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="cursor-pointer rounded-3xl border-2 border-[var(--primary)] bg-[#FFF8F6] p-6 transition">
              <div className="mb-3 flex justify-center">
                <User size={30} className="text-[var(--primary)]" />
              </div>

              <h3 className="text-center text-xl font-semibold">User</h3>

              <p className="mt-2 text-center text-sm text-gray-500">
                I want to rent costumes and try them on.
              </p>
            </div>

            <div className="cursor-pointer rounded-3xl border border-[var(--border)] p-6 transition hover:border-[var(--primary)]">
              <div className="mb-3 flex justify-center">🏪</div>

              <h3 className="text-center text-xl font-semibold">Vendor</h3>

              <p className="mt-2 text-center text-sm text-gray-500">
                I want to list my costumes and reach more customers.
              </p>
            </div>
          </div>
        </div>

        {/* Terms */}

        <div className="mb-8 flex items-start gap-3">
          <input type="checkbox" className="mt-1 accent-[var(--primary)]" />

          <p className="text-sm text-gray-500">
            I agree to the
            <span className="mx-1 text-[var(--primary)]">Terms of Service</span>
            and
            <span className="ml-1 text-[var(--primary)]">Privacy Policy</span>
          </p>
        </div>

        {/* Button */}

        <button className="mb-8 h-14 w-full rounded-2xl bg-[var(--primary)] text-lg font-semibold text-white transition hover:opacity-90">
          Register Now ✨
        </button>

        {/* Divider */}

        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-[var(--border)]" />

          <span className="text-sm text-gray-400">or register with</span>

          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        {/* Social */}

        <div className="grid grid-cols-3 gap-4">
          <button className="rounded-2xl border border-[var(--border)] py-3 font-medium">
            Google
          </button>

          <button className="rounded-2xl border border-[var(--border)] py-3 font-medium">
            Discord
          </button>

          <button className="rounded-2xl border border-[var(--border)] py-3 font-medium">
            GitHub
          </button>
        </div>
      </div>
    </section>
  );
}
