import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LanguageProvider } from '@/components/LanguageProvider'
import { Kantumruy_Pro } from "next/font/google"

const kantumruyPro = Kantumruy_Pro({ subsets: ["khmer"], fallback: ['san-serif'] })

export const metadata: Metadata = {
  title: 'Salary Tax Calculator',
  description: 'Calculate your salary after tax',
  icons: '/img/tax-calculate.png',
  openGraph: {
    type: "website",
    url: "https://salary-tax-calculate.vercel.app/",
    title: "Salary Tax Calculator",
    description: "Calculate your salary after tax deductions and dependants",
    siteName: "Salary Tax Calculator",
    images: [{
      url: "/img/salary-tax-calculator.png",
    }],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={kantumruyPro.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}