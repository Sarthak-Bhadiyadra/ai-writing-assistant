import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'Writing Buddy | Improve and Rewrite Text Anywhere',
  description: 'The ultimate writing buddy for the entire web. Improve grammar, rewrite sentences in different tones, and save time on Gmail, LinkedIn, and more.',
  keywords: ['Writing Buddy', 'grammar checker', 'rephrase tool', 'sentence improver', 'AI writer extension'],
  openGraph: {
    title: 'Writing Buddy | Rewrite Text Anywhere',
    description: 'Improve grammar and rewrite sentences instantly using AI on any website.',
    type: 'website',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing Buddy',
    description: 'Rewrite text instantly with AI across the entire web.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased text-text-primary bg-surface min-h-screen">
        {children}
      </body>
    </html>
  )
}

