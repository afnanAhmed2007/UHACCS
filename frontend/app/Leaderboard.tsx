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
    <div className="flex min-h-full min-w-0 flex-col items-center justify-start bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0] px-4 py-8 md:py-12 animate-fade-in">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#14532d]">
            Leaderboard
          </h1>
          <p className="text-base md:text-lg font-medium text-[#166534]">
            Top contributors in <span className="font-bold text-[#15803d]">{threadName}</span>
          </p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#bbf7d0] bg-white/60 py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#bbf7d0] border-t-[#15803d]" />
              <p className="mt-3 text-sm font-semibold text-[#166534]">Loading leaderboard…</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-[#bbf7d0] bg-white/60 p-8 text-center">
              <p className="text-sm font-medium text-[#166534]">No contributors in this area yet.</p>
            </div>
          ) : (
            leaderboard.map((entry, index) => (
              <div
                key={entry.id || `entry-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedUser(entry)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedUser(entry)}
                style={index < 10 ? { animationDelay: `${(index + 1) * 50}ms` } : undefined}
                className={`flex items-center gap-4 rounded-2xl border-2 p-4 md:p-5 cursor-pointer animate-fade-in transition-all duration-200 active:scale-[0.99] ${
                  entry.isMe
                    ? "border-[#15803d] bg-white shadow-md shadow-[#15803d]/10"
                    : "border-[#bbf7d0] bg-white hover:border-[#22c55e] hover:shadow-md"
                }`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shrink-0 bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 bg-[#15803d] text-white border-2 border-[#166534]">
                  {(entry.name && entry.name[0]) ? entry.name[0].toUpperCase() : "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-base md:text-lg truncate ${entry.isMe ? "text-[#14532d]" : "text-[#166534]"}`}>
                    {entry.name} {entry.isMe && <span className="ml-2 text-xs font-bold text-[#15803d]">(You)</span>}
                  </p>
                  <span className="text-xs font-bold text-[#166534]">
                    ✅ {entry.deedCount} verified deed{entry.deedCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl md:text-2xl font-extrabold text-[#15803d]">{entry.points}</p>
                  <p className="text-[10px] font-bold text-[#166534] uppercase tracking-wider">Points</p>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-2xl border-2 border-[#15803d] bg-white px-6 py-4 text-[#15803d] font-bold transition-colors duration-200 hover:bg-[#15803d] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2"
        >
          ← Back to Community
        </button>
      </div>

      {/* Detail modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14532d]/20 backdrop-blur-sm animate-backdrop-fade">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setSelectedUser(null)}
            className="absolute inset-0"
          />
          <div className="relative w-full max-w-lg rounded-[2rem] overflow-hidden border-2 border-[#bbf7d0] bg-white shadow-2xl animate-scale-in">
            <div className="w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
              {selectedUser.latestVideoFilename ? (
                <video
                  src={profileVideoUrl(selectedUser.latestVideoFilename)}
                  controls
                  className="w-full h-full object-contain"
                  preload="metadata"
                  playsInline
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-[#166534]">
                  <span className="text-lg font-bold">No video yet</span>
                </div>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#14532d]">{selectedUser.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="rounded-full p-2 text-[#166534] hover:bg-[#dcfce7] font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="rounded-xl border-2 border-[#dcfce7] bg-[#f0fdf4]/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#166534] mb-2">Impact</p>
                <p className="text-sm font-medium text-[#14532d] leading-relaxed">
                  {selectedUser.latestVideoLlmResponse || "No description yet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
