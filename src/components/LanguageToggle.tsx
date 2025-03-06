'use client'

import { useLanguage } from './LanguageProvider'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'km' : 'en')}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 ml-2 w-10 h-10"
    >
      {language === 'en' ? '🇬🇧' : '🇰🇭'}
    </button>
  )
}