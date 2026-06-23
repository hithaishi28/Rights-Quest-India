// Converts normal YouTube URLs into iframe-safe embed URLs.
export function getEmbedUrl(url) {
  const cleanUrl = String(url || "").trim().replace(/\(.+$/, "");
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1&playsinline=1`;
  }
  return "";
}
