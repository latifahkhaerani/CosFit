"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useMemo, useState } from "react";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ThemeCombobox({
  value,
  onChange,
  options,
  setOptions,
}: Props) {
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!query) return options;

    return options.filter((theme) =>
      theme.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, options]);

  const themeExists = useMemo(() => {
    return options.some((theme) => theme.toLowerCase() === query.toLowerCase());
  }, [options, query]);

  function handleSelect(theme: string) {
    // Prevent duplicate selected themes
    if (
      value.some((selected) => selected.toLowerCase() === theme.toLowerCase())
    ) {
      setQuery("");
      return;
    }

    // If this theme doesn't exist yet, save it
    if (
      !options.some((option) => option.toLowerCase() === theme.toLowerCase())
    ) {
      setOptions((prev) => [...prev, theme]);
    }

    onChange([...value, theme]);
    setQuery("");
  }

  function removeTheme(theme: string) {
    onChange(value.filter((t) => t !== theme));
  }

  return (
    <div className="space-y-2">
      {/* Selected themes */}
      <div className="flex flex-wrap gap-2">
        {value.map((theme) => (
          <span
            key={theme}
            onClick={() => removeTheme(theme)}
            className="cursor-pointer rounded-full bg-gray-200 px-3 py-1 text-sm"
          >
            {theme} ✕
          </span>
        ))}
      </div>

      <Combobox
        value={null}
        onChange={(theme: string | null) => {
          if (!theme) return;
          handleSelect(theme);
        }}
      >
        <ComboboxInput
          className="input-soft w-full"
          placeholder="Search or create theme..."
          displayValue={() => query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <ComboboxOptions
          anchor="bottom"
          className="mt-1 w-[var(--input-width)] rounded-lg border bg-white shadow-lg empty:invisible"
        >
          {filteredOptions.map((theme) => (
            <ComboboxOption
              key={theme}
              value={theme}
              className="cursor-pointer px-3 py-2 data-focus:bg-gray-100"
            >
              {theme}
            </ComboboxOption>
          ))}

          {!themeExists && query.trim() !== "" && (
            <ComboboxOption
              value={query.trim()}
              className="cursor-pointer px-3 py-2 text-blue-600 data-focus:bg-gray-100"
            >
              + Create &ldquo;{query.trim()}&ldquo;
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
