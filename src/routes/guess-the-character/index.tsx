import Header from '#/components/layout/Header.tsx'
import { Button } from '#/components/ui/button.tsx'
import { charactersService } from '#/features/characters/characterService.ts'
import { GuessInput } from '#/features/characters/components/GuessInput.tsx'
import { getFeaturedIn } from '#/features/characters/utils.ts'
import { TOTAL_ATTEMPTS, TOTAL_ROUNDS } from '#/lib/constants.ts'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Heart, HeartCrack, Info, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/guess-the-character/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [round, setRound] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)
  const [attempts, setAttempts] = useState(3)

  const {
    data: character,
    isLoading,
    isFetching,
    isError,
    error,
    refetch: refetchCharacter,
  } = useQuery({
    queryKey: ['character'],
    queryFn: charactersService.getRandom,
    staleTime: Infinity,
  })

  const { data: names = [] } = useQuery({
    queryKey: ['character-names'],
    queryFn: charactersService.getNames,
  })

  const handleGuessResult = (correct: boolean) => {
    if (correct) {
      toast.success('Correct!')
      setTotalPoints((prev) => prev + 1)
      handleNextRound()
    } else {
      toast.error('Incorrect!')
      if (attempts > 1) {
        setAttempts((prev) => prev - 1)
      } else {
        handleNextRound()
      }
    }
  }

  const checkGuess = useMutation({
    mutationFn: charactersService.checkGuess,
    onSuccess: ({ correct }) => {
      handleGuessResult(correct)
    },
  })

  const handleSubmit = (name: string) => {
    if (!character || checkGuess.isPending) return
    checkGuess.mutate({ id: character.id, name: name })
  }

  const handleNextRound = async () => {
    if (round >= TOTAL_ROUNDS) {
      setIsCompleted(true)
      return
    }

    setAttempts(TOTAL_ATTEMPTS)
    setRound((prev) => prev + 1)

    try {
      toast.info(`It was ${character?.name}`)
      await refetchCharacter()
    } catch {
      toast.error('Failed to load the next round. Please try again.')
    }
  }

  const reset = async () => {
    setRound(1)
    setAttempts(TOTAL_ATTEMPTS)
    setIsCompleted(false)
    setTotalPoints(0)
    refetchCharacter()
    await refetchCharacter()
  }

  const showHint = () => {
    toast.info(`This character was featured in ${getFeaturedIn(character)[0]}`)
  }

  return (
    <>
      <Header
        title="Guess the character"
        description="Try to guess the Disney character"
        center
      />

      {!isCompleted ? (
        <main className="w-200 mx-auto bg-card/20 p-8 rounded-2xl border border-foreground relative mt-20">
          <Button
            onClick={reset}
            className="absolute -top-15 right-0 cursor-pointer flex items-center gap-2"
          >
            <RotateCcw size={15} />
            Reset
          </Button>
          <Button
            onClick={showHint}
            className="absolute -top-15 left-0 cursor-pointer flex items-center gap-2"
          >
            <Info size={15} />
            Show hint
          </Button>
          <div className="flex justify-between items-center text-muted">
            <span>
              Round: {round} / {TOTAL_ROUNDS}
            </span>
            <span className="flex items-center gap-2">
              {attempts}{' '}
              {attempts > 1 ? <Heart size={15} /> : <HeartCrack size={15} />}
            </span>
            <span>Score: {totalPoints}</span>
          </div>
          {isError ? (
            <div>{error.message}</div>
          ) : isLoading || isFetching ? (
            <Skeleton
              className="h-80 mt-5 mb-5"
              borderRadius="1rem"
              baseColor="var(--muted)"
              highlightColor="var(--accent)"
            />
          ) : (
            character && (
              <div className="flex items-center justify-center mb-5 bg-muted rounded-2xl overflow-hidden mt-5">
                <img src={character.imageUrl} className="h-80" />
              </div>
            )
          )}
          <div className="flex gap-2 w-full">
            <GuessInput suggestions={names} onSubmit={(g) => handleSubmit(g)} />
            <Button
              onClick={handleNextRound}
              disabled={round >= TOTAL_ROUNDS}
              className="rounded-lg border h-full py-5 px-8 cursor-pointer"
            >
              Skip
            </Button>
          </div>
        </main>
      ) : (
        <>Well fucking done</>
      )}
    </>
  )
}
