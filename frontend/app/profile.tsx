"use client";

import { useState, useEffect, useCallback } from "react";
import type { User, ProfileVideo } from "@/lib/api";
import {
  getProfileVideos,
  uploadProfileVideo,
  profileVideoUrl,
  scoreToDisplayPoints,
} from "@/lib/api";

export default function Profile({ user }: { user: User }) {
  const [videos, setVideos] = useState<ProfileVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const loadVideos = useCallback(async () => {
    try {
      const list = await getProfileVideos(user);
      setVideos(list);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  async function handleFile(file: File) {
    if (!file.type.startsWith("video/")) {
      setError("Please drop or select a video file.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      await uploadProfileVideo(user, file);
      await loadVideos();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function onDragLeave() {
    setDragOver(false);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  return (
    <div className="flex min-h-full w-full gap-6 p-4 animate-fade-in">
      {/* Profile & gallery */}
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden">
        <div className="shrink-0 rounded-2xl border-2 border-[#bbf7d0] bg-white p-5 shadow-sm transition-shadow duration-200">
          <h2 className="text-xl font-extrabold text-[#14532d]">Profile</h2>
          <p className="mt-2 text-base font-bold text-[#166534]">
            Full name: <span className="text-[#14532d]">{user.name || "—"}</span>
          </p>
          <p className="mt-1 text-base font-bold text-[#166534]">
            Good deeds: <span className="text-[#14532d]">{videos.length}</span>
          </p>
        </div>

        {loading ? (
          <div className="flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-[#bbf7d0] bg-[#f0fdf4]/50">
            <p className="text-sm font-semibold text-[#166534]">Loading your deeds…</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#bbf7d0] bg-[#f0fdf4]/50 p-8 text-center">
            <p className="text-sm font-medium text-[#166534]">
              No good deeds yet. Upload a video in the chat to add one.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-4 pr-2">
            {videos.map((entry, i) => (
              <div
                key={entry.filename}
                className="flex flex-col rounded-2xl border-2 border-[#bbf7d0] bg-white p-4 shadow-sm animate-fade-in transition-shadow duration-200"
                style={i < 10 ? { animationDelay: `${(i + 1) * 50}ms` } : undefined}
              >
                {/* Video on top */}
                <div className="relative aspect-video w-full min-h-[400px] shrink-0 overflow-hidden rounded-xl bg-black">
                  <video
                    src={profileVideoUrl(entry.filename)}
                    controls
                    className="h-full w-full object-contain"
                    preload="metadata"
                    playsInline
                  />
                  <span className="absolute top-2 right-2 rounded-md bg-[#15803d] px-2 py-0.5 text-xs font-semibold text-white shadow">
                    ✓ Verified
                  </span>
                </div>
                {/* Description at the bottom, score under analysis */}
                <div className="mt-3 flex flex-1 flex-col gap-1">
                  <p className="text-sm font-bold text-[#15803d]">
                    AI Analysis
                  </p>
                  <p className="text-sm font-medium text-[#14532d] leading-relaxed">
                    {entry.llm_response || "No description yet."}
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#15803d]">
                    Impact Score: {scoreToDisplayPoints(entry.score)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat – white background, blue bubbles */}
      <aside className="flex w-[380px] shrink-0 flex-col overflow-hidden rounded-2xl border-2 border-[#bbf7d0] bg-white shadow-lg">
        <div className="border-b-2 border-[#dcfce7] bg-[#f0fdf4]/60 px-4 py-3">
          <h3 className="text-base font-bold text-[#14532d]">Chat</h3>
          <p className="text-xs font-medium text-[#166534]/80">Upload a video to see how AI ranks your good deed</p>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-4 bg-white">
          {loading ? (
            <p className="text-sm font-medium text-[#166534]">Loading…</p>
          ) : videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm font-medium text-[#166534]">No videos yet.</p>
              <p className="mt-1 text-sm text-[#166534]/80">Drop one below to see your AI analysis and score.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {videos.map((entry) => (
                <li key={entry.filename} className="space-y-2">
                  {/* Video on top – wide and lengthy */}
                  <div className="flex justify-end">
                    <div className="w-full max-w-[85%] overflow-hidden rounded-2xl rounded-tr-md border-2 border-blue-400 bg-blue-50 p-1 shadow-sm">
                      <div className="relative aspect-video w-full min-h-[200px] overflow-hidden rounded-xl bg-black">
                        <video
                          src={profileVideoUrl(entry.filename)}
                          controls
                          className="h-full w-full object-contain"
                          preload="metadata"
                        />
                      </div>
                    </div>
                  </div>
                  {/* AI response: "AI Analysis:" + text, then Score below */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-blue-500 px-4 py-3 text-sm text-white shadow-md">
                      <p className="font-medium leading-relaxed">
                        <span className="text-xs font-bold opacity-90">AI Analysis: </span>
                        {entry.llm_response || "No description yet."}
                      </p>
                      <p className="mt-2 text-xs font-bold opacity-90">
                        Impact Score: {scoreToDisplayPoints(entry.score)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="shrink-0 border-t-2 border-[#dcfce7] bg-[#f0fdf4]/40 p-4">
          {error && (
            <div className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600 border border-red-100">
              {error}
            </div>
          )}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`rounded-xl border-2 border-dashed p-4 text-center transition-colors duration-200 ${
              dragOver
                ? "border-[#15803d] bg-[#dcfce7]"
                : "border-[#bbf7d0] bg-white hover:bg-[#f0fdf4]/60"
            }`}
          >
            <p className="mb-2 text-sm font-medium text-[#166534]">
              Drop a good deed video here or click to choose. AI will analyze and rank it.
            </p>
            <input
              type="file"
              accept="video/*"
              onChange={onInputChange}
              disabled={uploading}
              className="hidden"
              id="profile-video-input"
            />
            <label
              htmlFor="profile-video-input"
              className="inline-block cursor-pointer rounded-xl bg-[#15803d] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors duration-200 hover:bg-[#166534] disabled:opacity-60"
            >
              {uploading ? "Uploading…" : "Send video"}
            </label>
          </div>
        </div>
      </aside>
    </div>
  );
}
