export interface CitationFormData {
  source: string;
  style: string;
  author: string;
  title: string;
  publisher: string;
  year: string;
}

interface CitationFormProps {
  data: CitationFormData;
  sources: string[];
  styles: string[];
  onChange: (field: keyof CitationFormData, value: string) => void;
}

export default function CitationForm({
  data,
  sources,
  styles,
  onChange,
}: CitationFormProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 font-medium">
          Resource Type
        </label>

        <select
          value={data.source}
          onChange={(e) =>
            onChange("source", e.target.value)
          }
          className="w-full border rounded-lg p-3"
        >
          {sources.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Citation Style
        </label>

        <select
          value={data.style}
          onChange={(e) =>
            onChange("style", e.target.value)
          }
          className="w-full border rounded-lg p-3"
        >
          {styles.map((item) => (
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
          value={data.author}
          onChange={(e) =>
            onChange("author", e.target.value)
          }
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
          value={data.year}
          onChange={(e) =>
            onChange("year", e.target.value)
          }
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
          value={data.title}
          onChange={(e) =>
            onChange("title", e.target.value)
          }
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
          value={data.publisher}
          onChange={(e) =>
            onChange("publisher", e.target.value)
          }
          placeholder="Publisher, University or Journal"
          className="w-full border rounded-lg p-3"
        />
      </div>
    </div>
  );
}
