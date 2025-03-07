interface TaxInput {
  grossSalary: number;
  otherIncome: number;
  dependants: number;
  exchangeRate: number;
  nssfRate: number | null;
  currency: string;
}

export function calculateTax({
  grossSalary,
  otherIncome,
  dependants,
  exchangeRate,
  nssfRate,
  currency,
}: TaxInput): Array<number> {
  // Convert all amounts to the target currency
  const totalIncome = grossSalary + otherIncome;
  const totalIncomeKHR = currency === 'USD' ? Math.round(totalIncome * exchangeRate) : totalIncome;

  // Basic deduction per dependant (example value)
  const dependantDeduction = 150000 * dependants;

  // Calculate taxable income
  const taxableIncome = totalIncomeKHR - dependantDeduction;

  // Get Tax Rate
  let salaryTax = 0;
  let tax = 0;
  if (taxableIncome > 12500000) {
    salaryTax = (0.2 * taxableIncome) - 1225000;
    tax = 20;
  } else if (taxableIncome > 8500000) {
    salaryTax = (0.15 * taxableIncome) - 600000;
    tax = 15;
  } else if (taxableIncome > 2000000) {
    salaryTax = (0.1 * taxableIncome) - 175000;
    tax = 10;
  }else if (taxableIncome > 1500000) {
    salaryTax = (0.05 * taxableIncome) - 75000;
    tax = 5;
  }
  const taxPercent = tax;
  const incomTax = currency === 'USD' ? salaryTax / exchangeRate : salaryTax;

  // Calculate NSSF tax
  const nssfSalary = currency === 'USD' ? (nssfRate ? Math.round(grossSalary * nssfRate) : 0) : grossSalary;
  let nssfDeduction = 0;
  if(nssfSalary <= 0){
    nssfDeduction = 0 * 0.02;
  }else if(nssfSalary <= 400000){
    nssfDeduction = 400000 * 0.02;
  }else if(nssfSalary >= 1200000){
    nssfDeduction = 1200000 * 0.02;
  }else if(nssfSalary < 1200000){
    nssfDeduction = nssfSalary * 0.02;
  }
  const pensionFund = currency === "USD" ? (nssfRate ? nssfDeduction / nssfRate : 0) : nssfDeduction;

  // Calculate Salary after Tax
  const salaryAfterTax = totalIncome - incomTax - pensionFund;

  // Return final amount after tax
  return [incomTax, pensionFund, salaryAfterTax, taxPercent];
}