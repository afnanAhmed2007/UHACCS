export const USER_KEY = "uhaccs_user";
export const COMMUNITIES_KEY = "uhaccs_communities";

export type User = { name: string; zip: string };
export type Community = { id: string; name: string; zip: string };

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw) as User;
    return u?.name && u?.zip ? u : null;
  } catch {
    return null;
  }
}

export function setUser(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
}

export function getCommunities(): Community[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMMUNITIES_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as Community[];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function setCommunities(communities: Community[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMMUNITIES_KEY, JSON.stringify(communities));
}

export function addCommunity(community: Omit<Community, "id">): Community {
  const list = getCommunities();
  const newOne: Community = {
    ...community,
    id: crypto.randomUUID(),
  };
  setCommunities([...list, newOne]);
  return newOne;
}
