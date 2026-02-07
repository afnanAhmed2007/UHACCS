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
    <div className="flex min-h-full w-full gap-0">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <h2 className="mb-2 shrink-0 text-lg font-semibold text-zinc-100">Profile</h2>
        <p className="mb-2 shrink-0 text-sm text-zinc-500">
          Full name: <span className="text-zinc-100">{user.name || "—"}</span>
        </p>
        <h3 className="mb-2 shrink-0 text-base font-medium text-zinc-200">Good deeds</h3>
        {loading ? (
          <p className="text-sm text-zinc-500">Loading…</p>
        ) : videos.length === 0 ? (
          <p className="text-sm text-zinc-500">No good deeds yet. Upload a video in the chat to add one.</p>
        ) : (
          <div
            className="overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
            style={{ height: "70vh" }}
          >
            {videos.map((entry) => (
              <div
                key={entry.filename}
                className="flex h-[70vh] w-full shrink-0 snap-start gap-0 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900"
                style={{ minHeight: "70vh" }}
              >
                <div className="flex min-w-0 flex-1 items-center justify-center overflow-hidden bg-black">
                  <video
                    src={profileVideoUrl(entry.filename)}
                    controls
                    className="max-h-full max-w-full rounded-l-2xl object-contain"
                    preload="metadata"
                    playsInline
                  />
                </div>
                <div className="flex w-80 shrink-0 flex-col justify-center border-l border-zinc-700 bg-zinc-800/80 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Response
                  </p>
                  <p className="mt-2 text-sm text-zinc-200">
                    {entry.llm_response || "No description yet."}
                    <span className="block mt-1 text-zinc-500">Score: {scoreToDisplayPoints(entry.score)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <aside className="flex w-80 shrink-0 flex-col border-l border-zinc-800 bg-zinc-900/50">
        <div className="border-b border-zinc-800 px-3 py-2">
          <h3 className="text-sm font-medium text-zinc-200">Chat (videos)</h3>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-3">
          {loading ? (
            <p className="text-sm text-zinc-500">Loading…</p>
          ) : videos.length === 0 ? (
            <p className="text-sm text-zinc-500">No videos yet. Drop one below.</p>
          ) : (
            <ul className="space-y-3">
              {videos.map((entry) => (
                <li key={entry.filename} className="space-y-2">
                  <div className="flex justify-end">
                    <span className="max-w-[85%] rounded-2xl overflow-hidden bg-blue-600 p-1">
                      <video
                        src={profileVideoUrl(entry.filename)}
                        controls
                        className="max-h-40 w-full rounded-xl"
                        preload="metadata"
                      />
                    </span>
                  </div>
                  <div className="flex justify-start">
                    <span className="max-w-[85%] rounded-2xl bg-zinc-700 px-4 py-2 text-sm text-zinc-100">
                      {entry.llm_response || "No description yet."}
                      <span className="block mt-1 text-zinc-500">Score: {scoreToDisplayPoints(entry.score)}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="shrink-0 border-t border-zinc-800 p-2">
          {error && (
            <p className="mb-2 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
              dragOver
                ? "border-blue-500 bg-blue-500/10"
                : "border-zinc-600 bg-zinc-800/50"
            }`}
          >
            <p className="mb-2 text-sm text-zinc-400">
              Drop a video here or click to choose
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
              className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Send video"}
            </label>
          </div>
        </div>
      </aside>
    </div>
  );
}
