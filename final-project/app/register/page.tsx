import RegisterForm from "@/components/RegisterForm";
import RegisterHero from "@/components/RegisterHero";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Right Side */}
      <RegisterForm />
      {/* Left Side */}
      <RegisterHero />

    </main>
  );
}
