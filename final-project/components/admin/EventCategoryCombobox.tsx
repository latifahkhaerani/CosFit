"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
  placeholder?: string;
};

export default function EventCategoryCombobox({
  value,
  onChange,
  options,
  setOptions,
  placeholder = "Search or create category...",
}: Props) {
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;

    return options.filter((option) =>
      option.toLowerCase().includes(normalizedQuery),
    );
  }, [query, options]);

  const optionExists = useMemo(() => {
    return options.some(
      (option) => option.toLowerCase() === query.trim().toLowerCase(),
    );
  }, [options, query]);

  function handleSelect(nextValue: string[]) {
    const normalizedValues = nextValue.filter(Boolean);

    if (normalizedValues.length > 0) {
      const selectedItems = normalizedValues.filter((item) => {
        const trimmedItem = item.trim();
        return (
          trimmedItem.length > 0 &&
          options.some(
            (option) => option.toLowerCase() === trimmedItem.toLowerCase(),
          )
        );
      });

      const customValue = query.trim();
      const isCreatingCustomValue =
        customValue.length > 0 &&
        normalizedValues.includes(customValue) &&
        !options.some(
          (option) => option.toLowerCase() === customValue.toLowerCase(),
        );

      if (isCreatingCustomValue) {
        setOptions((prev) => [...prev, customValue]);
        onChange([...selectedItems, customValue]);
      } else {
        onChange(selectedItems);
      }
    } else {
      onChange([]);
    }

    setQuery("");
  }

  function removeCategory(category: string) {
    onChange(value.filter((item) => item !== category));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    const trimmedValue = query.trim();
    if (!trimmedValue) return;

    event.preventDefault();

    if (
      value.some(
        (selected) => selected.toLowerCase() === trimmedValue.toLowerCase(),
      )
    ) {
      setQuery("");
      return;
    }

    if (
      !options.some(
        (option) => option.toLowerCase() === trimmedValue.toLowerCase(),
      )
    ) {
      setOptions((prev) => [...prev, trimmedValue]);
    }

    onChange([...value, trimmedValue]);
    setQuery("");
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((category) => (
          <span
            key={category}
            onClick={() => removeCategory(category)}
            className="cursor-pointer rounded-full bg-gray-200 px-3 py-1 text-sm"
          >
            {category} ✕
          </span>
        ))}
      </div>

      <Combobox value={value} onChange={handleSelect} multiple>
        <ComboboxInput
          className="w-full rounded-xl border border-border bg-white p-3 text-sm text-foreground focus:border-primary focus:outline-none"
          placeholder={placeholder}
          displayValue={() => query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <ComboboxOptions className="mt-1 max-h-48 overflow-auto rounded-xl border border-border bg-white py-1 shadow-lg">
          {filteredOptions.map((option) => (
            <ComboboxOption
              key={option}
              value={option}
              className="cursor-pointer px-3 py-2 text-sm text-foreground data-focus:bg-gray-100"
            >
              {option}
            </ComboboxOption>
          ))}

          {!optionExists && query.trim() !== "" && (
            <ComboboxOption
              value={query.trim()}
              className="cursor-pointer px-3 py-2 text-sm font-medium text-primary data-focus:bg-gray-100"
            >
              + Create &ldquo;{query.trim()}&rdquo;
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
