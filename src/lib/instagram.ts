/** True when the URL points at a post, reel, or IGTV item (not a profile). */
export function isInstagramPostUrl(url: string): boolean {
  return /\/(p|reel|tv)\//.test(url);
}

/** iframe src for a profile or post permalink. */
export function instagramEmbedSrc(url: string): string {
  const postMatch = url.match(/instagram\.com\/(p|reel|tv)\/([^/?#]+)/i);
  if (postMatch) {
    return `https://www.instagram.com/${postMatch[1]}/${postMatch[2]}/embed`;
  }

  const profileMatch = url.match(/instagram\.com\/([^/?#]+)\/?$/i);
  if (profileMatch && !['p', 'reel', 'tv', 'stories', 'explore'].includes(profileMatch[1])) {
    return `https://www.instagram.com/${profileMatch[1]}/embed`;
  }

  return url.endsWith('/embed') ? url : `${url.replace(/\/$/, '')}/embed`;
}

export function normalizeInstagramPermalink(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}
