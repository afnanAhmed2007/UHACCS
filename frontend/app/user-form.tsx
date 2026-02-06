"use client";

import { useState, FormEvent } from "react";
import type { User } from "@/lib/storage";

export default function UserForm({
  onCreated,
}: {
  onCreated: (user: User) => void;
}) {
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const trimmedName = name.trim();
    const trimmedZip = zip.trim();
    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (!trimmedZip) {
      setError("Please enter your zip code.");
      return;
    }
    onCreated({ name: trimmedName, zip: trimmedZip });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 px-4 text-zinc-100">
      <h1 className="text-2xl font-semibold">UHACCS</h1>
      <p className="text-zinc-400">Best deeds in your community</p>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-zinc-700 bg-zinc-900 p-6 shadow"
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-300">
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jane"
            className="w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoComplete="name"
          />
        </div>
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
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
