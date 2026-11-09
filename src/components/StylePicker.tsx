import { STYLES } from "../lib/styles";

interface Props {
  value: string;
  onChange: (id: string) => void;
}

export default function StylePicker({ value, onChange }: Props) {
  return (
    <fieldset>
      <legend className="field-label">Citation style</legend>
      <div className="flex flex-wrap gap-2">
        {STYLES.map((style) => {
          const active = style.id === value;
          return (
            <button
              key={style.id}
              type="button"
              title={style.description}
              aria-pressed={active}
              onClick={() => onChange(style.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                active
                  ? "border-brand-700 bg-brand-700 text-white dark:border-saffron-500 dark:bg-saffron-500 dark:text-slate-950"
                  : "border-slate-300 text-slate-700 hover:border-brand-600 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-saffron-500 dark:hover:text-saffron-400"
              }`}
            >
              {style.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
