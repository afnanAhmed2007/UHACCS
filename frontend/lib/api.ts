const API_BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
  "http://localhost:8000";

/** Display points from rank score x: 1000 * (1/2^x). Use when summing or showing score. */
export function scoreToDisplayPoints(score: number): number {
  return Math.round(1000 * Math.pow(0.5, score));
}

export type User = { name: string; zip: string };
export type Community = { id: string; name: string; zip: string };

/** Sign in by full name only (lookup in backend). */
export async function signIn(name: string): Promise<User> {
  const res = await fetch(`${API_BASE}/api/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.trim() }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Sign in failed.");
  }
  const data = await res.json();
  return data.user;
}

/** Create account with name + zip (stored in backend). */
export async function createUser(name: string, zip: string): Promise<User> {
  const res = await fetch(`${API_BASE}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.trim(), zip: zip.trim() }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Something went wrong.");
  }
  const data = await res.json();
  return data.user;
}

export async function getCommunities(): Promise<Community[]> {
  const res = await fetch(`${API_BASE}/api/communities`);
  if (!res.ok) throw new Error("Failed to load communities.");
  return res.json();
}

export async function addCommunity(name: string, zip: string): Promise<Community> {
  const res = await fetch(`${API_BASE}/api/communities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.trim(), zip: zip.trim() }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to add community.");
  }
  return res.json();
}

export type ProfileVideo = { filename: string; llm_response: string; score: number };

/** Get list of video entries (filename + LLM response) for the current user's profile. */
export async function getProfileVideos(user: User): Promise<ProfileVideo[]> {
  const params = new URLSearchParams({ name: user.name, zip: user.zip });
  const res = await fetch(`${API_BASE}/api/user/videos?${params}`);
  if (!res.ok) throw new Error("Failed to load videos.");
  const data = await res.json();
  const raw = data.videos ?? [];
  return raw.map((e: { filename?: string; llm_response?: string; score?: number }) => ({
    filename: e.filename ?? "",
    llm_response: e.llm_response ?? "",
    score: typeof e.score === "number" ? e.score : 0,
  }));
}

/** Upload a video for the current user's profile. Returns filename and LLM response. */
export async function uploadProfileVideo(
  user: User,
  file: File
): Promise<ProfileVideo> {
  const form = new FormData();
  form.append("name", user.name);
  form.append("zip", user.zip);
  form.append("file", file);
  const res = await fetch(`${API_BASE}/api/user/videos`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to upload video.");
  }
  const data = await res.json();
  return {
    filename: data.filename ?? "",
    llm_response: data.llm_response ?? "",
    score: typeof data.score === "number" ? data.score : 0,
  };
}

export function profileVideoUrl(filename: string): string {
  return `${API_BASE}/api/videos/${filename}`;
}

export type LeaderboardEntry = {
  id: string;
  name: string;
  deedCount: number;
  points: number;
  latestVideoFilename?: string | null;
};

/** Leaderboard for a zip (points recalculated every request from current video ranks). */
export async function getLeaderboard(zipCode: string): Promise<LeaderboardEntry[]> {
  const params = new URLSearchParams({ zip: zipCode });
  const res = await fetch(`${API_BASE}/api/leaderboard?${params}`, {
    cache: "no-store",
    headers: { Pragma: "no-cache" },
  });
  if (!res.ok) throw new Error("Failed to load leaderboard.");
  const data = await res.json();
  const raw = data.leaderboard ?? [];
  return raw.map((e: Record<string, unknown>, i: number) => ({
    id: typeof e.id === "string" ? e.id : `entry-${i}`,
    name: typeof e.name === "string" ? e.name : "",
    deedCount: typeof e.deedCount === "number" ? e.deedCount : (e.deed_count as number) ?? 0,
    points: typeof e.points === "number" ? e.points : 0,
    latestVideoFilename: (e.latestVideoFilename ?? e.latest_video_filename ?? null) as string | null | undefined,
  }));
}

export type CommunityVideo = {
  userName: string;
  filename: string;
  score: number;
  llm_response: string;
};

/** Best videos in a community (by zip), sorted by score highest to lowest. */
export async function getCommunityVideos(zipCode: string): Promise<CommunityVideo[]> {
  const params = new URLSearchParams({ zip: zipCode });
  const res = await fetch(`${API_BASE}/api/community/videos?${params}`);
  if (!res.ok) throw new Error("Failed to load videos.");
  const data = await res.json();
  return data.videos ?? [];
}
