import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import appCss from '../styles/globals.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { Navbar } from '#/components/layout/Navbar.tsx'
import { Bounce, ToastContainer } from 'react-toastify'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Disney Deck',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme !== 'light') document.documentElement.classList.add('dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="flex w-full h-screen bg-background overflow-hidden">
        <Navbar />
        <div className="min-h-0 overflow-auto w-full p-8">{children}</div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          closeOnClick={true}
          theme="colored"
          transition={Bounce}
        />
        <Scripts />
      </body>
    </html>
  )
}
