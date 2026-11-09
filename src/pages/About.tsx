import { LEGAL_URL } from "../components/Layout";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">About RefIndia</h1>

      <div className="card mt-8 space-y-8 p-6 text-slate-700 md:p-8 dark:text-slate-300">
        <section>
          <p className="text-lg">
            RefIndia is a free, open-source citation generator for Indian legal and academic writing, developed by{" "}
            <a className="text-brand-700 underline dark:text-saffron-400" href="https://ratiojuris.github.io/">RatioJuris</a>.
          </p>
          <p className="mt-3">
            General-purpose citation tools handle books and journal articles well, but rarely Indian law reports such as SCC, AIR or SCC OnLine,
            or Indian Acts. RefIndia combines the official Citation Style Language styles with its own formatter for Indian cases and statutes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Privacy</h2>
          <p className="mt-2">
            RefIndia runs entirely in your browser. There is no account, no server, no cookies and no analytics.
            DOI and ISBN lookups are sent directly from your browser to doi.org, Open Library or Google Books.
          </p>
          <p className="mt-2">
            <a className="text-brand-700 underline dark:text-saffron-400" href={`${LEGAL_URL}privacy/`}>Privacy Policy</a> ·{" "}
            <a className="text-brand-700 underline dark:text-saffron-400" href={`${LEGAL_URL}terms/`}>Terms of Use</a> ·{" "}
            <a className="text-brand-700 underline dark:text-saffron-400" href={`${LEGAL_URL}support/`}>Support</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Built with</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li><a className="underline" href="https://citation.js.org/">citation.js</a> and citeproc-js (MIT)</li>
            <li>Styles from the <a className="underline" href="https://citationstyles.org/">Citation Style Language</a> project (CC BY-SA 3.0)</li>
            <li>Metadata from <a className="underline" href="https://www.doi.org/">doi.org</a>, <a className="underline" href="https://openlibrary.org/">Open Library</a> and <a className="underline" href="https://books.google.com/">Google Books</a></li>
            <li>React, Vite, Tailwind CSS and Lucide icons</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Licence</h2>
          <p className="mt-2">
            RefIndia is released under the MIT licence. The source code is on{" "}
            <a className="text-brand-700 underline dark:text-saffron-400" href="https://github.com/RatioJuris/RefIndia">GitHub</a>, where
            suggestions and corrections are welcome.
          </p>
        </section>
      </div>
    </div>
  );
}
