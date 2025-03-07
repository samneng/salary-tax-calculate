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
    'subtitle': 'Calculate your after-tax salary and pension fund deducted',
    'note': 'This application are following',
    'prakas': 'GDT PRAKAS 575',
    'grossSalary': 'Gross Salary',
    'otherIncome': 'Additional allowance',
    'otherIncomesTooltip': 'Any additional income you receive apart from your salary. (Ex: Bonus, OT, Commission, etc.)',
    'dependants': 'Number of Dependants',
    'dependantsTooltip': 'Number of people who rely on your income for financial support. (Ex: Your wife and your child)',
    'exchangeRate': 'NBC Rate (KHR ៛)',
    'nffsRate': 'NSSF Rate  (KHR ៛)',
    'calculate': 'Calculate Tax',
    'result': 'Calculation Result',
    'incomeTax': 'Salary Tax',
    'nssfDeduce': 'Pension fund',
    'afterTax': 'Your Take Home Salary',
    'currency': 'Currency',
    'usd': 'USD',
    'riel': 'Riel',
    'taxRate': 'Tax Rate'
  },
  km: {
    'title': 'កម្មវិធីគណនាពន្ធលើប្រាក់បៀវត្ស',
    'subtitle': 'គណនាប្រាក់បៀវត្សរបស់អ្នកបន្ទាប់ពីការកាត់ពន្ធ និងការកាត់លើមូលនិធិសោធន',
    'note': 'កម្មវិធីនេះគណនាដោយផ្អែកលើ',
    'prakas': 'ការប្រកាសលេខ ៥៧៥ របស់អគ្គនាយកដ្ឋានពន្ធដារ',
    'grossSalary': 'ប្រាក់បៀវត្ស',
    'otherIncome': 'ចំណូលបន្ថែមផ្សេងៗ',
    'otherIncomesTooltip': 'ប្រាក់ចំណូលបន្ថែមណាមួយដែលអ្នកទទួលបានក្រៅពីប្រាក់ខែរបស់អ្នក។ ឧទាហរណ៍៖ ប្រាក់រង្វាន់, ប្រាក់ថែមម៉ោង ឬប្រាក់អត្ថប្រយោជន៍ផ្សេងៗ។ល។',
    'dependants': 'ចំនួនអ្នកនៅក្នុងបន្ទុក',
    'dependantsTooltip': 'ចំនួនមនុស្សដែលពឹងផ្អែកលើប្រាក់ចំណូលរបស់អ្នកសម្រាប់ការគាំទ្រហិរញ្ញវត្ថុ (ឧទាហរណ៍៖ ប្រពន្ធ និងកូនរបស់អ្នក)',
    'exchangeRate': 'អត្រាប្តូរប្រាក់ ធនាគាជាតិ (រៀល ៛)',
    'nffsRate': 'អត្រាប្តូរប្រាក់ ប.ស.ស (រៀល ៛)',
    'calculate': 'គណនាពន្ធ',
    'result': 'លទ្ធផលនៃការគណនា',
    'incomeTax': 'ពន្ធលើប្រាក់បៀវត្ស',
    'nssfDeduce': 'មូលនិធិសោធន',
    'afterTax': 'ប្រាក់បៀវត្សដែលត្រូវទទួលបាន',
    'currency': 'រូបិយប័ណ្ណ',
    'usd': 'ដុល្លា',
    'riel': 'រៀល',
    'taxRate': 'អត្រាពន្ធ'
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