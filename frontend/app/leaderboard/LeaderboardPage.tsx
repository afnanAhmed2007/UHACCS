"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  streak: number;
  isMe?: boolean;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "Sarah J.", points: 450, streak: 12 },
  { id: "2", name: "Mike R.", points: 380, streak: 5 },
  { id: "3", name: "Alex P.", points: 310, streak: 8 },
  { id: "4", name: "You", points: 290, streak: 3, isMe: true },
  { id: "5", name: "Elena W.", points: 210, streak: 2 },
];

const LeaderboardPage = () => {
  const zipCode = "77004";

  // LOG ON RENDER: Prints the full state when the page loads
  useEffect(() => {
    console.log("--- LEADERBOARD RENDERED ---");
    console.log(JSON.stringify({ zipCode, timestamp: new Date().toISOString(), data: mockLeaderboard }, null, 2));
  }, [zipCode]);

  // LOG ON CLICK: Prints specific user info + full leaderboard
  const handleEntryClick = (entry: LeaderboardEntry) => {
    console.log(`--- ENTRY CLICKED: ${entry.name} ---`);
    const exportData = {
      action: "USER_CLICK",
      clickedUser: entry,
      fullLeaderboard: mockLeaderboard,
      zipCode: zipCode
    };
    console.log(JSON.stringify(exportData, null, 2));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-950 px-4 py-12 md:py-20 text-zinc-100 font-sans">
      <div className="w-full max-w-2xl space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white">
            Leaderboard
          </h1>
          <p className="text-zinc-400 font-medium text-base md:text-lg">
            Top contributors in <span className="text-blue-500 font-bold">#{zipCode}</span>
          </p>
        </div>

        {/* List of Leaders */}
        <div className="space-y-4">
          {mockLeaderboard.map((entry, index) => {
            const isTop3 = index < 3;
            const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null;

            return (
              <motion.div
                key={entry.id}
                onClick={() => handleEntryClick(entry)} // CLICK TRIGGER
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center p-5 md:p-6 rounded-2xl border cursor-pointer transition-all active:scale-[0.98] ${
                  entry.isMe 
                    ? "bg-blue-600/10 border-blue-500/50 shadow-[0_6px_0_#2563eb]" 
                    : "bg-zinc-900 border-zinc-800 shadow-[0_6px_0_#18181b] hover:bg-zinc-800"
                }`}
              >
                {/* Rank */}
                <div className="w-10 md:w-14 font-black text-zinc-500 text-lg md:text-xl">
                  {medal || index + 1}
                </div>

                {/* Avatar Circle */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-base md:text-lg border-2 ${
                  isTop3 ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-500" : "border-zinc-700 bg-zinc-800 text-zinc-400"
                }`}>
                  {entry.name[0]}
                </div>

                {/* Name & Info */}
                <div className="flex-1 ml-4 md:ml-6">
                  <p className={`font-bold text-base md:text-xl ${entry.isMe ? "text-blue-400" : "text-zinc-200"}`}>
                    {entry.name} {entry.isMe && <span className="text-xs md:text-sm ml-2 opacity-70">(You)</span>}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider text-orange-400 border border-zinc-700">
                      🔥 {entry.streak} Day Streak
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <p className="text-xl md:text-3xl font-black text-white">{entry.points}</p>
                  <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">Points</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-6">
          <button
            onClick={() => {
                console.log("BACK_NAVIGATION_TRIGGERED");
                window.history.back();
            }}
            className="w-full rounded-2xl bg-zinc-800 border-b-4 border-zinc-900 px-6 py-4 text-sm md:text-base font-black text-zinc-400 hover:bg-zinc-700 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-[0.2em]"
          >
            ← Back to Community
          </button>
        </div>

        <p className="text-center text-[10px] md:text-xs font-bold text-zinc-600 uppercase tracking-[0.3em] pt-4">
          Secure AI Verification • UHACCS Protocol
        </p>
      </div>
    </div>
  );
};

export default LeaderboardPage;