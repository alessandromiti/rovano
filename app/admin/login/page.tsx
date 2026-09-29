"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      setError("Email o password non corrette.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f0e8] px-5 text-[#1b1b17]">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="font-display text-4xl uppercase tracking-[0.15em]">
            Rovano
          </p>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#a58a62]">
            Area amministrativa
          </p>
        </div>

        <div className="border border-black/10 bg-white/30 p-7 md:p-10">
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#77766f]">
              Accesso
            </p>

            <h1 className="font-display mt-3 text-4xl">
              Bentornato.
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#77766f]">
              Accedi al pannello amministrativo di Rovano.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="admin@rovano.it"
                className="h-14 w-full border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30 transition-colors focus:border-[#a58a62]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="h-14 w-full border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30 transition-colors focus:border-[#a58a62]"
              />
            </div>

            {error && (
              <div className="border border-red-900/20 bg-red-900/5 px-4 py-4 text-sm text-red-900">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[56px] w-full items-center justify-center border border-[#20251f] bg-[#20251f] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3f0e8] transition-all duration-300 hover:bg-transparent hover:text-[#20251f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Accesso in corso..." : "Accedi"}
            </button>
          </form>

          <div className="mt-8 border-t border-black/10 pt-6 text-center">
            <a
              href="/"
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#77766f] transition-colors hover:text-[#1b1b17]"
            >
              ← Torna al sito
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}