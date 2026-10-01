import type { Variants } from 'motion'

export { cn } from 'cn'

export const showPopup: Variants = {
  initial: {
    opacity: 0,
    scale: 0.1,
    y: -20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.1,
    },
    y: 0,
  },
  exit: {
    opacity: 0,
  },
}
