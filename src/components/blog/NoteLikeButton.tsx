import { useState, useEffect } from 'react';

interface NoteLikeButtonProps {
  noteId: string;
  initialLikes: number;
}

export default function NoteLikeButton({ noteId, initialLikes }: NoteLikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user already liked this note
    const likedNotes = JSON.parse(localStorage.getItem('likedNotes') || '{}');
    if (likedNotes[noteId]) {
      setIsLiked(true);
    }
  }, [noteId]);

  const handleLike = () => {
    if (isLiked) return; // Prevent multiple likes

    const likedNotes = JSON.parse(localStorage.getItem('likedNotes') || '{}');
    likedNotes[noteId] = true;
    localStorage.setItem('likedNotes', JSON.stringify(likedNotes));

    setLikes((prev) => prev + 1);
    setIsLiked(true);
    setIsAnimating(true);

    // Reset animation
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleLike}
      className={`note-like-btn flex items-center gap-1.5 transition-all duration-200 ${
        isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
      } ${isAnimating ? 'scale-125' : 'scale-100'}`}
      disabled={isLiked}
      aria-label={isLiked ? 'Already liked' : 'Like this note'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={isLiked ? 0 : 2}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <span className="text-sm font-medium">{likes}</span>
    </button>
  );
}
