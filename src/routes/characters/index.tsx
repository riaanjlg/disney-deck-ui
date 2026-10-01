import { charactersService } from '#/features/characters/characterService.ts'
import type { PagedRequest } from '#/types/api.ts'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import Skeleton from 'react-loading-skeleton'
import { PAGE_SIZE } from '../../lib/constants'
import { PaginationBar } from '#/components/PaginationBar.tsx'
import { useState } from 'react'
import { CharacterCardFront } from '#/features/characters/components/CharacterCardFront.tsx'
import { CharacterCardBack } from '#/features/characters/components/CharacterCardBack.tsx'
import { FlipCard } from '#/components/FlipCard.tsx'
import Header from '#/components/layout/Header.tsx'
import SearchBar from '#/components/SearchBar.tsx'

export const Route = createFileRoute('/characters/')({
  component: RouteComponent,
})

function RouteComponent() {
  const searchParams = useSearch({ from: '/characters/' })
  const navigate = useNavigate({ from: '/characters/' })

  const [filters, setFilters] = useState<PagedRequest>({
    pageNumber: 1,
    pageSize: PAGE_SIZE,
  })

  const {
    data: characters,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['characters', searchParams],
    queryFn: () => charactersService.getAll(filters),
    placeholderData: keepPreviousData,
  })

  const updateFilters = (newFilters: Partial<PagedRequest>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
    navigate({
      search: (prev) => ({
        ...prev,
        ...newFilters,
        pageNumber: newFilters.pageNumber ?? 1,
      }),
    })
  }

  return (
    <div className="p-8 pb-28">
      <Header title="Characters" description="All disney characters">
        <div className="flex items-center justify-center gap-8">
          <Link
            to="/guess-the-character"
            className="font-[LemonMilk] text-nowrap text-sm hover:text-muted-foreground transition-colors duration-300"
          >
            Guess the Character
          </Link>
          <SearchBar
            value={filters.searchTerm ?? ''}
            onSearch={(searchTerm) =>
              updateFilters({ searchTerm, pageNumber: 1 })
            }
            resultsCount={characters?.total}
          />
        </div>
      </Header>

      <main className="mb-8">
        {isError ? (
          <div>{error.message}</div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="aspect-video overflow-hidden rounded-2xl">
                <Skeleton
                  className="aspect-video"
                  borderRadius="1rem"
                  baseColor="var(--muted)"
                  highlightColor="var(--accent)"
                />
              </div>
            ))}
          </div>
        ) : characters?.data.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {characters.data.map((character) => (
              <FlipCard
                key={character.id}
                front={<CharacterCardFront character={character} />}
                back={<CharacterCardBack character={character} />}
                axis="y"
                flipOnClick
                draggable
                dragDistance={0}
                tilt
                tiltMax={12}
                glare
                glareOpacity={0.22}
                hoverScale={1.03}
                perspective={1100}
                stiffness={170}
                damping={20}
                width={400}
                height={300}
                radius={22}
              />
            ))}
          </div>
        ) : (
          <div>No characters found</div>
        )}
      </main>

      <PaginationBar
        pageNumber={filters.pageNumber}
        totalPages={characters?.totalPages ?? 0}
        onPageChange={(pageNumber) => updateFilters({ pageNumber })}
      />
    </div>
  )
}
