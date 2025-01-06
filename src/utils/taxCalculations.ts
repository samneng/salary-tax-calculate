interface TaxInput {
  grossSalary: number;
  otherIncome: number;
  dependants: number;
  exchangeRate: number;
  nssfRate: number;
}

export function calculateTax({
  grossSalary,
  otherIncome,
  dependants,
  exchangeRate,
  nssfRate,
}: TaxInput): Array<number> {
  // Convert all amounts to the target currency
  const totalIncomeUSD = grossSalary + otherIncome;
  const totalIncomeKHR = Math.round(totalIncomeUSD * exchangeRate);

  // Basic deduction per dependant (example value)
  const dependantDeduction = 150000 * dependants;

  // Calculate taxable income
  const taxableIncome = totalIncomeKHR - dependantDeduction;

  // Get Tax Rate
  let salaryTax = 0;
  if (taxableIncome > 12500000) {
    salaryTax = (0.2 * taxableIncome) - 1225000;
  } else if (taxableIncome > 8500000) {
    salaryTax = (0.15 * taxableIncome) - 600000;
  } else if (taxableIncome > 2000000) {
    salaryTax = (0.1 * taxableIncome) - 175000;
  }else if (taxableIncome > 1500000) {
    salaryTax = (0.05 * taxableIncome) - 75000;
  }
  const salaryTaxUSD = salaryTax / exchangeRate;

  // Calculate NSSF tax
  const nssfSalary = Math.round(grossSalary * nssfRate);
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
  const nssfDeductionUSD = nssfDeduction / nssfRate;

  // Calculate Salary after Tax
  const salaryAfterTax = totalIncomeUSD - salaryTaxUSD - nssfDeductionUSD;

  // Return final amount after tax
  return [salaryTaxUSD, nssfDeductionUSD, salaryAfterTax];
}