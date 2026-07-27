import { useState } from "react";
import {
  ArrowRightLeft,
  Copy,
  RefreshCw,
  Trash2,
} from "lucide-react";

const STYLES = [
  "APA 7th",
  "Harvard",
  "ILI",
  "Oxford (OSCOLA)",
  "MLA 9th",
  "IEEE",
  "Chicago",
];

export default function Converter() {
  const [sourceStyle, setSourceStyle] = useState("APA 7th");
  const [targetStyle, setTargetStyle] = useState("Harvard");
  const [inputCitation, setInputCitation] = useState("");
  const [outputCitation, setOutputCitation] = useState("");

  const convertCitation = () => {
    if (!inputCitation.trim()) {
      setOutputCitation("");
      return;
    }

    // TODO:
    // Replace with real citation parser/converter logic

    const result = `[${targetStyle}] ${inputCitation}`;

    setOutputCitation(result);
  };

  const swapStyles = () => {
    const temp = sourceStyle;
    setSourceStyle(targetStyle);
    setTargetStyle(temp);
  };

  const clearForm = () => {
    setInputCitation("");
    setOutputCitation("");
  };

  const copyOutput = async () => {
    if (!outputCitation) return;

    await navigator.clipboard.writeText(outputCitation);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Citation Converter
          </h1>

          <p className="mt-3 text-slate-600">
            Convert citations between APA, Harvard,
            ILI, OSCOLA, MLA, IEEE and Chicago styles.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block mb-2 font-medium">
                Source Style
              </label>

              <select
                value={sourceStyle}
                onChange={(e) => setSourceStyle(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                {STYLES.map((style) => (
                  <option key={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={swapStyles}
                className="p-3 border rounded-full hover:bg-slate-100"
                title="Swap Styles"
              >
                <ArrowRightLeft size={20} />
              </button>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Target Style
              </label>

              <select
                value={targetStyle}
                onChange={(e) => setTargetStyle(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                {STYLES.map((style) => (
                  <option key={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input */}
          <div className="mt-8">
            <label className="block mb-2 font-medium">
              Original Citation
            </label>

            <textarea
              value={inputCitation}
              onChange={(e) =>
                setInputCitation(e.target.value)
              }
              rows={8}
              placeholder="Paste the citation you want to convert..."
              className="w-full border rounded-lg p-4 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={convertCitation}
              className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
            >
              <RefreshCw size={18} />
              Convert Citation
            </button>

            <button
              onClick={clearForm}
              className="flex items-center gap-2 border px-6 py-3 rounded-lg hover:bg-slate-100"
            >
              <Trash2 size={18} />
              Clear
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              Converted Citation
            </h2>

            {outputCitation && (
              <button
                onClick={copyOutput}
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
              >
                <Copy size={18} />
                Copy
              </button>
            )}
          </div>

          {outputCitation ? (
            <div className="bg-slate-100 p-5 rounded-lg break-words">
              {outputCitation}
            </div>
          ) : (
            <p className="text-slate-500">
              Converted citation will appear here.
            </p>
          )}
        </div>

        {/* Supported Styles */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-6">
            Supported Citation Styles
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {STYLES.map((style) => (
              <div
                key={style}
                className="bg-slate-100 rounded-lg p-4 text-center font-medium"
              >
                {style}
              </div>
            ))}
          </div>
        </div>

        {/* Notice */}
        <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-900">
            Conversion results should always be reviewed before
            submission to journals, universities, publishers or
            courts. Citation requirements may vary between
            institutions and publications.
          </p>
        </div>
      </div>
    </main>
  );
}
