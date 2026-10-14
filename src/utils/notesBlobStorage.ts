import { getStore } from "@netlify/blobs";
import fs from "node:fs";
import path from "node:path";

const STORE_NAME = "notes-likes";

// Sanitize noteId for use as a blob key
export function sanitizeNoteKey(noteId: string): string {
  return noteId.trim().replace(/\//g, "--");
}

// Local cache file fallback for local development when Netlify Blobs context is unavailable
const LOCAL_CACHE_DIR = path.resolve(process.cwd(), ".cache");
const LOCAL_CACHE_FILE = path.resolve(LOCAL_CACHE_DIR, "notes-likes.json");

function readLocalFallback(): Record<string, number> {
  try {
    if (fs.existsSync(LOCAL_CACHE_FILE)) {
      const data = fs.readFileSync(LOCAL_CACHE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("[notesBlobStorage] Failed to read local fallback cache:", err);
  }
  return {};
}

function writeLocalFallback(data: Record<string, number>): void {
  try {
    if (!fs.existsSync(LOCAL_CACHE_DIR)) {
      fs.mkdirSync(LOCAL_CACHE_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("[notesBlobStorage] Failed to write local fallback cache:", err);
  }
}

function isNetlifyContextAvailable(): boolean {
  // Check if we are running in Netlify environment or have Netlify credentials set
  return Boolean(
    process.env.NETLIFY ||
    process.env.NETLIFY_BLOBS_CONTEXT ||
    (process.env.NETLIFY_SITE_ID && process.env.NETLIFY_PAT)
  );
}

/**
 * Gets the current like count for a given noteId.
 */
export async function getNoteLikes(noteId: string, fallbackLikes: number = 0): Promise<number> {
  const key = sanitizeNoteKey(noteId);

  if (isNetlifyContextAvailable()) {
    try {
      const store = getStore(STORE_NAME);
      const val = await store.get(key, { type: "json" });
      if (typeof val === "number") {
        return val;
      }
      if (val && typeof (val as { likes?: number }).likes === "number") {
        return (val as { likes: number }).likes;
      }
    } catch (err) {
      console.warn(`[notesBlobStorage] Netlify Blobs get failed for note ${key}, using fallback:`, err);
    }
  }

  // Fallback to local cache file
  const localData = readLocalFallback();
  if (typeof localData[key] === "number") {
    return localData[key];
  }

  return fallbackLikes;
}

/**
 * Increments the like count for a given noteId by delta (default 1).
 * Returns the new like count.
 */
export async function incrementNoteLikes(
  noteId: string,
  delta: number = 1,
  fallbackLikes: number = 0
): Promise<number> {
  const key = sanitizeNoteKey(noteId);
  const currentCount = await getNoteLikes(noteId, fallbackLikes);
  const newCount = Math.max(0, currentCount + delta);

  if (isNetlifyContextAvailable()) {
    try {
      const store = getStore(STORE_NAME);
      await store.setJSON(key, { likes: newCount, updatedAt: new Date().toISOString() });
      return newCount;
    } catch (err) {
      console.warn(`[notesBlobStorage] Netlify Blobs set failed for note ${key}, updating local fallback:`, err);
    }
  }

  // Fallback to local cache file
  const localData = readLocalFallback();
  localData[key] = newCount;
  writeLocalFallback(localData);

  return newCount;
}
