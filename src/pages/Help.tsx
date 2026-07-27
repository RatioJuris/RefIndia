export default function Help() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            Help & User Guide
          </h1>

          <p className="text-slate-700 leading-relaxed mb-8">
            RefIndia helps students, researchers, academicians and legal
            professionals generate and convert citations for academic and
            legal publications. This guide explains how to use the platform
            effectively.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Getting Started
            </h2>

            <ol className="list-decimal list-inside space-y-3 text-slate-700">
              <li>Open the Citation Generator.</li>
              <li>Select the source type.</li>
              <li>Choose a citation style.</li>
              <li>Enter publication details.</li>
              <li>Click <strong>Generate Citation</strong>.</li>
              <li>Copy or export the generated reference.</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Supported Citation Styles
            </h2>

            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>APA 7th Edition</li>
              <li>Harvard Style</li>
              <li>Indian Law Institute (ILI)</li>
              <li>Oxford Standard for Citation of Legal Authorities (OSCOLA)</li>
              <li>MLA 9th Edition</li>
              <li>IEEE Style</li>
              <li>Chicago Style</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Supported Resource Types
            </h2>

            <ul className="grid md:grid-cols-2 gap-2 text-slate-700">
              <li>Books</li>
              <li>Journal Articles</li>
              <li>Research Papers</li>
              <li>Conference Papers</li>
              <li>Theses</li>
              <li>Dissertations</li>
              <li>Case Laws</li>
              <li>Statutes</li>
              <li>Government Reports</li>
              <li>Web Resources</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Citation Converter
            </h2>

            <p className="text-slate-700 leading-relaxed">
              Use the Citation Converter to transform references from one
              supported style into another. Select the original citation
              style, choose the target style and review the converted output.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg">
                  Is RefIndia free to use?
                </h3>
                <p className="text-slate-700">
                  Yes. RefIndia is freely available for educational,
                  academic and research purposes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Are generated citations guaranteed to be correct?
                </h3>
                <p className="text-slate-700">
                  RefIndia assists in generating citations, but users should
                  always verify references according to the requirements of
                  their institution, journal or court.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Does RefIndia support legal citation formats?
                </h3>
                <p className="text-slate-700">
                  Yes. RefIndia supports both ILI and OSCOLA styles for legal
                  research and legal writing.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Can I use RefIndia for dissertations and theses?
                </h3>
                <p className="text-slate-700">
                  Yes. RefIndia includes support for theses, dissertations,
                  books, journals and research papers.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Future Features
            </h2>

            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>DOI Lookup</li>
              <li>ISBN Metadata Search</li>
              <li>Crossref Integration</li>
              <li>Google Books Integration</li>
              <li>Shodhganga Support</li>
              <li>BibTeX Export</li>
              <li>RIS Export</li>
              <li>Citation Collection Manager</li>
            </ul>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Support
            </h2>

            <p className="text-slate-700">
              RefIndia is maintained by RatioJuris.
            </p>

            <p className="mt-3 text-slate-700">
              Website:{" "}
              <a
                href="https://ratiojuris.github.io/refIndia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                ratiojuris.github.io/refIndia
              </a>
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Licensed under The Open Journal License (TOJL).
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Copyright © 2026 RatioJuris.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
