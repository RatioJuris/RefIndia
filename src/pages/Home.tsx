import {
  BookOpen,
  Scale,
  GraduationCap,
  RefreshCw,
  Search,
  FileText,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Journal Citations",
      description:
        "Generate citations for academic journals, law journals, and research publications.",
      icon: <FileText size={32} />,
      link: "/journal",
    },
    {
      title: "Research Papers",
      description:
        "Create accurate citations for articles, conference papers, and scholarly works.",
      icon: <BookOpen size={32} />,
      link: "/research-paper",
    },
    {
      title: "Thesis & Dissertation",
      description:
        "Generate citations for master's dissertations and doctoral theses.",
      icon: <GraduationCap size={32} />,
      link: "/thesis",
    },
    {
      title: "Legal Citations",
      description:
        "Cite case laws, statutes, regulations, AIR, SCC and legal materials.",
      icon: <Scale size={32} />,
      link: "/legal",
    },
    {
      title: "Citation Converter",
      description:
        "Convert citations between APA, Harvard, ILI, OSCOLA, MLA, IEEE and Chicago.",
      icon: <RefreshCw size={32} />,
      link: "/converter",
    },
    {
      title: "DOI & Metadata Lookup",
      description:
        "Retrieve publication details from DOI, ISBN, URL or metadata.",
      icon: <Search size={32} />,
      link: "/lookup",
    },
  ];

  const styles = [
    "APA 7th",
    "Harvard",
    "ILI",
    "Oxford (OSCOLA)",
    "MLA 9th",
    "IEEE",
    "Chicago",
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-4">RefIndia</h1>

          <p className="text-xl max-w-3xl mx-auto text-blue-100">
            Indian Academic & Legal Citation Generator and Converter
            for Journals, Research Papers, Books, Theses,
            Dissertations, Case Laws and Statutes.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            /generator-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50"
            >
              Generate Citation
            </a>

            <a
              href="/converter"
              className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:/}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Supported Citation Styles
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {styles.map((style) => (
              <span
                key={style}
                className="bg-white px-5 py-3 rounded-full shadow border text-gray-700 font-medium"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Citation Tools
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <a
                key={feature.title}
                href={feature.link}
                className="bg-white rounded-2xl p-6 shadow hover:shadow">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Built For
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-xl mb-3">
                Students & Scholars
              </h3>
              <p className="text-gray-600">
                Support for academic assignments, dissertations,
                theses and research publications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl mb-3">
                Law Students
              </h3>
              <p className="text-gray-600">
                Generate ILI and OSCOLA compliant citations
                for legal writing and moot courts.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl mb-3">
                Researchers & Faculty
              </h3>
              <p className="text-gray-600">
                Prepare publication-ready references across
                multiple citation standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Integrations */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Planned Integrations
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Shodhganga",
              "UGC CARE",
              "Crossref",
              "Google Books",
              "Open Library",
              "DOI Lookup",
              "BibTeX",
              "RIS Export",
              "ORCID",
            ].map((item) => (
              <span
                key={item}
                className="bg-slate-100 px-4 py-2 rounded-lg"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold">RefIndia</h3>

          <p className="mt-2">
            Academic & Legal Citation Generator and Converter
          </p>

          <p className="mt-4 text-sm text-slate-500">
            © {new Date().getFullYear()} Isrg. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
