/**
 * Konfigurasi lagu YouTube untuk backsound gaje.lol.
 * Anda dapat mengganti nilai YOUTUBE_TRACK_URL di bawah ini dengan tautan YouTube apa saja.
 *
 * Format yang didukung:
 * - https://www.youtube.com/watch?v=...
 * - https://youtu.be/...
 * - Atau langsung ID video 11 karakter (contoh: "5qap5aO4i9A")
 */
export const DEFAULT_YOUTUBE_TRACK = "https://www.youtube.com/watch?v=zn1q6MRocfQ";
export const YOUTUBE_VIDEO_ID = "zn1q6MRocfQ";

export function extractYouTubeId(input: string): string {
  if (!input) return "5qap5aO4i9A";
  const trimmed = input.trim();
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return match[1];
  }
  if (trimmed.length === 11) {
    return trimmed;
  }
  return "5qap5aO4i9A";
}
