"use client";

import React, { useState, useEffect } from "react";
import type { User } from "@/lib/api";
import type { Community } from "@/lib/api";
import type { LeaderboardEntry as ApiEntry } from "@/lib/api";
import { getLeaderboard, profileVideoUrl } from "@/lib/api";

type LeaderboardEntry = ApiEntry & { isMe?: boolean };

type Props = {
  user: User;
  community: Community;
  onBack: () => void;
};

export default function Leaderboard({ user, community, onBack }: Props) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(null);
  const zipCode = community.zip;
  const threadName = community.name;

  const fetchLeaderboard = React.useCallback(() => {
    setLoading(true);
    getLeaderboard(zipCode)
      .then((list) => {
        const withMe = list.map((e) => ({
          ...e,
          isMe: user.name === e.name,
        }));
        setLeaderboard(withMe);
      })
      .catch(() => setLeaderboard([]))
      .finally(() => setLoading(false));
  }, [zipCode, user.name]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    const onFocus = () => fetchLeaderboard();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchLeaderboard]);

  return (
    <div className="flex min-h-full min-w-0 flex-col items-center justify-start bg-black px-4 py-8 md:py-12 text-zinc-100 font-sans">
      <div className="w-full max-w-2xl space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white">
            Leaderboard
          </h1>
          <p className="text-zinc-400 font-medium text-base md:text-lg">
            Top contributors in <span className="text-blue-500 font-bold">{threadName}</span>
          </p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-zinc-500 py-8">Loading leaderboard…</p>
          ) : leaderboard.length === 0 ? (
            <p className="text-center text-zinc-500 py-8">No contributors in this area yet.</p>
          ) : (
            leaderboard.map((entry, index) => (
              <div
                key={entry.id || `entry-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedUser(entry)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedUser(entry)}
                className={`flex items-center p-5 md:p-6 rounded-2xl border cursor-pointer transition-all active:scale-[0.98] ${
                  entry.isMe
                    ? "bg-blue-600/10 border-blue-500/50 shadow-[0_6px_0_#2563eb]"
                    : "bg-zinc-900 border-zinc-800 shadow-[0_6px_0_#18181b] hover:bg-zinc-800"
                }`}
              >
                <div className="w-10 md:w-14 font-black text-zinc-500 text-lg md:text-xl shrink-0">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 border-zinc-700 bg-zinc-800 text-zinc-400 shrink-0">
                  {(entry.name && entry.name[0]) ? entry.name[0].toUpperCase() : "?"}
                </div>
                <div className="flex-1 min-w-0 ml-4 md:ml-6">
                  <p className={`font-bold text-base md:text-xl truncate ${entry.isMe ? "text-blue-400" : "text-zinc-200"}`}>
                    {entry.name} {entry.isMe && <span className="text-xs md:text-sm ml-2 opacity-70">(You)</span>}
                  </p>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-green-400">
                    ✅ {entry.deedCount} Verified Deeds
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl md:text-3xl font-black text-white">{entry.points}</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">Points</p>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-2xl bg-zinc-800 border-b-4 border-zinc-900 px-6 py-4 text-zinc-400 font-black uppercase tracking-[0.2em] hover:bg-zinc-700 active:translate-y-1 active:border-b-0 transition-all"
        >
          ← Back to Community
        </button>
      </div>

      {/* Detail modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setSelectedUser(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="w-full aspect-video bg-zinc-800 flex items-center justify-center relative border-b border-zinc-700 overflow-hidden">
              {selectedUser.latestVideoFilename ? (
                <>
                  <video
                    src={profileVideoUrl(selectedUser.latestVideoFilename)}
                    controls
                    className="w-full h-full object-contain"
                    preload="metadata"
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent pointer-events-none flex items-end p-6">
                    <div className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded">
                      AI VERIFIED
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-zinc-600 font-bold uppercase tracking-tighter italic text-xl">
                    Recent Deed Video
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent flex items-end p-6">
                    <div className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded">
                      AI VERIFIED
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black text-white uppercase italic">{selectedUser.name}</h2>
                  <p className="text-green-400 font-bold text-sm tracking-widest uppercase">
                    {selectedUser.deedCount} Total Deeds
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="text-zinc-500 hover:text-white font-black"
                >
                  ✕
                </button>
              </div>
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                <p className="text-zinc-400 text-sm leading-relaxed italic">
                  {selectedUser.deedCount === 0
                    ? "No verified deeds yet. Upload videos from your profile to add deeds and points."
                    : `${selectedUser.deedCount} verified deed(s) from uploaded videos.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
