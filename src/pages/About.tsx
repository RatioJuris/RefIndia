export default function About() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            About RefIndia
          </h1>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            RefIndia is an open-source academic and legal citation
            generator and converter developed under the RatioJuris
            initiative. The platform is designed to help students,
            researchers, academicians, legal professionals and
            institutions generate accurate citations across multiple
            internationally recognized citation styles.
          </p>

          <p className="text-slate-700 leading-relaxed mb-8">
            RefIndia supports references for books, journal articles,
            research papers, conference proceedings, theses,
            dissertations, legal case laws, statutes, government
            publications and web-based resources.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Supported Citation Styles
            </h2>

            <ul className="grid md:grid-cols-2 gap-3 text-slate-700">
              <li>APA 7th Edition</li>
              <li>Harvard Style</li>
              <li>Indian Law Institute (ILI)</li>
              <li>Oxford (OSCOLA)</li>
              <li>MLA 9th Edition</li>
              <li>IEEE Style</li>
              <li>Chicago Style</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Supported Source Types
            </h2>

            <ul className="grid md:grid-cols-2 gap-3 text-slate-700">
              <li>Books</li>
              <li>Journal Articles</li>
              <li>Research Papers</li>
              <li>Conference Papers</li>
              <li>Theses</li>
              <li>Dissertations</li>
              <li>Case Laws</li>
              <li>Statutes & Legislation</li>
              <li>Government Reports</li>
              <li>Web Resources</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Project Vision
            </h2>

            <p className="text-slate-700 leading-relaxed">
              RefIndia seeks to provide an accessible, transparent and
              reliable citation platform for academic and legal
              research. The project aims to support higher education,
              scholarly publishing and legal writing by simplifying the
              process of reference management while maintaining
              compliance with established citation standards.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Future Integrations
            </h2>

            <ul className="grid md:grid-cols-2 gap-3 text-slate-700">
              <li>DOI Metadata Lookup</li>
              <li>Crossref Integration</li>
              <li>Google Books Support</li>
              <li>Open Library Integration</li>
              <li>Shodhganga Compatibility</li>
              <li>UGC CARE Resources</li>
              <li>BibTeX Export</li>
              <li>RIS Export</li>
              <li>Citation Collections</li>
            </ul>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">
              License
            </h2>

            <p className="text-slate-700 leading-relaxed">
              RefIndia is licensed under the
              <strong> The Open Journal License (TOJL)</strong>.
            </p>

            <p className="text-slate-700 mt-4">
              Copyright © 2026 RatioJuris.
            </p>

            <p className="text-slate-500 text-sm mt-4">
              Website:
              {" "}
              <a
                href="https://ratiojuris.github.io/refIndia/"
                className="text-blue-700 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                ratiojuris.github.io/refIndia
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
