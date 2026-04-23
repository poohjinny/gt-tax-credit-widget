export type Language = 'en' | 'fr'

export interface TaxCreditAmounts {
  federalTaxCredit: number | null
  provincialTaxCredit: number | null
  totalTaxCredit: number | null
}

export interface TaxCreditData {
  province: string
  provinceName: string
  donation: number
  taxableIncomeProvided: boolean
  taxableIncomeUsedForCredit: number
  estimateMode: boolean
  taxCredit: TaxCreditAmounts
}

export type CalculateResponse =
  | { success: true; message?: string; data: TaxCreditData }
  | { success: false; error: string }
