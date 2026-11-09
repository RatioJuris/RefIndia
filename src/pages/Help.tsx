import { Link } from "react-router-dom";
import { STYLES } from "../lib/styles";

const REPORTERS = [
  ["Supreme Court Cases", "(2017) 10 SCC 1", "Year in round brackets, then volume, SCC and page"],
  ["All India Reporter", "AIR 1973 SC 1461", "AIR, year, court abbreviation and page"],
  ["Neutral citation (Supreme Court)", "2023 INSC 1", "Year, INSC and number"],
  ["SCC OnLine", "2019 SCC OnLine Del 1234", "Year, SCC OnLine, court and number"],
  ["Supreme Court Reports", "[1973] Supp SCR 1", "Year in square brackets, then volume or Supp, SCR and page"],
];

const FAQ = [
  ["Is RefIndia free?", "Yes. RefIndia is free and open source under the MIT licence, with no account and no limits."],
  ["Are the citations guaranteed to be correct?", "No tool can guarantee that. RefIndia follows the published styles closely, but universities, journals and courts often have their own rules. Always check the final citation against the rules you have been given."],
  ["Which ILI rules does RefIndia follow?", "Articles, books, chapters and theses use the Citation Style Language style for the Journal of the Indian Law Institute. Cases and statutes are formatted by RefIndia following the usual ILI forms, for example “Kesavananda Bharati v. State of Kerala, (1973) 4 SCC 225.”"],
  ["Why is there no bibliography in ILI?", "ILI is a footnote style. Use the footnote form for each citation."],
  ["Can I convert a citation I copied from a document?", "Not reliably, so RefIndia does not try. Free-text citations are ambiguous. Use the DOI or ISBN, or export BibTeX or RIS from your reference manager or the publisher's website, and paste that into the Converter."],
  ["Do you store what I type?", "No. RefIndia runs entirely in your browser and has no server. Lookups go straight from your browser to doi.org, Open Library or Google Books."],
];

export default function Help() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">Help</h1>

      <section className="card mt-8 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Getting started</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700 dark:text-slate-300">
          <li>Open the <Link className="text-brand-700 underline dark:text-saffron-400" to="/generator">Generator</Link> and choose what you are citing.</li>
          <li>Fill in the fields marked with an asterisk. The citation appears as soon as they are complete.</li>
          <li>Choose a style. Use <strong>Compare all styles</strong> to see every style at once.</li>
          <li>Click <strong>Copy</strong>. Italics are kept when you paste into Word or Google Docs.</li>
        </ol>
        <p className="mt-4 text-slate-700 dark:text-slate-300">
          Have a DOI or ISBN? Use <Link className="text-brand-700 underline dark:text-saffron-400" to="/lookup">Lookup</Link> to fill in the details automatically.
        </p>
      </section>

      <section className="card mt-6 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Citing Indian cases</h2>
        <p className="mt-3 text-slate-700 dark:text-slate-300">
          Enter the case name and the citation exactly as printed in the law report. RefIndia writes “v”, “v.” or “vs” the way each style requires.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs tracking-wider text-slate-500 uppercase">
              <tr><th className="py-2 pr-4">Report</th><th className="py-2 pr-4">Example</th><th className="py-2">Form</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {REPORTERS.map(([report, example, form]) => (
                <tr key={report}>
                  <td className="py-2.5 pr-4">{report}</td>
                  <td className="py-2.5 pr-4 font-mono whitespace-nowrap">{example}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-400">{form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card mt-6 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Styles</h2>
        <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-[10rem_1fr]">
          {STYLES.map((s) => (
            <div key={s.id} className="contents">
              <dt className="font-semibold text-slate-900 dark:text-white">{s.label}</dt>
              <dd className="text-slate-600 dark:text-slate-400">{s.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="card mt-6 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Questions</h2>
        <div className="mt-4 space-y-3">
          {FAQ.map(([q, a]) => (
            <details key={q} className="rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800">
              <summary className="cursor-pointer font-medium text-slate-900 dark:text-white">{q}</summary>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
