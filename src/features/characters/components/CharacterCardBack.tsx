import type { CharacterResponse } from '#/features/characters/characterTypes.ts'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '../../../components/ui/badge'

interface CharacterCardBackProps {
  character: CharacterResponse
  onFlip: () => void
}

export function CharacterCardBack({
  character,
  onFlip,
}: CharacterCardBackProps) {
  const featuredIn = [
    ...character.films,
    ...character.shortFilms,
    ...character.tvShows,
    ...character.videoGames,
  ]

  const getMediaBadge = (name: string) => {
    if (character.films.includes(name)) return 'Film'
    if (character.shortFilms.includes(name)) return 'Short Film'
    if (character.tvShows.includes(name)) return 'TV Show'
    if (character.videoGames.includes(name)) return 'Video Game'
    return 'Unknown'
  }

  return (
    <Card className="mx-auto w-full h-full max-w-sm">
      <CardHeader>
        <CardTitle>About {character.name}</CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto">
        <div className="text-sm mb-2 flex flex-col gap-2 justify-start items-start">
          {featuredIn.length !== 0 && (
            <>
              <h2 className="font-semibold mb-2">Featured in:</h2>
              <ul className="list-disc pl-5">
                {featuredIn.map((media) => (
                  <li key={media}>
                    {media.split('(')[0].trimEnd()}{' '}
                    <Badge>{getMediaBadge(media)}</Badge>
                  </li>
                ))}
              </ul>
            </>
          )}
          {character.allies.length !== 0 && (
            <>
              <h2 className="font-semibold mb-2">Allies: </h2>
              <ul className="list-disc pl-5">
                {character.allies.map((ally) => (
                  <li key={ally}>{ally}</li>
                ))}
              </ul>
            </>
          )}
          {character.enemies.length !== 0 && (
            <>
              <h2 className="font-semibold mb-2">Enemies: </h2>
              <ul className="list-disc pl-5">
                {character.enemies.map((enemy) => (
                  <li key={enemy}>{enemy}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onFlip}>
          Go back
        </Button>
      </CardFooter>
    </Card>
  )
}
