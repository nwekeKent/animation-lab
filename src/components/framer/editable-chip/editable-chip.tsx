import { useState, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon, Edit01Icon } from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const EditableChip = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("Editable");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEditClick = () => {
    setEditing(!editing);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className={cn(
          "relative border border-red-200 rounded-full w-auto inline-flex items-center h-auto p-1",
        )}
      >
        <input
          ref={inputRef}
          className={cn(
            "h-11 px-4 border-0 text-lg outline-none font-base",
            editing ? "text-black " : "text-gray-400",
          )}
          value={value}
          // disabled={!editing}
          onChange={handleInputChange}
        />
        <span
          className={cn(
            "h-11 w-11 rounded-full  flex items-center justify-center cursor-pointer",
            editing ? "bg-black text-white" : "bg-gray-100 text-gray-500",
          )}
          onClick={handleEditClick}
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
        </span>
      </div>
    </div>
  );
};
