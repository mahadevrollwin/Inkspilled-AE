export function cleanImageSrc(src: string): string {
  return src.replace(/[?#].*$/, "");
}
