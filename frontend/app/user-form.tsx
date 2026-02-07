"use client";

import { useState, FormEvent } from "react";
import { signIn, createUser } from "@/lib/api";
import type { User } from "@/lib/api";

type Mode = "signin" | "create";

export default function UserForm({
  onSuccess,
}: {
  onSuccess: (user: User) => void;
}) {
  const [mode, setMode] = useState<Mode>("create");
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setError("");
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }
    setLoading(true);
    try {
      const user = await signIn(trimmedName);
      onSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateAccount(e: FormEvent) {
    e.preventDefault();
    setError("");
    const trimmedName = name.trim();
    const trimmedZip = zip.trim();
    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }
    if (!trimmedZip) {
      setError("Please enter your zip code.");
      return;
    }
    setLoading(true);
    try {
      const user = await createUser(trimmedName, trimmedZip);
      onSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(m: Mode) {
    setMode(m);
    setError("");
    if (m === "signin") setZip("");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0] px-4 py-12">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-[#22c55e]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-[#15803d]/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[400px] animate-fade-in">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#15803d] text-2xl text-white shadow-lg shadow-[#15803d]/30">
            🌱
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#14532d]">
            R U Kind
          </h1>
          <p className="mt-2 text-lg font-medium text-[#166534]">
            Best deeds in your community
          </p>
          <p className="mt-1 text-sm text-[#166534]/80">
            Sustainability · Community · Kindness
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border-2 border-[#bbf7d0] bg-white shadow-xl shadow-[#15803d]/10">
          <div className="flex border-b border-[#bbf7d0] bg-[#f0fdf4]/50 p-1.5">
            <button
              type="button"
              onClick={() => switchMode("create")}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                mode === "create"
                  ? "bg-[#15803d] text-white shadow-md"
                  : "text-[#166534] hover:bg-[#dcfce7]"
              }`}
            >
              Create account
            </button>
            <button
              type="button"
              onClick={() => switchMode("signin")}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                mode === "signin"
                  ? "bg-[#15803d] text-white shadow-md"
                  : "text-[#166534] hover:bg-[#dcfce7]"
              }`}
            >
              Sign in
            </button>
          </div>

          <form
            onSubmit={mode === "signin" ? handleSignIn : handleCreateAccount}
            className="flex flex-col gap-5 p-6"
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-[#166534]">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jane Smith"
                className="w-full rounded-xl border-2 border-[#bbf7d0] bg-[#f0fdf4]/50 px-4 py-3 text-[#14532d] placeholder-[#166534]/50 focus:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30"
                autoComplete="name"
              />
            </div>

            {mode === "create" && (
              <div>
                <label htmlFor="zip" className="mb-1.5 block text-sm font-bold text-[#166534]">
                  Zip code
                </label>
                <input
                  id="zip"
                  type="text"
                  inputMode="numeric"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="e.g. 77004"
                  className="w-full rounded-xl border-2 border-[#bbf7d0] bg-[#f0fdf4]/50 px-4 py-3 text-[#14532d] placeholder-[#166534]/50 focus:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30"
                  autoComplete="postal-code"
                />
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 rounded-xl bg-[#15803d] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#15803d]/25 transition hover:bg-[#166534] focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Please wait…
                </span>
              ) : (
                mode === "signin" ? "Sign in" : "Create account"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm font-medium text-[#166534]/80">
          Join your neighbors in making a difference.
        </p>
      </div>
    </div>
  );
}
