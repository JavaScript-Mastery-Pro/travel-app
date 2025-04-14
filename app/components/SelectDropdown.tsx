import { useState, useEffect, useRef } from "react";
import useClickOutside from "../lib/useClickOutside";
import { cn } from "~/lib/utils";

const SelectDropdown = ({
  data,
  onValueChange,
  id,
  label,
  placeholder,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState(
    data.find((item) => item.name === placeholder)?.name || placeholder
  );
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
    setFocusedIndex(null);
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    const actions: Record<string, () => void> = {
      ArrowDown: () => {
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev === null || prev === filteredData.length - 1 ? 0 : prev + 1
        );
      },
      ArrowUp: () => {
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev === null || prev === 0 ? filteredData.length - 1 : prev - 1
        );
      },
      Enter: () => {
        event.preventDefault();
        if (focusedIndex !== null) selectItem(filteredData[focusedIndex]);
      },
      Escape: () => setIsOpen(false),
    };

    actions[event.key]?.();
  };

  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(null);
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  const selectItem = (item: (typeof data)[number]) => {
    const value = "flag" in item ? `${item.flag} ${item.name}` : item.name;
    setSelectedValue(value);
    onValueChange(item.name);
    setIsOpen(false);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      ref={dropdownRef}
      className="flex flex-col gap-2.5 w-full px-6 relative items-start"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <label htmlFor={id} className="formLabel">
        {label}
      </label>
      <button
        type="button"
        className={`relative formInput w-full text-start ${
          selectedValue && selectedValue !== placeholder
            ? "text-dark-100"
            : "!text-gray-100"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || placeholder}
        <img
          src="/assets/icons/arrow-down.svg"
          alt="arrow down"
          className={`absolute size-5 right-5 top-1/2 -translate-y-1/2 ${
            isOpen ? "rotate-180" : ""
          } transition-transform duration-500`}
        />
      </button>

      {isOpen && (
        <div className="comboBox-popup">
          <div className="sticky top-0 bg-white z-20 rounded-t-xl">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded-t-xl focus:outline-none border-b border-gray-200"
              ref={searchInputRef}
            />
          </div>
          <ul className="flex flex-col gap-2.5 max-h-[250px] overflow-y-scroll">
            {filteredData.map((item, index) => (
              <li
                key={item.name}
                className={cn(
                  "w-full text-start p-2 hover:bg-gray-200",
                  focusedIndex === index ? "bg-gray-200" : ""
                )}
                onClick={() => selectItem(item)}
                ref={(el) => {
                  if (focusedIndex === index && el) {
                    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
                  }
                }}
              >
                <figure className="flex items-center gap-2 relative">
                  {"flag" in item &&
                    selectedValue === `${item.flag} ${item.name}` && (
                      <img
                        src="/assets/icons/blue-check.svg"
                        alt="checkmark"
                        className="w-4 h-4 absolute left-0"
                      />
                    )}
                  <figcaption className="pl-5">
                    {"flag" in item ? `${item.flag} ${item.name}` : item.name}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
