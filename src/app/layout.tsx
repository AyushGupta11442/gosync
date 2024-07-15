import type { Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
// import { ThemeProvider } from '@/providers/theme-provider'
// import ModalProvider from '@/providers/modal-provider'
// import { Toaster } from '@/components/ui/toaster'
// import { Toaster as SonnarToaster } from '@/components/ui/sonner'

const font = DM_Sans({ subsets: ['latin'] })
const inter  =Inter({subsets: ['latin']})


export const metadata: Metadata = {
  title: 'GoSync',
  description: 'All in one Agency Solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
    appearance={{baseTheme : dark}}>

      <html lang="en">
      
      <body className= {inter.className}>
        {children}
      </body>
      </html>
    </ClerkProvider>
  )
}