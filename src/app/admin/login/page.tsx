"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check credentials provided by user:
    // Email: admin@darcouscous.com
    // Password: Darcouscous31@
    if (cleanEmail === "admin@darcouscous.com" && cleanPassword === "Darcouscous31@") {
      // Set secure cookie and localStorage
      if (typeof window !== "undefined") {
        document.cookie = "dar_admin_session=authenticated; path=/; max-age=604800; SameSite=Lax";
        localStorage.setItem("dar_admin_auth", "true");
        localStorage.setItem("dar_admin_email", cleanEmail);
      }
      setTimeout(() => {
        router.push("/admin");
      }, 400);
    } else {
      setIsLoading(false);
      setError("Identifiants incorrects. Veuillez vérifier l'email et le mot de passe.");
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-cream-200 shadow-xl p-8 space-y-6">
        {/* Brand Logo & Header */}
        <div className="text-center space-y-3">
          <div className="relative h-20 w-36 mx-auto">
            <Image
              src="/images/logo.png"
              alt="DAR COUSCOUS"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-darkbrown">
              Espace Direction Atelier
            </h1>
            <p className="text-xs text-darkbrown/60 mt-1">
              Connexion sécurisée réservée aux administrateurs de la marque.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-darkbrown block mb-1">
              Adresse email administrateur
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-darkbrown/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@darcouscous.com"
                className="w-full pl-9 pr-3 py-2.5 bg-cream-50/50 border border-cream-200 rounded-md text-xs text-darkbrown focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-darkbrown block mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-darkbrown/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-cream-50/50 border border-cream-200 rounded-md text-xs text-darkbrown focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-terracotta text-white rounded-md text-xs font-semibold hover:bg-terracotta-hover transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70"
          >
            <span>{isLoading ? "Vérification en cours..." : "Accéder au Tableau de Bord"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security badge & public site link */}
        <div className="pt-4 border-t border-cream-200 flex flex-col items-center space-y-2 text-center text-[11px] text-darkbrown/60">
          <div className="flex items-center gap-1.5 text-olive font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Accès chiffré SSL 256 bits</span>
          </div>
          <Link
            href="/"
            className="hover:text-terracotta transition-colors underline underline-offset-4"
          >
            ← Retourner sur le site client
          </Link>
        </div>
      </div>
    </div>
  );
}

