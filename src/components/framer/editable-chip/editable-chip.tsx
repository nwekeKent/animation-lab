import { useEffect, useState, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon, Edit01Icon } from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const EditableChip = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("Editable");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    if (editing) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    } else {
      input.blur();
    }
  }, [editing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEditClick = () => {
    setEditing((prev) => !prev);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <motion.div
        layout
        className={cn(
          "relative border border-red-200 rounded-full w-auto inline-flex items-center h-auto p-1 bg-white",
        )}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        <motion.input
          layout
          ref={inputRef}
          className={cn(
            "h-11 px-4 border-0 text-lg outline-none font-base bg-transparent",
            editing ? "text-black " : "text-gray-400",
          )}
          value={value}
          disabled={!editing}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") setEditing(false);
            if (e.key === "Escape") setEditing(false);
          }}
          animate={{
            width: editing ? 220 : 140,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
        <motion.button
          layout
          type="button"
          className={cn(
            "h-11 w-11 rounded-full flex items-center justify-center",
            editing ? "bg-black text-white" : "bg-gray-100 text-gray-500",
          )}
          onClick={handleEditClick}
          whileHover={{ scale: 0.96 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={editing ? "done" : "edit"}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 10 }}
              transition={{ type: "spring", stiffness: 600, damping: 35 }}
              className="inline-flex"
            >
              {editing ? (
                <HugeiconsIcon
                  icon={Tick01Icon}
                  size={25}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              ) : (
                <HugeiconsIcon
                  icon={Edit01Icon}
                  size={25}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
  );
};
