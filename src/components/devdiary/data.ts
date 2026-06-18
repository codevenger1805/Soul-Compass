// User-owned data, persisted in localStorage. No seed content.
import { useEffect, useState, useCallback } from "react";

export type Hue = "indigo" | "emerald" | "amber" | "violet";
export type MoodName = "Heavy" | "Tender" | "Calm" | "Focused" | "Curious" | "Radiant";

export type Entry = {
  id: string;
  date: string;          // ISO timestamp
  title: string;
  excerpt: string;
  mood: MoodName;
  energy: number;        // 1..5
  tags: string[];
  chapter?: string;
  hue: Hue;
};

export type Letter = {
  id: string;
  to: string;
  preview: string;
  arrival: string;       // ISO date
  createdAt: string;     // ISO timestamp
};

const ENTRIES_KEY = "devdiary:entries";
const LETTERS_KEY = "devdiary:letters";

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("devdiary:store", { detail: key }));
  } catch {}
}

function useStore<T>(key: string) {
  const [items, setItems] = useState<T[]>([]);
  useEffect(() => {
    setItems(read<T>(key));
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail === key) setItems(read<T>(key));
    };
    window.addEventListener("devdiary:store", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("devdiary:store", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [key]);
  return [items, setItems] as const;
}

export function useEntries() {
  const [entries] = useStore<Entry>(ENTRIES_KEY);
  const add = useCallback((entry: Omit<Entry, "id" | "date"> & { date?: string }) => {
    const next: Entry = {
      ...entry,
      id: `e_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      date: entry.date ?? new Date().toISOString(),
    };
    const list = [next, ...read<Entry>(ENTRIES_KEY)];
    write(ENTRIES_KEY, list);
    return next;
  }, []);
  const remove = useCallback((id: string) => {
    write(ENTRIES_KEY, read<Entry>(ENTRIES_KEY).filter((e) => e.id !== id));
  }, []);
  return { entries, add, remove };
}

export function useLetters() {
  const [letters] = useStore<Letter>(LETTERS_KEY);
  const add = useCallback((letter: Omit<Letter, "id" | "createdAt">) => {
    const next: Letter = {
      ...letter,
      id: `l_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    write(LETTERS_KEY, [next, ...read<Letter>(LETTERS_KEY)]);
    return next;
  }, []);
  const remove = useCallback((id: string) => {
    write(LETTERS_KEY, read<Letter>(LETTERS_KEY).filter((l) => l.id !== id));
  }, []);
  return { letters, add, remove };
}

// Helpers
export function formatDateLabel(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return "Today";
  const yest = new Date(now); yest.setDate(now.getDate() - 1);
  if (d.toDateString() === yest.toDateString()) return "Yesterday";
  const sameYear = d.getFullYear() === now.getFullYear();
  return d.toLocaleDateString(undefined, sameYear
    ? { month: "short", day: "numeric" }
    : { month: "short", day: "numeric", year: "numeric" });
}

export function groupByChapter(entries: Entry[]) {
  const map = new Map<string, Entry[]>();
  for (const e of entries) {
    const key = e.chapter?.trim() || "Untitled chapter";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return Array.from(map, ([name, items]) => ({ name, items }));
}
