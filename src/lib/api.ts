import type { CalculateResponse, Language, TaxCreditData } from '../types/taxCredit'

function apiRoot(): string {
  const raw = import.meta.env.VITE_API_BASE_URL?.trim() ?? ''
  return raw.replace(/\/+$/, '')
}

export async function calculateTaxCredit(params: {
  language: Language
  province: string
  donation: number
  taxableIncome?: number
}): Promise<TaxCreditData> {
  const root = apiRoot()
  if (!root) {
    throw new Error('Set VITE_API_BASE_URL in .env (API base including /v2.1).')
  }

  const body: {
    province: string
    donation: number
    taxableIncome?: number
  } = {
    province: params.province,
    donation: params.donation,
  }
  if (params.taxableIncome != null && params.taxableIncome > 0) {
    body.taxableIncome = params.taxableIncome
  }

  const res = await fetch(`${root}/calculator/calculate/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      context: {
        resource: 'tax-credit',
        country: 'CA',
        language: params.language,
      },
      data: body,
    }),
  })

  const json = (await res.json()) as CalculateResponse

  if (!res.ok || !json.success) {
    const msg = !json.success ? json.error : `HTTP ${res.status}`
    throw new Error(msg || 'Request failed')
  }

  return json.data
}
