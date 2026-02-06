"use client";

import { useState, useEffect } from "react";
import { getUser, setUser, type User } from "@/lib/storage";
import UserForm from "./user-form";
import CommunitiesView from "./communities";

export default function Home() {
  const [user, setUserState] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUserState(getUser());
  }, []);

  function handleUserCreated(u: User) {
    setUser(u);
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
    return <UserForm onCreated={handleUserCreated} />;
  }

  return <CommunitiesView user={user} />;
}
