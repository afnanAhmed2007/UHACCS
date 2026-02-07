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
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 px-4 text-zinc-100">
      <h1 className="text-2xl font-semibold">UHACCS</h1>
      <p className="text-zinc-400">Best deeds in your community</p>

      <div className="w-full max-w-sm">
        <div className="flex rounded-t-lg border border-b-0 border-zinc-700 bg-zinc-900/50 p-1">
          <button
            type="button"
            onClick={() => switchMode("create")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "create"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Create account
          </button>
          <button
            type="button"
            onClick={() => switchMode("signin")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "signin"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sign in later
          </button>
        </div>

        <form
          onSubmit={mode === "signin" ? handleSignIn : handleCreateAccount}
          className="flex flex-col gap-4 rounded-b-lg border border-zinc-700 bg-zinc-900 p-6 shadow"
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-300">
              Full name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Smith"
              className="w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoComplete="name"
            />
          </div>

          {mode === "create" && (
            <div>
              <label htmlFor="zip" className="mb-1 block text-sm font-medium text-zinc-300">
                Zip code
              </label>
              <input
                id="zip"
                type="text"
                inputMode="numeric"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="e.g. 77004"
                className="w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoComplete="postal-code"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50"
          >
            {loading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
