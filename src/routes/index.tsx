import GlowCursor from '#/components/GlowCursor.tsx'
import { Button } from '#/components/ui/button.tsx'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <GlowCursor
      color="#67E8F9"
      secondaryColor="#A78BFA"
      trailLength={20}
      trailWidth={8}
      trailTaper={1}
      followSpeed={0.16}
      glowIntensity={1.9}
      glowSpread={1.2}
      hotspot={0.65}
      brightness={1.5}
      opacity={0.8}
      pulseSpeed={1.1}
      noiseStrength={0.035}
      idleFade
      idleTimeout={700}
      fadeDuration={900}
      blendMode="screen"
    >
      <div className="p-8 w-full h-screen flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <h1 className="heading-xl">Welcome to </h1>
          <span className="logo-lg">Disney Deck</span>
          <Link
            to="/characters"
            className="bg-transparent px-6 py-4 border border-foreground rounded-2xl hover:border-secondary transition-colors mt-5"
          >
            View characters
          </Link>
        </div>
      </div>
    </GlowCursor>
  )
}
