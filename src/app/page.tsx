import TaxCalculator from '@/components/TaxCalculator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Salary Tax Calculator
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Calculate your salary after tax deductions and dependants
        </p>
        <TaxCalculator />
      </div>
    </main>
  )
}