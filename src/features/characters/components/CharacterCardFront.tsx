import type { CharacterResponse } from '#/features/characters/characterTypes.ts'

interface CharacterCardFrontProps {
  character: CharacterResponse
}

export function CharacterCardFront({ character }: CharacterCardFrontProps) {
  return (
    <div className="group relative h-full">
      <img
        src={character.imageUrl}
        alt={character.name}
        className="aspect-video h-full w-full object-cover backface-hidden"
      />

      <div className="absolute inset-0 bg-linear-to-t from-background/60 via-background/60 via-10% to-transparent rounded-2xl flex items-end justify-between gap-4 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="heading-md translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
          {character.name}
        </span>
        <span className="text-muted text-nowrap">Learn more &rarr;</span>
      </div>
    </div>
  )
}
