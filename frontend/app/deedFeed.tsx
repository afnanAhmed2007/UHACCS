"use client";

import React, { useState, useEffect } from "react";
import type { Community } from "@/lib/api";
import { getCommunityVideos, profileVideoUrl, scoreToDisplayPoints } from "@/lib/api";

type Props = {
  community: Community;
};

export default function DeedFeed({ community }: Props) {
  const [videos, setVideos] = useState<{ userName: string; filename: string; score: number; llm_response: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getCommunityVideos(community.zip)
      .then((list) => {
        if (!cancelled) setVideos(list);
      })
      .catch(() => {
        if (!cancelled) setVideos([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [community.zip]);

  if (loading) {
    return (
      <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#bbf7d0] border-t-[#15803d]" />
        <p className="text-sm font-semibold text-[#166534]">Loading community videos…</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0] p-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dcfce7] text-4xl">
          🎬
        </div>
        <p className="text-center text-sm font-medium text-[#166534]">
          No videos in this community yet.
        </p>
        <p className="text-center text-sm text-[#166534]/80">
          Be the first to share a good deed!
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0] p-4">
      {videos.map((post) => (
        <section
          key={`${post.userName}-${post.filename}`}
          className="h-full min-h-[80vh] w-full snap-start flex items-center justify-center py-4 md:py-6"
        >
          <div className="flex flex-col h-full max-h-[90vh] w-full max-w-[1000px] overflow-hidden rounded-[2rem] border-2 border-[#bbf7d0] bg-white shadow-xl shadow-[#15803d]/10">
            <div className="relative flex-1 min-h-0 flex items-center justify-center bg-black rounded-t-[1.5rem] overflow-hidden">
              <video
                src={profileVideoUrl(post.filename)}
                controls
                controlsList="nodownload"
                className="w-full h-full object-contain"
                preload="metadata"
                playsInline
              />
              <div className="absolute top-3 right-3 rounded-lg bg-[#15803d] text-white text-[10px] font-bold px-2 py-1.5 shadow-md">
                ✓ Verified
              </div>
            </div>
            <div className="shrink-0 p-4 md:p-5 border-t-2 border-[#dcfce7] bg-[#f0fdf4]/50 rounded-b-[2rem] space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#15803d] text-white font-bold text-sm shrink-0">
                  {post.userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#14532d]">
                    @{post.userName.replace(/\s+/g, "_")}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-sm font-medium text-[#166534]">📍 {community.name}</span>
                    <span className="text-sm font-bold text-[#15803d]">Score: {scoreToDisplayPoints(post.score)}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm md:text-base font-medium text-[#14532d] leading-relaxed">
                {post.llm_response || "No description yet."}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
