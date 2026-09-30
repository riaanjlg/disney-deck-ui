import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SearchBarProps {
  value: string
  onSearch: (searchTerm: string) => void
  resultsCount?: number
  debounceMs?: number
  placeholder?: string
  className?: string
}

const SearchBar = ({
  value,
  onSearch,
  resultsCount,
  debounceMs = 300,
  placeholder = 'Search...',
  className,
}: SearchBarProps) => {
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    setDraft(value)
  }, [value])

  useEffect(() => {
    if (draft === value) return

    const timeout = setTimeout(() => {
      onSearch(draft)
    }, debounceMs)

    return () => clearTimeout(timeout)
  }, [draft, debounceMs])

  return (
    <InputGroup className={className ?? 'max-w-xs'}>
      <InputGroupInput
        placeholder={placeholder}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {resultsCount !== undefined && (
        <InputGroupAddon align="inline-end">
          {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}

export default SearchBar
