import { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const EMBED_SCRIPT_SRC = 'https://www.instagram.com/embed.js';

/** Loads Instagram embed.js and re-processes embeds when deps change (SPA-safe). */
export function useInstagramEmbeds(active: boolean, deps: unknown[] = []) {
  useEffect(() => {
    if (!active) return;

    const processEmbeds = () => window.instgrm?.Embeds.process();

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT_SRC}"]`
    );

    if (existing) {
      processEmbeds();
      return;
    }

    const script = document.createElement('script');
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.onload = processEmbeds;
    document.body.appendChild(script);
  }, [active, ...deps]);
}
