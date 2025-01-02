import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salary Tax Calculator',
  description: 'Calculate your salary after tax',
  icons: '/img/tax-calculate.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  )
}