import type { Language } from '../types/taxCredit'

type Copy = {
  title: string
  subtitle: string
  disclaimer: string
  langLabel: string
  province: string
  donation: string
  calculate: string
  calculating: string
  advanced: string
  taxableIncome: string
  taxableIncomeHint: string
  estimateBanner: string
  incomeUsed: string
  federal: string
  provincial: string
  total: string
  na: string
  errorPrefix: string
}

export const COPY: Record<Language, Copy> = {
  en: {
    title: 'Charitable donation tax credit (Canada)',
    subtitle: 'Illustrative estimate using the same rules as Giftabulator.',
    disclaimer:
      'This tool is for education only. It is not tax or legal advice. ' +
      'Consult a qualified professional for your situation.',
    langLabel: 'Language',
    province: 'Province / territory',
    donation: 'Eligible donation amount ($)',
    calculate: 'Calculate',
    calculating: 'Calculating…',
    advanced: 'More accurate (optional taxable income)',
    taxableIncome: 'Taxable income ($)',
    taxableIncomeHint:
      'When blank, a default income is used only to pick the federal rate over $200.',
    estimateBanner:
      'Estimate mode: taxable income was not provided; a default amount is used for the federal bracket over $200.',
    incomeUsed: 'Income used for credit calculation',
    federal: 'Federal credit',
    provincial: 'Provincial / territorial credit',
    total: 'Total estimated credit',
    na: '—',
    errorPrefix: 'Could not calculate:',
  },
  fr: {
    title: "Crédit d'impôt pour don de bienfaisance (Canada)",
    subtitle: "Estimation indicative selon les mêmes règles que Giftabulator.",
    disclaimer:
      "Cet outil est à titre informatif seulement. Ce n'est pas un conseil fiscal ou juridique. " +
      'Consultez un professionnel qualifié pour votre situation.',
    langLabel: 'Langue',
    province: 'Province ou territoire',
    donation: 'Montant du don admissible ($)',
    calculate: 'Calculer',
    calculating: 'Calcul en cours…',
    advanced: "Plus précis (revenu imposable facultatif)",
    taxableIncome: 'Revenu imposable ($)',
    taxableIncomeHint:
      'Si vide, un revenu par défaut sert uniquement au taux fédéral sur la portion supérieure à 200 $.',
    estimateBanner:
      "Mode estimation : le revenu imposable n'a pas été fourni; un montant par défaut sert au palier fédéral au-delà de 200 $.",
    incomeUsed: 'Revenu utilisé pour le calcul du crédit',
    federal: 'Crédit fédéral',
    provincial: 'Crédit provincial / territorial',
    total: 'Crédit total estimé',
    na: '—',
    errorPrefix: 'Impossible de calculer :',
  },
}
