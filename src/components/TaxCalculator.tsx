'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateTax } from '@/utils/taxCalculations';
import { useState } from 'react';
import InputField from './InputField';
import { useLanguage } from './LanguageProvider';
import { CurrencyToggle } from './CurrencyToggle';

const calculatorSchema = z.object({
  grossSalary: z.number().min(0, 'Gross Salary must be a positive number'),
  otherIncome: z.number().min(0, 'Additional allowance must be a positive number'),
  dependants: z.number().min(0, 'Number of dependants must be non-negative'),
  exchangeRate: z.number().positive('NBC rate must be a positive number'),
  nssfRate: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return null;
      const parsed = Number(val);
      return isNaN(parsed) ? null : parsed;
    },
    z.number().positive('NSSF rate must be a positive number').nullable()
  ),
});

type CalculatorInputs = z.infer<typeof calculatorSchema>;

export default function TaxCalculator() {
  const [result, setResult] = useState<Array<number> | null>(null);
  const [currency, setCurrency] = useState<string>('USD');
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CalculatorInputs>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      grossSalary: 0,
      otherIncome: 0,
      dependants: 0,
      exchangeRate: 4000,
      nssfRate: null,
    },
  });

  const onSubmit = (data: CalculatorInputs) => {
    const taxResults = calculateTax({
      ...data,
      nssfRate: data.nssfRate ?? 0,
      currency: currency,
    });
    setResult(taxResults); // Assuming you want the first result
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    setResult(null);
    reset({
      ...calculatorSchema.parse({
        grossSalary: 0,
        otherIncome: 0,
        dependants: 0,
        exchangeRate: 4000,
        nssfRate: null,
      }),
    });
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">{t('title')}</h2>
          <p className="text-white mt-2">{t('subtitle')}</p>
          <p className="text-blue-100 text-xs italic">{ t('note') }
            <a href="https://www.tax.gov.kh/u6rhf7ogbi6/gdtstream/fb78dfde-8342-4e3c-80e0-84ef81919c70" className="hover:text-blue-300" target='_blank' rel='noopener noreferrer'> { t('prakas') }</a> &
            <a className="hover:text-blue-300" target='_blank' rel='noopener noreferrer' href="https://www.nssf.gov.kh/%e1%9e%95%e1%9f%92%e1%9e%93%e1%9f%82%e1%9e%80%e1%9e%a0%e1%9e%b6%e1%9e%93%e1%9e%b7%e1%9e%97%e1%9f%90%e1%9e%99%e1%9e%80%e1%9e%b6%e1%9e%9a%e1%9e%84%e1%9e%b6%e1%9e%9a/%e1%9e%80%e1%9e%b6%e1%9e%9a%e1%9e%94%e1%9e%84%e1%9f%8b%e1%9e%97%e1%9e%b6%e1%9e%82%e1%9e%91%e1%9e%b6%e1%9e%93/"> NSSF</a>
          </p>
        </div>

        <div className='p-3 pb-0 md:p-8 md:pb-0 space-y-6 flex justify-center'>
          <CurrencyToggle
            currency={currency}
            setCurrency={handleCurrencyChange}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={`${t('grossSalary')} (${currency})`}
              type="number"
              step="0.01"
              register={register('grossSalary', { valueAsNumber: true })}
              error={errors.grossSalary?.message}
            />

            <InputField
              label={`${t('otherIncome')} (${currency})`}
              type="number"
              step="0.01"
              register={register('otherIncome', { valueAsNumber: true })}
              error={errors.otherIncome?.message}
              tooltip={t('otherIncomesTooltip')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <InputField
              label={t('dependants')}
              type="number"
              register={register('dependants', { valueAsNumber: true })}
              error={errors.dependants?.message}
              tooltip={t('dependantsTooltip')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={t('exchangeRate')}
              type="number"
              step="1"
              register={register('exchangeRate', { valueAsNumber: true })}
              error={errors.exchangeRate?.message}
              detail={<span dangerouslySetInnerHTML={{ __html: "Check for <a class='text-blue-600 underline' href='https://www.nbc.gov.kh/english/economic_research/exchange_rate.php' target='_blank' rel='noopener noreferrer'>NBC Exchange Rate</a>" }} />}
              disabled={currency === 'RIEL'}
            />

            <InputField
              label={t('nffsRate')}
              type="number"
              step="1"
              register={register('nssfRate', { valueAsNumber: true })}
              error={errors.nssfRate?.message}
              detail={<span dangerouslySetInnerHTML={{ __html: `Check for <a class='text-blue-600 underline' href='https://www.nssf.gov.kh/exchange-rate/' target='_blank' rel='noopener noreferrer'>NSSF Exchange Rate</a>` }} />}
              disabled={currency === 'RIEL'}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            {t('calculate')}
          </button>
        </form>

        {result !== null && (
          <div className="border-t border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">{t('result')}</h3>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                {t('taxRate')}: <span className='font-bold text-gray-900 dark:text-gray-100'>{result[3]}%</span>
              </p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                {t('incomeTax')}: <span className='font-bold text-gray-900 dark:text-gray-100'>{currency === 'USD' ? '$' : '៛'}{result[0].toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {t('nssfDeduce')}: <span className='font-bold text-gray-900 dark:text-gray-100'>{currency === 'USD' ? '$' : '៛'}{result[1].toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
              </p>
              <p className="mt-4 text-3xl font-bold text-blue-600 dark:text-blue-400">
                {currency === 'USD' ? '$' : '៛'}{result[2].toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-100">{t('afterTax')}</p>
            </div>
          </div>
        )}
      </div>
      <p className='text-center text-xs text-gray-500 dark:text-gray-400 pt-10'>
        <a href='https://t.me/samneng_bot/' target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'><i>Samneng</i></a>, Made with ❤️
      </p>
    </div>
  );
}