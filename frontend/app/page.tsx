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
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <UserForm onSuccess={handleSuccess} />;
  }

  return <CommunitiesView user={user} />;
}
