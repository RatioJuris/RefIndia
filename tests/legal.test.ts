import { test } from "node:test";
import assert from "node:assert/strict";
import { formatCase, formatStatute, normaliseVersus, toPlainText, yearFromCitation } from "../src/lib/legal.ts";

const kesavananda = { name: "Kesavananda Bharati vs State of Kerala", citation: "(1973) 4 SCC 225" };
const itAct = { title: "The Information Technology Act, 2000", actNumber: "21 of 2000", section: "43" };
const text = (html: string | null) => (html === null ? null : toPlainText(html));

test("normalises every form of versus", () => {
  for (const name of ["A vs B", "A vs. B", "A versus B", "A v B", "A V. B"]) {
    assert.equal(normaliseVersus(name, "v."), "A v. B");
    assert.equal(normaliseVersus(name, "v"), "A v B");
  }
});

test("does not treat names containing v as a separator", () => {
  assert.equal(normaliseVersus("Vineet Narain v. Union of India", "v"), "Vineet Narain v Union of India");
});

test("finds the year in Indian citations", () => {
  assert.equal(yearFromCitation("(1973) 4 SCC 225"), "1973");
  assert.equal(yearFromCitation("AIR 1950 SC 27"), "1950");
  assert.equal(yearFromCitation("2023 INSC 1"), "2023");
  assert.equal(yearFromCitation("no year"), "");
});

test("ILI case footnote", () => {
  const out = formatCase(kesavananda, "ili");
  assert.equal(out.citation, "<i>Kesavananda Bharati v. State of Kerala</i>, (1973) 4 SCC 225.");
  assert.equal(out.bibliography, null);
});

test("ILI case with court and pinpoint", () => {
  const out = formatCase({ ...kesavananda, citation: "2019 SCC OnLine Del 1234", court: "Del HC", pinpoint: "para 23" }, "ili");
  assert.equal(text(out.citation), "Kesavananda Bharati v. State of Kerala, 2019 SCC OnLine Del 1234 (Del HC), para 23.");
});

test("OSCOLA case footnote and table of cases", () => {
  const out = formatCase({ ...kesavananda, pinpoint: "[23]" }, "oscola");
  assert.equal(out.citation, "<i>Kesavananda Bharati v State of Kerala</i> (1973) 4 SCC 225 [23].");
  assert.equal(out.bibliography, "Kesavananda Bharati v State of Kerala (1973) 4 SCC 225");
});

test("APA case uses the legal form with a country", () => {
  const out = formatCase({ name: "A.K. Gopalan v. State of Madras", citation: "AIR 1950 SC 27" }, "bluebook");
  assert.equal(text(out.citation), "(A.K. Gopalan v. State of Madras, 1950)");
  assert.equal(text(out.bibliography), "A.K. Gopalan v. State of Madras, AIR 1950 SC 27 (India).");
});

test("ILI statute with Act number and section", () => {
  assert.equal(formatStatute(itAct, "ili").citation, "The Information Technology Act, 2000 (Act 21 of 2000), s. 43.");
});

test("ILI statute with a range of sections", () => {
  assert.equal(formatStatute({ ...itAct, section: "66–66F" }, "ili").citation, "The Information Technology Act, 2000 (Act 21 of 2000), ss. 66–66F.");
});

test("OSCOLA statute omits the Act number", () => {
  const out = formatStatute(itAct, "oscola");
  assert.equal(out.citation, "The Information Technology Act, 2000, s 43.");
  assert.equal(out.bibliography, "The Information Technology Act, 2000");
});

test("user input is escaped", () => {
  const out = formatCase({ name: "<script>x</script> v Y", citation: "(2020) 1 SCC 1" }, "ili");
  assert.ok(!out.citation.includes("<script>"));
});
