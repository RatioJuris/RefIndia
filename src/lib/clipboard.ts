import { toPlainText } from "./legal";

/**
 * Copies a citation with formatting (italics survive pasting into Word or Google Docs),
 * falling back to plain text where rich copying is unavailable.
 */
export async function copyCitation(html: string): Promise<void> {
  const text = toPlainText(html);
  if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      return;
    } catch {
      // Fall through to plain text.
    }
  }
  await navigator.clipboard.writeText(text);
}

export function download(filename: string, content: string, type = "text/plain"): void {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
