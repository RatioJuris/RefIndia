import { Copy } from "lucide-react";

interface CitationPreviewProps {
  citation: string;
}

export default function CitationPreview({
  citation,
}: CitationPreviewProps) {
  const copyCitation = async () => {
    await navigator.clipboard.writeText(citation);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">
          Generated Citation
        </h3>

        {citation && (
          <button
            onClick={copyCitation}
            className="flex items-center gap-2 text-blue-700"
          >
            <Copy size={16} />
            Copy
          </button>
        )}
      </div>

      <div className="bg-slate-100 rounded-lg p-4 min-h-[120px]">
        {citation ||
          "Complete the form to generate a citation."}
      </div>
    </div>
  );
}
