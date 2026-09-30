import { Button } from '#/components/ui/button.tsx'
import { useId, useState } from 'react'
import type { SyntheticEvent } from 'react'

interface GuessInputProps {
  suggestions: string[]
  onSubmit: (guess: string) => void
  disabled?: boolean
}

export function GuessInput({
  suggestions,
  onSubmit,
  disabled,
}: GuessInputProps) {
  const [value, setValue] = useState('')
  const listId = useId()

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        list={listId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a character name…"
        autoComplete="off"
        disabled={disabled}
        className="flex-1 rounded-lg border px-3 py-2"
      />
      <datalist id={listId}>
        {suggestions.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
      <Button
        type="submit"
        variant="outline"
        disabled={disabled || !value.trim()}
        className="rounded-lg border h-full px-8 py-5 cursor-pointer"
      >
        Guess
      </Button>
    </form>
  )
}
