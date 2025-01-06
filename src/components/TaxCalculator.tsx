'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateTax } from '@/utils/taxCalculations';
import { useState } from 'react';
import InputField from './InputField';

const calculatorSchema = z.object({
  grossSalary: z.number().min(0, 'Gross Salary must be a positive number'),
  otherIncome: z.number().min(0, 'Additional allowance must be a positive number'),
  dependants: z.number().min(0, 'Number of dependants must be non-negative'),
  exchangeRate: z.number().positive('NBC rate must be a positive number'),
  nssfRate: z.number().positive('NSSF rate must be a positive number').optional(),
});

type CalculatorInputs = z.infer<typeof calculatorSchema>;

export default function TaxCalculator() {
  const [result, setResult] = useState<Array<number> | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorInputs>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      grossSalary: 0,
      otherIncome: 0,
      dependants: 0,
      exchangeRate: 4000,
      nssfRate: 4000,
    },
  });

  const onSubmit = (data: CalculatorInputs) => {
    const taxResults = calculateTax({
      ...data,
      nssfRate: data.nssfRate ?? 0,
    });
    setResult(taxResults); // Assuming you want the first result
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Tax Calculator</h2>
          <p className="text-blue-100 mt-2">Calculate your after-tax salary with deductions</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Gross Salary (USD $)"
              type="number"
              step="0.01"
              register={register('grossSalary', { valueAsNumber: true })}
              error={errors.grossSalary?.message}
            />

            <InputField
              label="Additional allowance (USD $)"
              type="number"
              step="0.01"
              register={register('otherIncome', { valueAsNumber: true })}
              error={errors.otherIncome?.message}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <InputField
              label="Number of Dependants"
              type="number"
              register={register('dependants', { valueAsNumber: true })}
              error={errors.dependants?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="NBC Rate (KHR ៛)"
              type="number"
              step="0.01"
              register={register('exchangeRate', { valueAsNumber: true })}
              error={errors.exchangeRate?.message}
              detail={<span dangerouslySetInnerHTML={{ __html: "Check for <a class='text-blue-600 underline' href='https://www.nbc.gov.kh/english/economic_research/exchange_rate.php' target='_blank' rel='noopener noreferrer'>NBC Exchange Rate</a>" }} />}
            />

            <InputField
              label="NSSF Rate  (KHR ៛)"
              type="number"
              step="0.01"
              register={register('nssfRate', { valueAsNumber: true })}
              error={errors.nssfRate?.message}
              detail={<span dangerouslySetInnerHTML={{ __html: "Check for <a class='text-blue-600 underline' href='https://www.nssf.gov.kh/exchange-rate/' target='_blank' rel='noopener noreferrer'>NSSF Exchange Rate</a>" }} />}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Calculate Tax
          </button>
        </form>

        {result !== null && (
          <div className="border-t border-gray-100 bg-gray-50 p-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Calculation Result</h3>
              <p className="mt-4 text-sm text-gray-500">
                Income Tax: <span className='font-bold text-gray-900'>${result[0].toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-500">
                NSSF Deduction: <span className='font-bold text-gray-900'>${result[1].toFixed(2)}</span>
              </p>
              <p className="mt-4 text-3xl font-bold text-blue-600">
                ${result[2].toFixed(2)}
              </p>
              <p className="mt-1 text-sm text-gray-500">Your Take Home Salary</p>
            </div>
          </div>
        )}
      </div>
      <p className='text-center text-xs text-gray-500 pt-10'>
        Powered by <a href='https://t.me/samneng_bot/' target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'><i>Samneng</i></a>
      </p>
    </div>
  );
}