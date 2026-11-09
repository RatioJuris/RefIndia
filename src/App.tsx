import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Help from "./pages/Help";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// The citation engine is large, so the tool pages load it only when they are opened.
const Generator = lazy(() => import("./pages/Generator"));
const Lookup = lazy(() => import("./pages/Lookup"));
const Converter = lazy(() => import("./pages/Converter"));

function Loading() {
  return <p className="px-5 py-24 text-center text-slate-500">Loading the citation engine…</p>;
}

// HashRouter keeps every page working on GitHub Pages, including after a refresh.
export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="generator" element={<Generator />} />
            <Route path="lookup" element={<Lookup />} />
            <Route path="converter" element={<Converter />} />
            <Route path="help" element={<Help />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
