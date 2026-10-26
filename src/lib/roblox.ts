import { createServerFn } from "@tanstack/react-start";
import { championRoster } from "./mock-data";

export type RobloxProfile = { id: number; name: string; displayName: string; avatar: string | null };

/**
 * Fetches display names and avatar busts for the champion roster on the server
 * (Roblox's APIs block direct browser calls via CORS). Any failure returns
 * partial/empty data and the UI falls back to initials. Keys are user ids (as strings).
 */
export const getRobloxProfiles = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, RobloxProfile>> => {
    const ids = championRoster.map((p) => p.id);
    const out: Record<string, RobloxProfile> = {};

    try {
      const r = await fetch("https://users.roblox.com/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: ids, excludeBannedUsers: false }),
      });
      const j = (await r.json()) as { data?: { id: number; name: string; displayName: string }[] };
      for (const u of j.data ?? []) {
        out[String(u.id)] = { id: u.id, name: u.name, displayName: u.displayName, avatar: null };
      }
    } catch {}

    try {
      const r = await fetch(
        `https://thumbnails.roblox.com/v1/users/avatar-bust?userIds=${ids.join(",")}&size=352x352&format=Png&isCircular=false`,
      );
      const j = (await r.json()) as { data?: { targetId: number; imageUrl: string | null }[] };
      for (const x of j.data ?? []) {
        const k = String(x.targetId);
        const base = out[k] ?? { id: x.targetId, name: "", displayName: "", avatar: null };
        out[k] = { ...base, avatar: x.imageUrl };
      }
    } catch {}

    return out;
  },
);
