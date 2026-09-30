import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from 'cn'

interface FlipCardProps {
  isFlipped: boolean
  front: ReactNode
  back: ReactNode
  flipDirection?: 'horizontal' | 'vertical'
  className?: string
}

export function FlipCard({
  isFlipped,
  front,
  back,
  flipDirection = 'horizontal',
  className,
}: FlipCardProps) {
  const axis = flipDirection === 'horizontal' ? 'rotateY' : 'rotateX'

  return (
    <div className={cn('perspective-distant', className)}>
      <motion.div
        className="relative transform-3d"
        animate={{ [axis]: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div
          className={cn('backface-hidden', isFlipped && 'pointer-events-none')}
        >
          {front}
        </div>
        <div
          className={cn(
            'absolute inset-0 backface-hidden',
            flipDirection === 'horizontal' ? 'rotate-y-180' : 'rotate-x-180',
            !isFlipped && 'pointer-events-none',
          )}
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
}
