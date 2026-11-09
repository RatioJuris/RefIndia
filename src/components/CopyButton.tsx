import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyCitation } from "../lib/clipboard";

export default function CopyButton({ html, label = "Copy" }: { html: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await copyCitation(html);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 1800);
  };

  return (
    <button type="button" onClick={copy} className="btn-ghost" aria-live="polite">
      {state === "copied" ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label}
    </button>
  );
}
