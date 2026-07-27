import { useState } from "react";
import {
  BookOpen,
  FileText,
  GraduationCap,
  Scale,
} from "lucide-react";

const citationTypes = [
  "Journal Article",
  "Research Paper",
  "Book",
  "Thesis",
  "Dissertation",
  "Case Law",
];

const citationStyles = [
  "APA 7th",
  "Harvard",
  "ILI",
  "Oxford (OSCOLA)",
  "MLA 9th",
  "IEEE",
  "Chicago",
];

export default function Generator() {
  const [citationType, setCitationType] = useState("Journal Article");
  const [citationStyle, setCitationStyle] = useState("APA 7th");

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");

  const [result, setResult] = useState("");

  const generateCitation = () => {
    let citation = "";

    switch (citationStyle) {
      case "APA 7th":
        citation = `${author} (${year}). ${title}. ${publisher}.`;
        break;

      case "Harvard":
        citation = `${author} (${year}) ${title}. ${publisher}.`;
        break;

      case "ILI":
        citation = `${author}, ${title} (${publisher}, ${year}).`;
        break;

      case "Oxford (OSCOLA)":
        citation = `${author}, ${title} (${publisher} ${year}).`;
        break;

      case "MLA 9th":
        citation = `${author}. ${title}. ${publisher}, ${year}.`;
        break;

      case "IEEE":
        citation = `${author}, "${title}," ${publisher}, ${year}.`;
        break;

      case "Chicago":
        citation = `${author}. ${title}. ${publisher}, ${year}.`;
        break;

      default:
        citation = `${author} ${title}`;
    }

    setResult(citation);
  };

  const copyCitation = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    alert("Citation copied to clipboard.");
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-2">
          Citation Generator
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Generate academic and legal citations in APA, Harvard,
          ILI, OSCOLA, MLA, IEEE and Chicago formats.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Citation Type */}
            <div>
              <label className="block mb-2 font-medium">
                Citation Type
              </label>

              <select
                value={citationType}
                onChange={(e) => setCitationType(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                {citationTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Citation Style */}
            <div>
              <label className="block mb-2 font-medium">
                Citation Style
              </label>

              <select
                value={citationStyle}
                onChange={(e) => setCitationStyle(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                {citationStyles.map((style) => (
                  <option key={style}>{style}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block mb-2 font-medium">
                Author
              </label>

              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Author name"
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
                className="w-full border rounded-lg p-3"
                placeholder="2026"
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
                className="w-full border rounded-lg p-3"
                placeholder="Publication title"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Publisher / Journal / Institution
              </label>

              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Journal, Publisher or University"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={generateCitation}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
            >
              Generate Citation
            </button>

            <button
              onClick={copyCitation}
              className="border border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              Copy Citation
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Generated Citation
          </h2>

          {result ? (
            <div className="bg-slate-100 rounded-lg p-4 break-words">
              {result}
            </div>
          ) : (
            <p className="text-gray-500">
              Your generated citation will appear here.
            </p>
          )}
        </div>

        {/* Quick Access */}
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <div className="bg-white p-5 rounded-xl shadow">
            <BookOpen className="mb-3 text-blue-700" />
            <h3 className="font-semibold">Books</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <FileText className="mb-3 text-blue-700" />
            <h3 className="font-semibold">Journals</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <GraduationCap className="mb-3 text-blue-700" />
            <h3 className="font-semibold">Thesis</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <Scale className="mb-3 text-blue-700" />
            <h3 className="font-semibold">Case Law</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
