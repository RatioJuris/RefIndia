import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Logo from "./Logo";

const NAV = [
  { to: "/generator", label: "Generator" },
  { to: "/lookup", label: "Lookup" },
  { to: "/converter", label: "Converter" },
  { to: "/help", label: "Help" },
  { to: "/about", label: "About" },
];

export const LEGAL_URL = "https://ratiojuris.github.io/legal/refindia/";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <Link to="/" className="flex items-center gap-2.5" aria-label="RefIndia home">
            <Logo className="h-9 w-9" />
            <span className="text-xl font-bold tracking-tight text-brand-700 dark:text-white">
              Ref<span className="text-saffron-500">India</span>
            </span>
          </Link>
          <nav aria-label="Main" className="-mx-2 flex flex-wrap gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-white"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between dark:text-slate-400">
          <p>
            <strong className="text-slate-700 dark:text-slate-200">RefIndia</strong> by{" "}
            <a className="hover:underline" href="https://ratiojuris.github.io/">RatioJuris</a> · Free and open
            source (MIT) · Runs in your browser
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="hover:underline" href={`${LEGAL_URL}privacy/`}>Privacy</a>
            <a className="hover:underline" href={`${LEGAL_URL}terms/`}>Terms</a>
            <a className="hover:underline" href={`${LEGAL_URL}support/`}>Support</a>
            <a className="hover:underline" href="https://github.com/RatioJuris/RefIndia">Source</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
