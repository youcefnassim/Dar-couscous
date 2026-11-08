"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Renseignement général",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-cream-50/40 min-h-screen py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-olive font-bold">
            À votre écoute
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-darkbrown">
            Contactez la Maison DAR COUSCOUS
          </h1>
          <p className="text-sm text-darkbrown/70 max-w-lg mx-auto">
            Une question sur votre commande, une demande traiteur pour un événement ou un partenariat ? Écrivez-nous.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-cream-200 p-6 shadow-sm space-y-5">
              <h2 className="font-serif text-xl font-bold text-darkbrown border-b border-cream-200 pb-3">
                Atelier Parisien
              </h2>

              <div className="flex items-start gap-3.5 text-xs text-darkbrown">
                <div className="p-2 rounded bg-cream-100 text-terracotta shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block font-serif text-sm">Adresse de l&apos;Atelier</strong>
                  <span>24 Rue Léon Frot<br />75011 Paris, France</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-darkbrown">
                <div className="p-2 rounded bg-cream-100 text-terracotta shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block font-serif text-sm">Téléphone</strong>
                  <span>01 42 00 24 50</span>
                  <p className="text-darkbrown/60 text-[11px] mt-0.5">Du lundi au dimanche, 9h - 20h</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-darkbrown">
                <div className="p-2 rounded bg-cream-100 text-terracotta shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block font-serif text-sm">Email direct</strong>
                  <span>bonjour@darcouscous.fr</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-darkbrown">
                <div className="p-2 rounded bg-cream-100 text-terracotta shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block font-serif text-sm">Horaires de Livraison</strong>
                  <span>Déjeuner : 11h30 - 14h00<br />Dîner : 18h30 - 21h30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-cream-200 p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-olive/15 text-olive flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-darkbrown">
                  Message envoyé avec succès
                </h3>
                <p className="text-xs text-darkbrown/70 max-w-sm mx-auto">
                  Merci {formData.name}, notre équipe vous répondra dans un délai de 24 heures ouvrées.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-darkbrown border-b border-cream-200 pb-3">
                  Envoyez-nous un message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-darkbrown block mb-1">
                      Votre nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jean Dupont"
                      className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-darkbrown block mb-1">
                      Votre adresse email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jean.dupont@email.com"
                      className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-darkbrown block mb-1">
                    Objet de votre demande *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                  >
                    <option value="Renseignement général">Renseignement général</option>
                    <option value="Suivi de commande">Suivi de commande en cours</option>
                    <option value="Traiteur événementiel">Traiteur d&apos;entreprise / Événement</option>
                    <option value="Allergènes & Ingrédients">Question sur les ingrédients ou allergènes</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-darkbrown block mb-1">
                    Votre message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-md text-xs font-semibold hover:bg-terracotta-hover transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer ma demande</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

