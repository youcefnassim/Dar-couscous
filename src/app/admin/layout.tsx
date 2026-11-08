"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Package,
  Boxes,
  Truck,
  Users,
  Tag,
  BarChart3,
  Settings,
  ExternalLink,
  ChefHat,
  LogOut,
  ShieldCheck
} from "lucide-react";

const navigationItems = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/products", label: "Plats & Produits", icon: UtensilsCrossed },
  { href: "/admin/orders", label: "Commandes", icon: Package },
  { href: "/admin/inventory", label: "Stocks & Traçabilité", icon: Boxes },
  { href: "/admin/delivery", label: "Livraison & Zones", icon: Truck },
  { href: "/admin/customers", label: "Clients", icon: Users },
  { href: "/admin/promotions", label: "Codes Promo", icon: Tag },
  { href: "/admin/analytics", label: "Statistiques", icon: BarChart3 },
  { href: "/admin/settings", label: "Paramètres Atelier", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check authentication
    const hasAuth =
      typeof window !== "undefined" &&
      (localStorage.getItem("dar_admin_auth") === "true" ||
        document.cookie.includes("dar_admin_session=authenticated"));

    if (hasAuth) {
      setIsAuthenticated(true);
    } else if (pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dar_admin_auth");
      localStorage.removeItem("dar_admin_email");
      document.cookie = "dar_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  // If on login page, render clean login card without admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading state while checking auth
  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-darkbrown/60">Vérification des accès atelier...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50/50 flex">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-darkbrown text-cream-100 flex-shrink-0 flex flex-col border-r border-darkbrown-light hidden md:flex">
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative h-11 w-20 bg-white/95 rounded p-1 shadow-sm">
              <Image
                src="/images/logo.png"
                alt="DAR COUSCOUS"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-white block">
                DAR COUSCOUS
              </span>
              <span className="text-[10px] text-terracotta uppercase font-bold tracking-wider">
                Espace Direction
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? "bg-terracotta text-white shadow-sm font-semibold"
                    : "text-cream-100/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Public Site Link & Atelier Info */}
        <div className="p-4 border-t border-white/10 space-y-2.5">
          <div className="bg-white/5 p-2.5 rounded text-[11px] text-cream-200">
            <div className="flex items-center gap-1.5 text-olive-200 font-bold mb-0.5">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Atelier Paris 11e</span>
            </div>
            <span>Chaîne du froid certifiée (0-4°C)</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded bg-white/10 hover:bg-white/15 text-xs text-white transition-colors"
          >
            <span>Boutique client</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3 py-2 rounded text-xs text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors"
          >
            <span>Déconnexion</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-cream-200 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-olive uppercase tracking-wider bg-olive/10 px-2 py-0.5 rounded">
              Supervision Atelier
            </span>
            <span className="text-xs text-darkbrown/60 hidden sm:inline">
              • Paris Intra-muros &amp; Petite Couronne
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-olive font-medium bg-cream-50 px-3 py-1 rounded border border-cream-200">
              <ShieldCheck className="w-4 h-4" />
              <span>Session Admin Sécurisée</span>
            </div>

            <div className="flex items-center gap-2 border-l border-cream-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-darkbrown text-white font-bold text-xs flex items-center justify-center">
                DC
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold text-darkbrown block leading-tight">
                  admin@darcouscous.com
                </span>
                <span className="text-[10px] text-darkbrown/60">Responsable Direction</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
