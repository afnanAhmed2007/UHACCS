"use client";

import { useState, useEffect } from "react";
import { getStoredUser, setStoredUser } from "@/lib/storage";
import type { User } from "@/lib/api";
import UserForm from "./user-form";
import CommunitiesView from "./communities";

export default function Home() {
  const [user, setUserState] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUserState(getStoredUser());
  }, []);

  function handleSuccess(u: User) {
    setStoredUser(u);
    setUserState(u);
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#bbf7d0] border-t-[#15803d]" />
        <p className="text-sm font-semibold text-[#166534]">Loading R U Kind…</p>
      </div>
    );
  }

  if (!user) {
    return <UserForm onSuccess={handleSuccess} />;
  }

  return <CommunitiesView user={user} />;
}
