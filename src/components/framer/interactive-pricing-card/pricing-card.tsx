import { HugeiconsIcon } from "@hugeicons/react";
import { CpuChargeIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

const features = [
  "Real-Time Incident Monitoring",
  "AI Error Detection",
  "Automated Status Updates",
  "API Health Checks",
  "Performance Reports",
  "Slack & Email Alerts",
];

const BASE_PRICE = 29;
const PRICE_PER_WORKSPACE = 55;

export const PricingCard = () => {
  const [workspaces, setWorkspaces] = useState(3);

  // Animated price counter
  const price = BASE_PRICE + (workspaces - 1) * PRICE_PER_WORKSPACE;

  const increment = () => {
    if (workspaces < 10) setWorkspaces((prev) => prev + 1);
  };

  const decrement = () => {
    if (workspaces > 1) setWorkspaces((prev) => prev - 1);
  };

  const childVariants = {
    initial: {
      opacity: 0,
      height: 0,
    },
    hover: {
      opacity: 1,
      height: 120,
    },
  };

  return (
    <motion.div
      className="w-full max-w-[500px] shadow-2xl overflow-hidden relative bg-[#F6F6F6] rounded-[2.8rem]"
      initial="initial"
      whileHover="hover"
    >
      {/* Main Card Content */}
      <div className="p-8 bg-[#EAEAEA] space-y-8 rounded-[2.8rem] shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center">
            <HugeiconsIcon
              icon={CpuChargeIcon}
              size={24}
              className="text-gray-700"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 ">Core Plan</h2>
        </div>

        {/* Features */}
        <div className="space-y-4 border-y py-5 border-y-gray-300">
          {features.map((feature, index) => (
            <motion.div key={feature} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                <HugeiconsIcon
                  icon={Tick02Icon}
                  size={14}
                  className="text-white"
                  strokeWidth={3}
                />
              </div>
              <span className="text-gray-800  text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Price */}
        <div className="">
          <div className="flex items-baseline gap-1">
            <motion.span className="text-5xl font-bold text-gray-900 tabular-nums">
              $<NumberFlow value={price} />
            </motion.span>
            <span className="text-gray-500 text-sm ">/month</span>
          </div>
        </div>
      </div>

      {/* Expandable Workspace Section */}

      <motion.div className="flex items-center px-8" variants={childVariants}>
        <div className="flex items-center w-full justify-between ">
          <div>
            <h3 className="text-lg font-bold text-gray-900 ">
              Account Workspaces
            </h3>
            <p className="text-sm text-gray-500 ">
              {workspaces} active workspace{workspaces !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Counter Controls */}
          <div className="flex items-center border border-gray-300 rounded-2xl h-12.5 px-4 bg-[#EAEAEA] gap-3">
            <motion.button
              onClick={decrement}
              disabled={workspaces === 1}
              className={cn(
                "w-5 h-5 rounded-xl flex items-center justify-center  text-xl font-light transition-colors",
                workspaces === 1
                  ? " text-gray-300 cursor-not-allowed"
                  : " text-gray-700 hover:bg-gray-200 cursor-pointer",
              )}
              whileHover={workspaces > 1 ? { scale: 1.05 } : {}}
              whileTap={workspaces > 1 ? { scale: 0.95 } : {}}
            >
              −
            </motion.button>

            {/* Animated Number */}
            <div className="w-12 h-10 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={workspaces}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="text-base font-bold text-gray-900 "
                >
                  {workspaces}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.button
              onClick={increment}
              disabled={workspaces === 10}
              className={cn(
                "w-6 h-6 rounded-[3px] bg-white flex items-center justify-center  text-xl font-light transition-colors",
                workspaces === 10
                  ? " text-gray-300 cursor-not-allowed"
                  : " text-gray-700 cursor-pointer active:scale-[0.9]",
              )}
              whileHover={workspaces < 10 ? { scale: 1.05 } : {}}
              whileTap={workspaces < 10 ? { scale: 0.95 } : {}}
            >
              +
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

