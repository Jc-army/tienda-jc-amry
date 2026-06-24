export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=600&auto=format&fit=crop';

/**
 * Handle image load errors with an intelligent fallback chain:
 * 1. If it's a Google Drive URL, try the lh3.googleusercontent.com format
 * 2. If that also fails (or it's not a Drive URL), show a placeholder
 */
export function handleImageError(e) {
  // Prevent infinite loop if the fallback itself fails
  e.target.onerror = null;

  // If it's a Google Drive URL, try the alternative CDN format
  if (e.target.src.includes('drive.google.com/uc?export=view&id=')) {
    const match = e.target.src.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      e.target.src = `https://lh3.googleusercontent.com/d/${match[1]}`;
      return;
    }
  }

  // Ultimate fallback: show a placeholder
  e.target.src = PLACEHOLDER_IMAGE;
}
