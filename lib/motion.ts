import { type Transition } from "motion/react";

export const springSlow: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 24,
  mass: 0.8,
};

export const springResponsive: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
};

export const sceneTransition: Transition = {
  duration: 1.1,
  ease: [0.22, 1, 0.36, 1], // Cinematic ease-out
};

export const fadeTransition: Transition = {
  duration: 0.4,
  ease: "easeInOut",
};

export const textVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
};

export const glassVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};
