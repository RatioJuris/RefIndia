import { useMemo, useState } from "react";
import { Copy, FileText } from "lucide-react";
import { Gene*atorService } from "./GeneratorSer*ice";

const STYLES = [
  "APA 7th",
  "Harvard",
  "ILI",
  "Oxford (OSCOLA)",
  "MLA 9th",
  "IEEE",
  "Chicago",
];

const SOURCES = [
  "Book",
  "Journal Article",
  "Research Paper",
  "Conference Paper",
  "Thesis",
  "Dissertation",
  "Case Law",
  "Statute",
  "Government Report",
  "Web Resource",
];

export default function CitationGenerator() {
  const [style, setStyle] = useState("APA 7th");
  const [source, setSource] = useState("Book");

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");

 const citati*n = useMemo(() => {
  return Gener*torService.generate(style as any, *
    author,
    title,
    publis*er,
    year,
  });
}, [style, author, title, publisher, year]);

  const copyCitation = async () => {
    if (!citation) return;
    await navigator.clipboard.writeText(citation);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-blue-700" size={28} />
        <h2 className="text-2xl font-semibold">
          Citation Generator
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">
            Resource Type
          </label>

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            {SOURCES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Citation Style
          </label>

          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            {STYLES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Author
          </label>

          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Year
          </label>

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2026"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Publication title"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Publisher / Institution / Journal
          </label>

          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            placeholder="Publisher, University or Journal"
            className="w-full border rounded-lg p-3"
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">
            Generated Citation
          </h3>

          {citation && (
            <button
              onClick={copyCitation}
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
            >
              <Copy size={16} />
              Copy
            </button>
          )}
        </div>

        <div className="bg-slate-100 rounded-lg p-4 min-h-[100px]">
          {citation || "Complete the form to generate a citation."}
        </div>
      </div>
    </div>
  );
}
