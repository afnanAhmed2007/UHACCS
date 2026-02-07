"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  deedCount: number; // Changed from streak
  description: string;
  recentVideoUrl: string;
  isMe?: boolean;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "Sarah J.", points: 450, deedCount: 12, description: "Cleaning up local parks and helping elderly neighbors with groceries.", recentVideoUrl: "#", isMe: false },
  { id: "2", name: "Mike R.", points: 380, deedCount: 9, description: "Donated 50lbs of food to the local pantry and organized a street sweep.", recentVideoUrl: "#", isMe: false },
  { id: "3", name: "Alex P.", points: 310, deedCount: 7, description: "Tutoring students in math and volunteering at the animal shelter.", recentVideoUrl: "#", isMe: false },
  { id: "4", name: "You", points: 290, deedCount: 5, description: "Your latest deeds will appear here after AI verification!", recentVideoUrl: "#", isMe: true },
];

const LeaderboardPage = () => {
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(null);
  const zipCode = "77004";

  // LOG ON RENDER
  useEffect(() => {
    console.log("--- LEADERBOARD LOADED ---", { zipCode, data: mockLeaderboard });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-950 px-4 py-12 md:py-20 text-zinc-100 font-sans relative">
      
      <div className="w-full max-w-2xl space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white">Leaderboard</h1>
          <p className="text-zinc-400 font-medium text-base md:text-lg">
            Top contributors in <span className="text-blue-500 font-bold">#{zipCode}</span>
          </p>
        </div>

        {/* List of Leaders */}
        <div className="space-y-4">
          {mockLeaderboard.map((entry, index) => (
            <motion.div
              key={entry.id}
              onClick={() => {
                setSelectedUser(entry);
                console.log("VIEWING_DETAILS_FOR:", entry.name);
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center p-5 md:p-6 rounded-2xl border cursor-pointer transition-all active:scale-[0.98] ${
                entry.isMe 
                  ? "bg-blue-600/10 border-blue-500/50 shadow-[0_6px_0_#2563eb]" 
                  : "bg-zinc-900 border-zinc-800 shadow-[0_6px_0_#18181b] hover:bg-zinc-800"
              }`}
            >
              <div className="w-10 md:w-14 font-black text-zinc-500 text-lg md:text-xl">{index + 1}</div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 border-zinc-700 bg-zinc-800 text-zinc-400">
                {entry.name[0]}
              </div>
              <div className="flex-1 ml-4 md:ml-6">
                <p className={`font-bold text-base md:text-xl ${entry.isMe ? "text-blue-400" : "text-zinc-200"}`}>{entry.name}</p>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-green-400">
                  ✅ {entry.deedCount} Verified Deeds
                </span>
              </div>
              <div className="text-right">
                <p className="text-xl md:text-3xl font-black text-white">{entry.points}</p>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Points</p>
              </div>
            </motion.div>
          ))}
        </div>

        <button onClick={() => window.history.back()} className="w-full rounded-2xl bg-zinc-800 border-b-4 border-zinc-900 px-6 py-4 text-zinc-400 font-black uppercase tracking-[0.2em]">
          ← Back
        </button>
      </div>

      {/* CONTRIBUTION MODAL */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              {/* Fake Video Preview */}
              <div className="w-full aspect-video bg-zinc-800 flex items-center justify-center relative border-b border-zinc-700">
                <span className="text-zinc-600 font-bold uppercase tracking-tighter italic text-xl">Recent Deed Video</span>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent flex items-end p-6">
                   <div className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded">AI VERIFIED</div>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase italic">{selectedUser.name}</h2>
                    <p className="text-green-400 font-bold text-sm tracking-widest uppercase">{selectedUser.deedCount} Total Deeds</p>
                  </div>
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="text-zinc-500 hover:text-white font-black"
                  >✕</button>
                </div>

                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <p className="text-zinc-400 text-sm leading-relaxed italic">
                    "{selectedUser.description}"
                  </p>
                </div>

                {/* <button 
                  onClick={() => setSelectedUser(null)}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-[0_4px_0_#1e40af] active:translate-y-1 active:shadow-none transition-all"
                >
                  Awesome!
                </button> */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaderboardPage;