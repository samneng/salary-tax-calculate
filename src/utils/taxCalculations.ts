interface TaxInput {
  netSalary: number;
  otherIncome: number;
  dependants: number;
  exchangeRate: number;
  nffsRate: number;
}

export function calculateTax({
  netSalary,
  otherIncome,
  dependants,
  exchangeRate,
  nffsRate,
}: TaxInput): Array<number> {
  // Convert all amounts to the target currency
  const totalIncomeUSD = netSalary + otherIncome;
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

  // Calculate NFFS tax
  const nffsSalary = Math.round(netSalary * nffsRate);
  let nffsDeduction = 0;
  if(nffsSalary <= 0){
    nffsDeduction = 0 * 0.02;
  }else if(nffsSalary <= 400000){
    nffsDeduction = 400000 * 0.02;
  }else if(nffsSalary >= 1200000){
    nffsDeduction = 1200000 * 0.02;
  }else if(nffsSalary < 1200000){
    nffsDeduction = nffsSalary * 0.02;
  }
  const nffsDeductionUSD = nffsDeduction / nffsRate;

  // Calculate Salary after Tax
  const salaryAfterTax = totalIncomeUSD - salaryTaxUSD - nffsDeductionUSD;

  // Return final amount after tax
  return [salaryTaxUSD, nffsDeductionUSD, salaryAfterTax];
}