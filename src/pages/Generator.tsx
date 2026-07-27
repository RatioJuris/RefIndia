import { useMemo, useState } from "react";
import {
  BookOpen,
  FileText,
  GraduationCap,
  Scale,
  FileBadge,
  ScrollText,
  Copy,
} from "lucide-react";

const SOURCE_TYPES = [
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

const CITATION_STYLES = [
  "APA 7th",
  "Harvard",
  "ILI",
  "Oxford (OSCOLA)",
  "MLA 9th",
  "IEEE",
  "Chicago",
];

export default function Generator() {
  const [sourceType, setSourceType] = useState("Book");
  const [style, setStyle] = useState("APA 7th");

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [journal, setJournal] = useState("");
  const [year, setYear] = useState("");
  const [volume, setVolume] = useState("");
  const [issue, setIssue] = useState("");
  const [pages, setPages] = useState("");

  const citation = useMemo(() => {
    if (!author || !title) return "";

    switch (style) {
      case "APA 7th":
        return `${author} (${year}). ${title}. ${
          journal || publisher
        }. ${volume ? `${volume}` : ""}${
          issue ? `(${issue})` : ""
        }${pages ? `, ${pages}` : ""}.`;

      case "Harvard":
        return `${author} (${year}) ${title}. ${
          journal || publisher
        }.`;

      case "ILI":
        return `${author}, ${title} (${publisher || journal}, ${year}).`;

      case "Oxford (OSCOLA)":
        return `${author}, ${title} (${publisher || journal} ${year}).`;

      case "MLA 9th":
        return `${author}. ${title}. ${
          publisher || journal
        }, ${year}.`;

      case "IEEE":
        return `${author}, "${title}," ${
          journal || publisher
        }, ${year}.`;

      case "Chicago":
        return `${author}. ${title}. ${
          publisher || journal
        }, ${year}.`;

      default:
        return "";
    }
  }, [
    author,
    title,
    publisher,
    journal,
    year,
    volume,
    issue,
    pages,
    style,
  ]);

  const copyCitation = async () => {
    if (!citation) return;
    await navigator.clipboard.writeText(citation);
    alert("Citation copied successfully.");
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Citation Generator
          </h1>

          <p className="mt-3 text-slate-600">
            Generate academic and legal citations in APA, Harvard,
            ILI, Oxford (OSCOLA), MLA, IEEE and Chicago styles.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">
                Resource Type
              </label>

              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                {SOURCE_TYPES.map((item) => (
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
                {CITATION_STYLES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block mb-2 font-medium">
                Author / Editor
              </label>

              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Enter author name"
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
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Publisher / Institution
              </label>

              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Journal
              </label>

              <input
                type="text"
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Volume
              </label>

              <input
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Issue
              </label>

              <input
                type="text"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Pages
              </label>

              <input
                type="text"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="1-25"
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              Generated Citation
            </h2>

            {citation && (
              <button
                onClick={copyCitation}
                className="flex items-center gap-2 text-blue-700"
              >
                <Copy size={18} />
                Copy
              </button>
            )}
          </div>

          {citation ? (
            <div className="bg-slate-100 p-4 rounded-lg break-words">
              {citation}
            </div>
          ) : (
            <p className="text-slate-500">
              Complete the form to generate a citation.
            </p>
          )}
        </div>

        {/* Resource Types */}
        <div className="grid md:grid-cols-5 gap-5 mt-8">
          <div className="bg-white p-4 rounded-xl shadow">
            <BookOpen className="mb-2 text-blue-700" />
            <p className="font-medium">Books</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <FileText className="mb-2 text-blue-700" />
            <p className="font-medium">Journals</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <GraduationCap className="mb-2 text-blue-700" />
            <p className="font-medium">Theses</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <Scale className="mb-2 text-blue-700" />
            <p className="font-medium">Case Law</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <ScrollText className="mb-2 text-blue-700" />
            <p className="font-medium">Statutes</p>
          </div>
        </div>
      </div>
    </main>
  );
}
