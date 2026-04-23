import type { Language } from '../types/taxCredit'

export const PROVINCE_KEYS = [
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NT',
  'NS',
  'NU',
  'ON',
  'PE',
  'QC',
  'SK',
  'YT',
] as const

export type ProvinceCode = (typeof PROVINCE_KEYS)[number]

const NAMES: Record<ProvinceCode, Record<Language, string>> = {
  AB: { en: 'Alberta', fr: 'Alberta' },
  BC: { en: 'British Columbia', fr: 'Colombie-Britannique' },
  MB: { en: 'Manitoba', fr: 'Manitoba' },
  NB: { en: 'New Brunswick', fr: 'Nouveau-Brunswick' },
  NL: {
    en: 'Newfoundland and Labrador',
    fr: 'Terre-Neuve-et-Labrador',
  },
  NT: {
    en: 'Northwest Territories',
    fr: 'Territoires du Nord-Ouest',
  },
  NS: { en: 'Nova Scotia', fr: 'Nouvelle-Écosse' },
  NU: { en: 'Nunavut', fr: 'Nunavut' },
  ON: { en: 'Ontario', fr: 'Ontario' },
  PE: {
    en: 'Prince Edward Island',
    fr: 'Île-du-Prince-Édouard',
  },
  QC: { en: 'Quebec', fr: 'Québec' },
  SK: { en: 'Saskatchewan', fr: 'Saskatchewan' },
  YT: {
    en: 'Yukon Territories',
    fr: 'Territoires du Yukon',
  },
}

export function provinceLabel(key: string, lang: Language): string {
  if (!(key in NAMES)) return key
  const row = NAMES[key as ProvinceCode]
  return row[lang] ?? row.en
}
