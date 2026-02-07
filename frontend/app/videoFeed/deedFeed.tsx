"use client";

import React from "react";
import { motion } from "framer-motion";

const mockFeed = [
  {
    id: "post_1",
    userName: "Alex.P",
    description: "Picked up 3 bags of trash at the local park! 🌳 Community cleaning feels great.",
    points: 150,
    location: "77004",
  },
  {
    id: "post_2",
    userName: "Sarah_Helper",
    description: "Helped neighbor fix their fence. Community vibes! 🔨",
    points: 300,
    location: "77004",
  },
];

export default function TikTokFeed() {
  return (
    <div className="h-screen w-full bg-zinc-950 overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {mockFeed.map((post) => (
        <section 
          key={post.id} 
          className="h-screen w-full snap-start flex items-center justify-center p-0 md:p-4"
        >
          {/* THE VIDEO CARD - TikTok style but wider for desktop */}
          <div className="relative h-full md:h-[95%] w-full max-w-[1000px] bg-zinc-900 md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-800">
            
            {/* 1. BACKGROUND (The Video) */}
            <div className="absolute inset-0 flex items-center justify-center bg-black">
               <span className="text-zinc-800 font-black italic text-4xl uppercase opacity-20">Video Footage</span>
               {/* <video src={post.videoUrl} autoPlay loop muted className="w-full h-full object-cover" /> */}
            </div>

            {/* 2. OVERLAYS */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* 3. RIGHT-SIDE ACTIONS (Shifted inward for desktop) */}
            <div className="absolute right-6 bottom-32 flex flex-col gap-8 items-center z-10">
              {/* Profile */}
              <div className="relative mb-2">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-white overflow-hidden">
                   <div className="w-full h-full bg-zinc-800 flex items-center justify-center font-black text-white">{post.userName[0]}</div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-white shadow-lg">+</div>
              </div>

              {/* Respect / Like */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center transition-transform group-active:scale-125">
                   <span className="text-4xl drop-shadow-lg">🙌</span>
                </div>
                <span className="text-xs font-black text-white mt-1 drop-shadow-md tracking-tighter uppercase">Respect</span>
              </div>

              {/* Points Badge */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center rotate-12 border-2 border-white/20 shadow-xl">
                   <span className="text-sm font-black -rotate-12">+{post.points}</span>
                </div>
                <span className="text-xs font-black text-white mt-1 drop-shadow-md uppercase tracking-tighter">Score</span>
              </div>

              {/* Share/Comments */}
              <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-3xl">💬</span>
                <span className="text-xs font-black text-white mt-1 uppercase">8</span>
              </div>
            </div>

            {/* 4. BOTTOM INFO AREA */}
            <div className="absolute left-10 bottom-12 right-32 space-y-4 z-10">
               <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter drop-shadow-md">
                    @{post.userName}
                  </h3>
                  <div className="h-1 w-1 bg-white rounded-full opacity-50" />
                  <span className="text-blue-400 font-black text-sm uppercase tracking-widest">📍 {post.location}</span>
               </div>
               
               <p className="text-white font-medium text-lg leading-snug max-w-xl drop-shadow-md">
                 {post.description}
               </p>

               <div className="flex items-center gap-2">
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                     <span className="text-xs">🎵</span>
                     <span className="text-xs font-bold uppercase tracking-tight text-white/80 overflow-hidden whitespace-nowrap marquee">Original Deed Sound — {post.userName}</span>
                  </div>
               </div>
            </div>

            {/* 5. TOP TABS */}
            <div className="absolute top-10 left-0 w-full flex justify-center gap-8 z-20">
               <button className="text-white/40 text-sm font-black uppercase tracking-widest transition-colors hover:text-white">Following</button>
               <button className="text-white text-sm font-black uppercase tracking-widest border-b-4 border-blue-500 pb-1">For You</button>
            </div>

          </div>
        </section>
      ))}
    </div>
  );
}