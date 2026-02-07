"use client";

import { useState, useEffect, FormEvent } from "react";
import { getCommunities, addCommunity, type User, type Community } from "@/lib/api";
import { clearStoredUser } from "@/lib/storage";
import Profile from "./profile";
import Leaderboard from "./Leaderboard";
import DeedFeed from "./deedFeed";

export default function CommunitiesView({ user }: { user: User }) {
  const [communities, setCommunitiesState] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [communityTab, setCommunityTab] = useState<"leadership" | "individual" | "videos">("individual"); // "individual" = Profile
  const [showAdd, setShowAdd] = useState(false);
  const [addName, setAddName] = useState("");
  const [addZip, setAddZip] = useState("");
  const [addError, setAddError] = useState("");
  const [adding, setAdding] = useState(false);

  async function loadCommunities() {
    try {
      const list = await getCommunities();
      setCommunitiesState(list);
    } catch {
      setCommunitiesState([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCommunities();
  }, []);

  async function handleAddSubmit(e: FormEvent) {
    e.preventDefault();
    setAddError("");
    const name = addName.trim();
    const zip = addZip.trim();
    if (!name) {
      setAddError("Please enter a community name.");
      return;
    }
    if (!zip) {
      setAddError("Please enter a zip code.");
      return;
    }
    setAdding(true);
    try {
      await addCommunity(name, zip);
      setAddName("");
      setAddZip("");
      setShowAdd(false);
      await loadCommunities();
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Failed to add community.");
    } finally {
      setAdding(false);
    }
  }

  function handleSignOut() {
    clearStoredUser();
    window.location.reload();
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#bbf7d0] border-t-[#15803d]" />
        <p className="text-sm font-semibold text-[#166534]">Loading your communities…</p>
      </div>
    );
  }

  if (selectedCommunity) {
    const tabs = [
      { id: "individual" as const, label: "Profile", icon: "👤" },
      { id: "leadership" as const, label: "Leaderboard", icon: "🏆" },
      { id: "videos" as const, label: "Videos", icon: "🎬" },
    ];
    return (
      <div className="fixed inset-0 z-20 flex min-h-screen flex-col bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]">
        <header className="flex shrink-0 flex-col gap-4 border-b-2 border-[#bbf7d0] bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSelectedCommunity(null)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-[#166534] transition hover:bg-[#dcfce7]"
            >
              ← Back
            </button>
            <span className="text-sm font-bold text-[#14532d]">{selectedCommunity.name}</span>
            <div className="w-16" />
          </div>
          <div
            className="flex w-full gap-1 rounded-2xl bg-[#f0fdf4]/80 p-1.5"
            role="tablist"
          >
            {tabs.map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={communityTab === id}
                onClick={() => setCommunityTab(id)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-3 text-center text-sm font-bold transition-all ${
                  communityTab === id
                    ? "bg-[#15803d] text-white shadow-md"
                    : "text-[#166534] hover:bg-[#dcfce7]"
                }`}
              >
                <span aria-hidden>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-auto px-4 py-6">
          {communityTab === "individual" && <Profile user={user} />}
          {communityTab === "leadership" && (
            <Leaderboard
              user={user}
              community={selectedCommunity}
              onBack={() => setSelectedCommunity(null)}
            />
          )}
          {communityTab === "videos" && <DeedFeed community={selectedCommunity} />}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0] text-[#14532d]">
      <header className="border-b-2 border-[#bbf7d0] bg-white/90 px-4 py-4 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>🌱</span>
            <h1 className="text-xl font-extrabold text-[#14532d]">R U Kind</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#dcfce7] px-3 py-1.5 text-sm font-bold text-[#166534]">
              {user.name} · {user.zip}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl px-3 py-1.5 text-sm font-bold text-[#166534] hover:bg-[#dcfce7]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <section className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-[#14532d]">
            Your communities
          </h2>
          <p className="mt-2 text-[#166534]">
            Together we grow — join or create a space to share kind deeds and care for our planet.
          </p>
          <p className="mt-1 text-sm font-medium text-[#166534]/80">
            Inclusive · Local · Green
          </p>
        </section>

        {communities.length === 0 ? (
          <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-dashed border-[#bbf7d0] bg-white/60 p-10 text-center shadow-inner">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dcfce7] text-4xl">
              🌍
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#14532d]">No community yet</h3>
              <p className="mt-2 text-[#166534]">
                Every community starts with one person. Create a space for your neighborhood to share good deeds and support the environment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              className="rounded-xl bg-[#15803d] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#15803d]/25 hover:bg-[#166534] focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2"
            >
              Create your first community
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold text-[#166534]">
                {communities.length} {communities.length === 1 ? "community" : "communities"}
              </p>
              <button
                type="button"
                onClick={() => setShowAdd(true)}
                className="rounded-xl border-2 border-[#15803d] bg-white px-4 py-2.5 text-sm font-bold text-[#15803d] hover:bg-[#15803d] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2"
              >
                + Add community
              </button>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {communities.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedCommunity(c)}
                    className="flex w-full flex-col items-start gap-2 rounded-2xl border-2 border-[#bbf7d0] bg-white p-5 text-left shadow-md transition hover:border-[#22c55e] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#dcfce7] p-1.5" aria-hidden>
                      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Connecting ring */}
                        <path d="M 6 20 Q 24 8 42 20" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" />
                        {/* Left figure (orange) */}
                        <circle cx="14" cy="14" r="5" fill="#f59e0b" />
                        <ellipse cx="14" cy="30" rx="6" ry="10" fill="#f59e0b" />
                        {/* Center figure (red) */}
                        <circle cx="24" cy="14" r="5" fill="#ef4444" />
                        <ellipse cx="24" cy="30" rx="6" ry="10" fill="#ef4444" />
                        {/* Right figure (purple) */}
                        <circle cx="34" cy="14" r="5" fill="#8b5cf6" />
                        <ellipse cx="34" cy="30" rx="6" ry="10" fill="#8b5cf6" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-[#14532d]">{c.name}</span>
                      <span className="mt-1 inline-block rounded-lg bg-[#f0fdf4] px-2 py-0.5 text-sm font-semibold text-[#166534]">
                        {c.zip}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#14532d]/30 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-community-title"
        >
          <div className="w-full max-w-sm rounded-3xl border-2 border-[#bbf7d0] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl" aria-hidden>🌍</span>
              <h2 id="add-community-title" className="text-xl font-extrabold text-[#14532d]">
                Add a community
              </h2>
            </div>
            <p className="mb-4 text-sm text-[#166534]">
              Create a local space for neighbors to share kind deeds and support the environment.
            </p>
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="community-name"
                  className="mb-1.5 block text-sm font-bold text-[#166534]"
                >
                  Community name
                </label>
                <input
                  id="community-name"
                  type="text"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="e.g. Downtown Houston"
                  className="w-full rounded-xl border-2 border-[#bbf7d0] bg-[#f0fdf4]/50 px-4 py-3 text-[#14532d] placeholder-[#166534]/50 focus:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30"
                />
              </div>
              <div>
                <label
                  htmlFor="community-zip"
                  className="mb-1.5 block text-sm font-bold text-[#166534]"
                >
                  Zip code
                </label>
                <input
                  id="community-zip"
                  type="text"
                  inputMode="numeric"
                  value={addZip}
                  onChange={(e) =>
                    setAddZip(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="e.g. 77004"
                  className="w-full rounded-xl border-2 border-[#bbf7d0] bg-[#f0fdf4]/50 px-4 py-3 text-[#14532d] placeholder-[#166534]/50 focus:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30"
                />
              </div>
              {addError && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 border border-red-100">
                  {addError}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdd(false);
                    setAddError("");
                  }}
                  className="flex-1 rounded-xl border-2 border-[#bbf7d0] bg-white px-4 py-3 text-sm font-bold text-[#166534] hover:bg-[#dcfce7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 rounded-xl bg-[#15803d] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#15803d]/25 hover:bg-[#166534] disabled:opacity-60"
                >
                  {adding ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Adding…
                    </span>
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}