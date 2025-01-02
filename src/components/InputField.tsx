'use client';
import { ReactNode } from 'react';
interface InputFieldProps {
  label: string;
  type: string;
  register: any;
  error?: string;
  step?: string;
  detail?: ReactNode;
}

export default function InputField({ label, type, register, error, step, detail }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {detail && (
      <p className="text-sm text-gray-500">{detail}</p>
      )}
      <input
        type={type}
        step={step}
        {...register}
        className="w-full px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}