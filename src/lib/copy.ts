import type { Language } from '../types/taxCredit';

type Copy = {
  title: string;
  subtitle: string;
  disclaimer: string;
  langLabel: string;
  province: string;
  donation: string;
  calculate: string;
  calculating: string;
  advanced: string;
  taxableIncome: string;
  taxableIncomeHint: string;
  estimateBanner: string;
  incomeUsed: string;
  federal: string;
  provincial: string;
  total: string;
  na: string;
  errorPrefix: string;
  orgLogoAlt: string;
};

export const COPY: Record<Language, Copy> = {
  en: {
    title: 'See How Much Your Giving Gives Back',
    subtitle:
      'Your kindness changes lives—and it comes with rewarding tax benefits. ' +
      'Discover how your contributions can go even further for the causes you care about.',
    disclaimer:
      'This tool provides general guidance for educational use. Actual tax credits may vary. ' +
      'We recommend consulting a tax advisor for official filings.',
    langLabel: 'Language',
    province: 'Province / territory',
    donation: 'Eligible donation amount ($)',
    calculate: 'Calculate',
    calculating: 'Calculating…',
    advanced: 'Optional: enter your taxable income for a closer estimate',
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
    orgLogoAlt: 'Organization logo',
  },
  fr: {
    title: 'Découvrez combien votre générosité vous rapporte',
    subtitle:
      "Votre bienveillance change des vies — et s'accompagne d'avantages fiscaux intéressants. " +
      'Découvrez comment vos contributions peuvent aller encore plus loin pour les causes qui vous tiennent à cœur.',
    disclaimer:
      "Cet outil offre des indications générales à des fins éducatives. Les crédits d'impôt réels peuvent varier. " +
      'Nous recommandons de consulter un fiscaliste pour les déclarations officielles.',
    langLabel: 'Langue',
    province: 'Province ou territoire',
    donation: 'Montant du don admissible ($)',
    calculate: 'Calculer',
    calculating: 'Calcul en cours…',
    advanced:
      'Facultatif : indiquez votre revenu imposable pour une estimation plus proche',
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
    orgLogoAlt: "Logo de l'organisme",
  },
};
