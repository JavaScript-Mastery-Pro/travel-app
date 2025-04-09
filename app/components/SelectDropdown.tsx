import { useState, useEffect, useRef } from "react";
import useClickOutside from "../lib/useClickOutside";

const SelectDropdown = ({
  data,
  onValueChange,
  id,
  label,
  placeholder,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(
    data.find((item) => item.name === placeholder)?.name || placeholder
  );

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
    setFocusedIndex(null);
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    const keyActions: Record<string, () => void> = {
      ArrowDown: () => {
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev === null || prev === data.length - 1 ? 0 : prev + 1
        );
      },
      ArrowUp: () => {
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev === null || prev === 0 ? data.length - 1 : prev - 1
        );
      },
      Enter: () => {
        event.preventDefault();
        if (focusedIndex !== null) {
          const selectedItem = data[focusedIndex];
          const value =
            "flag" in selectedItem
              ? `${selectedItem.flag} ${selectedItem.name}`
              : selectedItem.name;
          setSelectedValue(value);
          onValueChange(selectedItem.name);
          setIsOpen(false);
        }
      },
      Escape: () => setIsOpen(false),
    };

    keyActions[event.key]?.();
  };

  useEffect(() => {
    if (isOpen) setFocusedIndex(null);
  }, [isOpen]);

  const handleItemClick = (item: (typeof data)[number], index: number) => {
    const value = "flag" in item ? `${item.flag} ${item.name}` : item.name;
    setSelectedValue(value);
    onValueChange(item.name);
    setIsOpen(false);
  };

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
      <input type="hidden" name={id} value={selectedValue ?? ""} />
      <button
        type="button"
        className={`relative formInput w-full text-start ${className}`}
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
        <div className="absolute z-10 top-24 bg-white border border-gray-200 rounded-xl shadow-200 h-[250px] w-full md:max-w-[660px] overflow-y-scroll">
          <ul className="flex flex-col gap-2.5 max-h-[250px] overflow-y-scroll">
            {data.map((item, index) => (
              <li
                key={item.name}
                className={`w-full text-start p-2 hover:bg-gray-200 ${
                  focusedIndex === index ? "bg-gray-200" : ""
                }`}
                onClick={() => handleItemClick(item, index)}
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
