'use client'

import { useLanguage } from './LanguageProvider';
interface CurrencyToggleProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

export function CurrencyToggle({ currency, setCurrency }: CurrencyToggleProps) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center space-x-3">
      <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => setCurrency('USD')}
          className={`px-4 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
            currency === 'USD'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {t('usd')}
        </button>
        <button
          onClick={() => setCurrency('RIEL')}
          className={`px-4 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
            currency === 'RIEL'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {t('riel')}
        </button>
      </div>
    </div>
  );
}