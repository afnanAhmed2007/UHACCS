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
      <div className="flex h-full min-h-[50vh] items-center justify-center bg-zinc-950 text-zinc-500">
        Loading…
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex h-full min-h-[50vh] items-center justify-center bg-zinc-950 text-zinc-500">
        No videos in this community yet.
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-zinc-950 overflow-y-auto snap-y snap-mandatory">
      {videos.map((post) => (
        <section
          key={`${post.userName}-${post.filename}`}
          className="h-full min-h-[80vh] w-full snap-start flex items-center justify-center p-0 md:p-4"
        >
          <div className="flex flex-col h-full md:h-[95%] w-full max-w-[1000px] bg-zinc-900 md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-800">
            <div className="relative flex-1 min-h-0 flex items-center justify-center bg-black">
              <video
                src={profileVideoUrl(post.filename)}
                controls
                controlsList="nodownload"
                className="w-full h-full object-contain"
                preload="metadata"
                playsInline
              />
            </div>
            <div className="shrink-0 p-4 md:p-5 border-t border-zinc-800 bg-zinc-900/95 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-lg font-bold text-white">
                  @{post.userName.replace(/\s+/g, "_")}
                </h3>
                <span className="text-blue-400 text-sm font-medium">📍 {community.name}</span>
                <span className="text-zinc-500 text-sm font-medium">Score: {scoreToDisplayPoints(post.score)}</span>
              </div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                {post.llm_response || "No description yet."}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
