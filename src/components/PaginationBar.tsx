import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationBarProps {
  pageNumber: number
  totalCount: number
  pageSize: number
  onPageChange: (pageNumber: number) => void
  siblingCount?: number
}

const getPageRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): (number | 'ellipsis')[] => {
  const totalSlots = siblingCount * 2 + 5

  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  const range: (number | 'ellipsis')[] = [1]

  if (showLeftEllipsis) {
    range.push('ellipsis')
  } else {
    for (let page = 2; page < leftSibling; page++) range.push(page)
  }

  for (let page = leftSibling; page <= rightSibling; page++) {
    if (page !== 1 && page !== totalPages) range.push(page)
  }

  if (showRightEllipsis) {
    range.push('ellipsis')
  } else {
    for (let page = rightSibling + 1; page < totalPages; page++)
      range.push(page)
  }

  range.push(totalPages)

  return range
}

export function PaginationBar({
  pageNumber,
  totalCount,
  pageSize,
  onPageChange,
  siblingCount = 1,
}: PaginationBarProps) {
  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1)

  if (totalPages <= 1) return null

  const pages = getPageRange(pageNumber, totalPages, siblingCount)

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === pageNumber) return
    onPageChange(page)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={pageNumber === 1}
            className={
              pageNumber === 1 ? 'pointer-events-none opacity-50' : undefined
            }
            onClick={(e) => {
              e.preventDefault()
              goTo(pageNumber - 1)
            }}
          />
        </PaginationItem>

        {pages.map((page, i) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === pageNumber}
                onClick={(e) => {
                  e.preventDefault()
                  goTo(page)
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={pageNumber === totalPages}
            className={
              pageNumber === totalPages
                ? 'pointer-events-none opacity-50'
                : undefined
            }
            onClick={(e) => {
              e.preventDefault()
              goTo(pageNumber + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
