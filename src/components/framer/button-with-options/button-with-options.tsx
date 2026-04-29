import { HugeiconsIcon } from "@hugeicons/react";
import {
  CloudDownloadIcon,
  FolderExportIcon,
  Add01Icon,
  Share04Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, stagger, type Variants } from "motion/react";

type idType = "share" | "export" | "download";

interface ButtonOption {
  id: idType;
  icon: React.ReactNode;
}

const floatingButtons: ButtonOption[] = [
  {
    id: "share",
    icon: <HugeiconsIcon icon={Share04Icon} size={32} />,
  },
  {
    id: "export",
    icon: <HugeiconsIcon icon={FolderExportIcon} size={32} />,
  },
  {
    id: "download",
    icon: <HugeiconsIcon icon={CloudDownloadIcon} size={32} />,
  },
];

export const ButtonWithOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerVariants = {
    hidden: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.1, { from: "last" }),
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.1),
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0,
      transition: { type: "spring", stiffness: 200, damping: 30 },
    },
    visible: (id: string) => {
      const positions: Record<string, { x: number; y: number }> = {
        share: { x: -150, y: -100 },
        export: { x: 0, y: -150 },
        download: { x: 150, y: -100 },
      };
      return {
        ...positions[id],
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 200 },
      };
    },
  };

  return (
    <motion.div
      className={cn(
        "flex h-screen items-center justify-center bg-[#F7F7F7] relative",
      )}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      variants={containerVariants}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
    >
      {floatingButtons.map((button) => (
        <motion.button
          key={button.id}
          custom={button.id}
          variants={itemVariants}
          className={cn(
            "h-20 w-20 flex justify-center items-center rounded-full shadow-xl bg-white cursor-pointer border border-black/10 absolute",
          )}
        >
          {button.icon}
        </motion.button>
      ))}

      <button
        className={cn(
          "h-20 w-20 flex justify-center items-center rounded-full shadow-xl bg-white border border-black/10 relative z-10 transition-all duration-300",
          isAnimating ? "pointer-events-none" : "cursor-pointer hover:scale-90",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }}>
          <HugeiconsIcon icon={Add01Icon} size={32} />
        </motion.span>
      </button>
    </motion.div>
  );
};
