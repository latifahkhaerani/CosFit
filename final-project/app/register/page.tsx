import RegisterForm from "@/components/RegisterForm";
import RegisterHero from "@/components/RegisterHero";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <RegisterHero />

      {/* Right Side */}
      <RegisterForm />
    </main>
  );
}
