import { useMemo, useState, type FormEvent } from 'react'
import { calculateTaxCredit } from './lib/api'
import { COPY } from './lib/copy'
import { PROVINCE_KEYS, provinceLabel } from './lib/provinces'
import type { Language, TaxCreditData } from './types/taxCredit'
import './App.css'

function formatCad(value: number | null | undefined, lang: Language): string {
  if (value == null || Number.isNaN(value)) return COPY[lang].na
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 2,
  }).format(value)
}

function parseMoney(raw: string): number {
  const n = Number.parseFloat(raw.replace(/,/g, ''))
  return Number.isFinite(n) ? Math.max(0, n) : 0
}

export default function App() {
  const [lang, setLang] = useState<Language>('en')
  const t = COPY[lang]

  const [province, setProvince] = useState<string>('ON')
  const [donationRaw, setDonationRaw] = useState<string>('1000')
  const [advanced, setAdvanced] = useState(false)
  const [incomeRaw, setIncomeRaw] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<TaxCreditData | null>(null)

  const donation = useMemo(() => parseMoney(donationRaw), [donationRaw])
  const taxableIncome = useMemo(() => {
    if (!advanced) return undefined
    const n = Number.parseFloat(incomeRaw.replace(/,/g, ''))
    return Number.isFinite(n) && n > 0 ? n : undefined
  }, [advanced, incomeRaw])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setResult(null)
    try {
      const data = await calculateTaxCredit({
        language: lang,
        province,
        donation,
        taxableIncome,
      })
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="widget">
      <header className="widget__header">
        <h1 className="widget__title">{t.title}</h1>
        <p className="widget__subtitle">{t.subtitle}</p>
        <p className="widget__disclaimer" role="note">
          {t.disclaimer}
        </p>
      </header>

      <form className="widget__form" onSubmit={onSubmit}>
        <div className="field-row">
          <label className="field">
            <span className="field__label">{t.langLabel}</span>
            <select
              className="field__control"
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </label>
        </div>

        <label className="field">
          <span className="field__label">{t.province}</span>
          <select
            className="field__control"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            {PROVINCE_KEYS.map((code) => (
              <option key={code} value={code}>
                {provinceLabel(code, lang)}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">{t.donation}</span>
          <input
            className="field__control"
            inputMode="decimal"
            value={donationRaw}
            onChange={(e) => setDonationRaw(e.target.value)}
            min={0}
          />
        </label>

        <fieldset className="advanced">
          <legend className="advanced__legend">
            <label className="advanced__toggle">
              <input
                type="checkbox"
                checked={advanced}
                onChange={(e) => setAdvanced(e.target.checked)}
              />
              <span>{t.advanced}</span>
            </label>
          </legend>
          {advanced ? (
            <label className="field">
              <span className="field__label">{t.taxableIncome}</span>
              <input
                className="field__control"
                inputMode="decimal"
                value={incomeRaw}
                onChange={(e) => setIncomeRaw(e.target.value)}
                placeholder=""
              />
              <span className="field__hint">{t.taxableIncomeHint}</span>
            </label>
          ) : null}
        </fieldset>

        <button className="submit" type="submit" disabled={loading}>
          {loading ? t.calculating : t.calculate}
        </button>
      </form>

      {error ? (
        <p className="msg msg--error" role="alert">
          {t.errorPrefix} {error}
        </p>
      ) : null}

      {result ? (
        <section className="results" aria-live="polite">
          {result.estimateMode ? (
            <p className="msg msg--info">{t.estimateBanner}</p>
          ) : null}
          <p className="results__meta">
            {t.incomeUsed}:{' '}
            <strong>
              {formatCad(result.taxableIncomeUsedForCredit, lang)}
            </strong>
          </p>
          <dl className="results__grid">
            <div className="results__row">
              <dt>{t.federal}</dt>
              <dd>{formatCad(result.taxCredit.federalTaxCredit, lang)}</dd>
            </div>
            <div className="results__row">
              <dt>{t.provincial}</dt>
              <dd>{formatCad(result.taxCredit.provincialTaxCredit, lang)}</dd>
            </div>
            <div className="results__row results__row--total">
              <dt>{t.total}</dt>
              <dd>{formatCad(result.taxCredit.totalTaxCredit, lang)}</dd>
            </div>
          </dl>
        </section>
      ) : null}
    </div>
  )
}
