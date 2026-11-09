import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileCode2, Gavel, Lock, Scale, Search } from "lucide-react";
import { formatCase, formatStatute } from "../lib/legal";
import { STYLES } from "../lib/styles";

const sampleCase = { name: "Kesavananda Bharati vs State of Kerala", citation: "(1973) 4 SCC 225" };
const sampleAct = { title: "The Information Technology Act, 2000", actNumber: "21 of 2000", section: "43" };

const EXAMPLES = [
  { label: "ILI", html: formatCase(sampleCase, "ili").citation },
  { label: "OSCOLA", html: formatCase(sampleCase, "oscola").citation },
  { label: "ILI", html: formatStatute(sampleAct, "ili").citation },
];

const TOOLS = [
  { to: "/generator", icon: Gavel, title: "Generator", text: "Cases, statutes, books, articles, chapters, theses, reports and web pages, formatted as you type." },
  { to: "/lookup", icon: Search, title: "Lookup", text: "Fetch real metadata by DOI or ISBN from doi.org, Open Library and Google Books." },
  { to: "/converter", icon: FileCode2, title: "Converter", text: "Turn BibTeX, RIS, CSL-JSON or a list of DOIs into a formatted bibliography." },
];

const AUDIENCE = [
  { icon: Scale, title: "Law students and advocates", text: "ILI and OSCOLA citations for moot memorials, dissertations, articles and written submissions." },
  { icon: BookOpen, title: "Students and scholars", text: "APA, Harvard, MLA, IEEE and Chicago for assignments, theses and research papers." },
  { icon: Lock, title: "Private by design", text: "Everything is formatted in your browser. No account, no server, no tracking." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-saffron-500/20 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-semibold tracking-wider text-saffron-400 uppercase">
              Free · Open source · No sign-up
            </p>
            <h1 className="text-4xl leading-tight font-bold md:text-6xl">
              Citations for Indian <span className="text-saffron-400">law</span> and academia.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-blue-100">
              Cite Supreme Court judgments, Acts, books, journal articles and theses in ILI, OSCOLA, APA, Harvard, MLA, IEEE and Chicago, correctly and in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/generator" className="btn bg-saffron-500 text-slate-950 hover:bg-saffron-400">
                Create a citation <ArrowRight size={16} aria-hidden />
              </Link>
              <Link to="/lookup" className="btn border border-white/30 text-white hover:bg-white/10">Look up a DOI or ISBN</Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
            <p className="mb-4 text-xs font-semibold tracking-wider text-blue-200 uppercase">Indian legal citations, done right</p>
            <ul className="space-y-4">
              {EXAMPLES.map((ex, i) => (
                <li key={i}>
                  <span className="text-xs font-semibold text-saffron-400">{ex.label}</span>
                  <p className="citation mt-1 font-serif text-lg leading-snug" dangerouslySetInnerHTML={{ __html: ex.html }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link key={tool.to} to={tool.to} className="card group p-6 transition hover:-translate-y-0.5 hover:border-brand-600 dark:hover:border-saffron-500">
              <tool.icon className="mb-4 text-brand-700 dark:text-saffron-400" size={28} aria-hidden />
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
                {tool.title}
                <ArrowRight size={16} className="opacity-0 transition group-hover:opacity-100" aria-hidden />
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{tool.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Eight styles, one form</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Built on the official Citation Style Language styles, plus RefIndia's own formatter for Indian cases and statutes.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {STYLES.map((s) => (
              <span key={s.id} title={s.description} className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium dark:border-slate-700">
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-8 md:grid-cols-3">
          {AUDIENCE.map((a) => (
            <div key={a.title}>
              <a.icon className="mb-3 text-saffron-500" size={26} aria-hidden />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{a.title}</h3>
              <p className="mt-1.5 text-slate-600 dark:text-slate-400">{a.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
