'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'km'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    'title': 'Salary Tax Calculator',
    'subtitle': 'Calculate your after-tax salary with NSSF deductions',
    'note': 'This application are following',
    'prakas': 'GDT PRAKAS 575',
    'grossSalary': 'Gross Salary (USD $)',
    'otherIncome': 'Additional allowance (USD $)',
    'dependants': 'Number of Dependants',
    'dependantsTooltip': 'Number of people who rely on your income for financial support. (Ex: Your wife and your child)',
    'exchangeRate': 'NBC Rate (KHR ៛)',
    'nffsRate': 'NSSF Rate  (KHR ៛)',
    'calculate': 'Calculate Tax',
    'result': 'Calculation Result',
    'incomeTax': 'Income Tax',
    'nssfDeduce': 'Pension fund',
    'afterTax': 'Your Take Home Salary'
  },
  km: {
    'title': 'កម្មវិធីគណនាពន្ធប្រាក់ខែ',
    'subtitle': 'គណនាប្រាក់ខែរបស់អ្នកបន្ទាប់ពីកាត់ពន្ធ និងអ្នកនៅក្នុងបន្ទុក',
    'note': 'កម្មវិធីនេះគណនាដោយផ្អែកលើ',
    'prakas': 'ការប្រកាសលេខ ៥៧៥ របស់អគ្គនាយកដ្ឋានពន្ធដារ',
    'grossSalary': 'ប្រាក់បៀវត្ស (ដុល្លា $)',
    'otherIncome': 'ចំណូលបន្ថែមផ្សេងៗ (ដុល្លា $)',
    'dependants': 'ចំនួនអ្នកនៅក្នុងបន្ទុក',
    'dependantsTooltip': 'ចំនួនមនុស្សដែលពឹងផ្អែកលើប្រាក់ចំណូលរបស់អ្នកសម្រាប់ការគាំទ្រហិរញ្ញវត្ថុ (ឧទាហរណ៍៖ ប្រពន្ធ និងកូនរបស់អ្នក)',
    'exchangeRate': 'អត្រាប្តូរប្រាក់ ធនាគាជាតិ (រៀល ៛)',
    'nffsRate': 'អត្រាប្តូរប្រាក់ ប.ស.ស (រៀល ៛)',
    'calculate': 'គណនាពន្ធ',
    'result': 'លទ្ធផលនៃការគណនា',
    'incomeTax': 'ប្រាក់ជាប់ពន្ធ',
    'nssfDeduce': 'មូលនិធិសោធន',
    'afterTax': 'ប្រាក់បៀវត្សដែលត្រូវទទួលបាន'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}