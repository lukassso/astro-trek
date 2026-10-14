import { useState, useEffect, useRef, useCallback } from "react";

interface NoteLikeButtonProps {
  noteId: string;
  initialLikes: number;
}

export default function NoteLikeButton({ noteId, initialLikes }: NoteLikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const pendingClicksRef = useRef(0);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch latest likes from server on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchLikes() {
      try {
        const res = await fetch(
          `/api/notes/like?noteId=${encodeURIComponent(noteId)}&initialLikes=${initialLikes}`
        );
        if (res.ok) {
          const data = await res.json();
          if (isMounted && typeof data.likes === "number") {
            setLikes(data.likes);
          }
        }
      } catch (err) {
        console.warn("[NoteLikeButton] Could not fetch remote likes:", err);
      }
    }

    fetchLikes();

    // Check if the user has liked this note previously on this device
    try {
      const likedNotes = JSON.parse(localStorage.getItem("likedNotes") || "{}");
      if (likedNotes[noteId]) {
        setHasLiked(true);
      }
    } catch {
      // Ignore localStorage read errors
    }

    return () => {
      isMounted = false;
    };
  }, [noteId, initialLikes]);

  // Flush pending likes to the server
  const flushLikes = useCallback(async () => {
    const delta = pendingClicksRef.current;
    if (delta <= 0) return;

    // Reset pending counter before async request
    pendingClicksRef.current = 0;

    try {
      const res = await fetch("/api/notes/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, delta, initialLikes }),
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof data.likes === "number") {
          // Sync with server count plus any newly arrived pending clicks
          setLikes(data.likes + pendingClicksRef.current);
        }
      }
    } catch (err) {
      console.warn("[NoteLikeButton] Failed to sync likes with server:", err);
    }
  }, [noteId]);

  // Handle like click (multi-click allowed)
  const handleLike = () => {
    // 1. Optimistic UI update
    setLikes((prev) => prev + 1);
    setHasLiked(true);
    setIsAnimating(true);

    // 2. Restart bounce animation
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 250);

    // 3. Mark in localStorage that user has interacted with this note
    try {
      const likedNotes = JSON.parse(localStorage.getItem("likedNotes") || "{}");
      likedNotes[noteId] = (likedNotes[noteId] || 0) + 1;
      localStorage.setItem("likedNotes", JSON.stringify(likedNotes));
    } catch {
      // Ignore localStorage write errors
    }

    // 4. Batch server request using debounce
    pendingClicksRef.current += 1;
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      flushLikes();
    }, 400);
  };

  // Ensure any unsent clicks are flushed on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      if (pendingClicksRef.current > 0) {
        // Use sendBeacon or standard fetch for unload flush
        const delta = pendingClicksRef.current;
        pendingClicksRef.current = 0;
        navigator.sendBeacon?.(
          "/api/notes/like",
          new Blob([JSON.stringify({ noteId, delta, initialLikes })], { type: "application/json" })
        );
      }
    };
  }, [noteId]);

  return (
    <button
      type="button"
      onClick={handleLike}
      className={`note-like-btn group flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium transition-all duration-150 select-none active:scale-95 ${
        hasLiked
          ? "text-red-500 hover:bg-red-500/10"
          : "text-gray-500 hover:text-red-400 hover:bg-red-500/5"
      } ${isAnimating ? "scale-110" : "scale-100"}`}
      aria-label="Like this note"
      title="Click to like (multiple claps allowed!)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={hasLiked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={hasLiked ? 0 : 2}
        className={`h-5 w-5 transition-transform duration-150 ${
          isAnimating ? "scale-125" : "group-hover:scale-110"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <span className="tabular-nums font-semibold">{likes}</span>
    </button>
  );
}
