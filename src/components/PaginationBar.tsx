import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { Input } from './ui/input'
import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { showPopup } from '#/lib/utils.ts'
import useClickOutside from '#/hooks/useClickOutside.ts'

interface PaginationBarProps {
  pageNumber: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

export function PaginationBar({
  pageNumber,
  totalPages,
  onPageChange,
}: PaginationBarProps) {
  const [jumpValue, setJumpValue] = useState('')
  const [showGoTo, setShowGoTo] = useState(false)

  const ref = useClickOutside(() => setShowGoTo(false))

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === pageNumber) return
    onPageChange(page)
  }

  const handleJump = (e: SyntheticEvent) => {
    e.preventDefault()
    goTo(Number(jumpValue))
    setJumpValue('')
  }

  if (totalPages <= 1) return null

  return (
    <Pagination className="z-10">
      <PaginationContent>
        {pageNumber > 2 && (
          <Button
            disabled={pageNumber === 1}
            onClick={() => goTo(1)}
            className="cursor-pointer"
          >
            Go to first
          </Button>
        )}
        <Button
          disabled={pageNumber === 1}
          onClick={() => goTo(pageNumber - 1)}
          className="cursor-pointer"
        >
          <ChevronLeft size={14} />
        </Button>

        {pageNumber > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                goTo(pageNumber - 1)
              }}
            >
              {pageNumber - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
            {pageNumber}
          </PaginationLink>
        </PaginationItem>

        {pageNumber < totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                goTo(pageNumber + 1)
              }}
            >
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {pageNumber !== totalPages && pageNumber < totalPages - 1 && (
          <>
            <div className="relative">
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowGoTo((prev) => !prev)
                  }}
                >
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>

              <AnimatePresence>
                {showGoTo && (
                  <motion.div
                    variants={showPopup}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute top-10 right-0 primary p-1 rounded-xl"
                    ref={ref}
                  >
                    <form onSubmit={handleJump}>
                      <Input
                        type="number"
                        min={1}
                        max={totalPages}
                        placeholder="Go to..."
                        className="w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0"
                        value={jumpValue}
                        onChange={(e) => setJumpValue(e.target.value)}
                      />
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  goTo(totalPages)
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {pageNumber !== totalPages && (
          <Button
            disabled={pageNumber === totalPages}
            onClick={() => goTo(pageNumber + 1)}
            className="cursor-pointer"
          >
            <ChevronRight size={14} />
          </Button>
        )}
      </PaginationContent>
    </Pagination>
  )
}
