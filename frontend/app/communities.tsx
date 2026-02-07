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
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Loading…
      </div>
    );
  }

  if (selectedCommunity) {
    const tabs = [
      { id: "individual" as const, label: "Profile" },
      { id: "leadership" as const, label: "Leaderboard" },
      { id: "videos" as const, label: "Videos" },
    ];
    return (
      <div className="fixed inset-0 z-20 flex min-h-screen flex-col bg-black">
        <header className="flex shrink-0 flex-col gap-4 border-b border-zinc-800 px-4 py-3">
          <button
            type="button"
            onClick={() => setSelectedCommunity(null)}
            className="self-start text-sm text-zinc-400 hover:text-zinc-200"
          >
            ← Back to communities
          </button>
          <div className="flex justify-center">
            <div
              className="flex w-full max-w-md rounded-lg bg-blue-600 p-1"
              role="tablist"
            >
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={communityTab === id}
                  onClick={() => setCommunityTab(id)}
                  className={`flex-1 rounded-md py-2 text-center text-sm font-medium transition-colors ${
                    communityTab === id
                      ? "bg-white text-blue-600"
                      : "bg-transparent text-white hover:text-white/90"
                  }`}
              >
                {label}
              </button>
            ))}
            </div>
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <h1 className="text-lg font-semibold">Community threads</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400">
              {user.name} · {user.zip}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm text-zinc-500 hover:text-zinc-300"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {communities.length === 0 ? (
          <div className="flex flex-col items-center gap-6 rounded-lg border border-zinc-700 bg-zinc-900/50 p-8 text-center">
            <p className="text-zinc-400">No communities yet.</p>
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Add a community
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowAdd(true)}
                className="rounded-md border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add a community
              </button>
            </div>
            <ul className="space-y-2">
              {communities.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedCommunity(c)}
                    className="flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-left transition-colors hover:bg-zinc-800/50"
                  >
                    <div>
                      <span className="font-medium">{c.name}</span>
                      <span className="ml-2 text-sm text-zinc-500">{c.zip}</span>
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
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-community-title"
        >
          <div className="w-full max-w-sm rounded-lg border border-zinc-700 bg-zinc-900 p-6 shadow-xl">
            <h2 id="add-community-title" className="mb-4 text-lg font-semibold">
              Add a community
            </h2>
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="community-name"
                  className="mb-1 block text-sm font-medium text-zinc-300"
                >
                  Community name
                </label>
                <input
                  id="community-name"
                  type="text"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="e.g. Downtown Houston"
                  className="w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="community-zip"
                  className="mb-1 block text-sm font-medium text-zinc-300"
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
                  className="w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              {addError && (
                <p className="text-sm text-red-400" role="alert">
                  {addError}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdd(false);
                    setAddError("");
                  }}
                  className="flex-1 rounded-md border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {adding ? "…" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
