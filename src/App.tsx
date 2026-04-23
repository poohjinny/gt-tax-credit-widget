import { useMemo, useState, type FormEvent } from 'react';
import { calculateTaxCredit } from './lib/api';
import { COPY } from './lib/copy';
import { getDiscoverDonationsUrl } from './lib/discoverUrl';
import { getOrgLogoSrc, parseOrgFromSearch } from './lib/orgConfig';
import { PROVINCE_KEYS, provinceLabel } from './lib/provinces';
import type { Language, TaxCreditData } from './types/taxCredit';
import './App.css';
import './org-themes.css';

function formatCad(value: number | null | undefined, lang: Language): string {
  if (value == null || Number.isNaN(value)) return COPY[lang].na;
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 2,
  }).format(value);
}

function parseMoney(raw: string): number {
  const n = Number.parseFloat(raw.replace(/,/g, ''));
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = COPY[lang];

  const [province, setProvince] = useState<string>('ON');
  const [donationRaw, setDonationRaw] = useState<string>('1000');
  const [advanced, setAdvanced] = useState(false);
  const [incomeRaw, setIncomeRaw] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TaxCreditData | null>(null);

  const orgId = useMemo(
    () =>
      typeof window !== 'undefined' ?
        parseOrgFromSearch(window.location.search)
      : null,
    [],
  );

  const donation = useMemo(() => parseMoney(donationRaw), [donationRaw]);
  const taxableIncome = useMemo(() => {
    if (!advanced) return undefined;
    const n = Number.parseFloat(incomeRaw.replace(/,/g, ''));
    return Number.isFinite(n) && n > 0 ? n : undefined;
  }, [advanced, incomeRaw]);

  const donationFilled = donationRaw.trim().length > 0;
  const incomeFilled = incomeRaw.trim().length > 0;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const data = await calculateTaxCredit({
        language: lang,
        province,
        donation,
        taxableIncome,
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='widget' data-org={orgId ?? undefined}>
      <header className='widget__header'>
        {orgId ?
          <div className='widget__logo'>
            <img
              className='widget__logo-img'
              src={getOrgLogoSrc(orgId, lang)}
              alt={t.orgLogoAlt}
              width={800}
              height={200}
              loading='eager'
              decoding='async'
            />
          </div>
        : null}
        <h1 className='widget__title heading heading--primary'>{t.title}</h1>
        <p className='widget__subtitle'>{t.subtitle}</p>
        <p className='widget__disclaimer paragraph' role='note'>
          {t.disclaimer}
        </p>
      </header>

      <form className='widget__form' onSubmit={onSubmit}>
        <div className='field'>
          <div className='field__control' data-orientation='vertical'>
            <label className='field__label' htmlFor='widget-lang'>
              {t.langLabel}
            </label>
            <div className='field__select-container'>
              <select
                id='widget-lang'
                className='field__select'
                data-selected=''
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
              >
                <option value='en'>English</option>
                <option value='fr'>Français</option>
              </select>
              <span className='field__select-icon' aria-hidden='true' />
            </div>
          </div>
        </div>

        <div className='field'>
          <div className='field__control' data-orientation='vertical'>
            <label className='field__label' htmlFor='widget-province'>
              {t.province}
            </label>
            <div className='field__select-container'>
              <select
                id='widget-province'
                className='field__select'
                data-selected=''
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                {PROVINCE_KEYS.map((code) => (
                  <option key={code} value={code}>
                    {provinceLabel(code, lang)}
                  </option>
                ))}
              </select>
              <span className='field__select-icon' aria-hidden='true' />
            </div>
          </div>
        </div>

        <div className='field'>
          <div className='field__control' data-orientation='vertical'>
            <label className='field__label' htmlFor='widget-donation'>
              {t.donation}
            </label>
            <input
              id='widget-donation'
              className='field__input'
              type='text'
              inputMode='decimal'
              value={donationRaw}
              onChange={(e) => setDonationRaw(e.target.value)}
              {...(donationFilled ? { 'data-filled': '' } : {})}
            />
          </div>
        </div>

        <fieldset className='fieldset advanced'>
          <legend className='advanced__legend'>
            <span className='checkbox-field'>
              <input
                id='widget-advanced'
                type='checkbox'
                className='checkbox-field__native'
                checked={advanced}
                onChange={(e) => setAdvanced(e.target.checked)}
              />
              <label
                htmlFor='widget-advanced'
                className='checkbox-field__label'
              >
                <span className='checkbox-field__box' aria-hidden='true'>
                  {advanced ?
                    <svg
                      className='checkbox-field__check'
                      width='12'
                      height='10'
                      viewBox='0 0 12 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                    >
                      <path
                        d='M1 5.2L4.3 8.5L11 1.5'
                        stroke='#fff'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  : null}
                </span>
                <span className='checkbox-field__text'>{t.advanced}</span>
              </label>
            </span>
          </legend>
          {advanced ?
            <div className='field'>
              <div className='field__control' data-orientation='vertical'>
                <label className='field__label' htmlFor='widget-income'>
                  {t.taxableIncome}
                </label>
                <input
                  id='widget-income'
                  className='field__input'
                  type='text'
                  inputMode='decimal'
                  value={incomeRaw}
                  onChange={(e) => setIncomeRaw(e.target.value)}
                  {...(incomeFilled ? { 'data-filled': '' } : {})}
                />
              </div>
              <p className='field__description field__description--static'>
                <span className='field__description-text'>
                  {t.taxableIncomeHint}
                </span>
              </p>
            </div>
          : null}
        </fieldset>

        <div className='widget__submit-wrap'>
          <button
            type='submit'
            className='button button--submit button--center'
            disabled={loading}
          >
            <span className='button__text'>
              {loading ? t.calculating : t.calculate}
            </span>
          </button>
        </div>
      </form>

      {error ?
        <p className='msg msg--error' role='alert'>
          {t.errorPrefix} {error}
        </p>
      : null}

      {result ?
        <section className='results' aria-live='polite'>
          {result.estimateMode ?
            <p className='msg msg--info'>{t.estimateBanner}</p>
          : null}
          <p className='results__meta'>
            {t.incomeUsed}:{' '}
            <strong>
              {formatCad(result.taxableIncomeUsedForCredit, lang)}
            </strong>
          </p>
          <dl className='results__grid'>
            <div className='results__row'>
              <dt>{t.federal}</dt>
              <dd>{formatCad(result.taxCredit.federalTaxCredit, lang)}</dd>
            </div>
            <div className='results__row'>
              <dt>{t.provincial}</dt>
              <dd>{formatCad(result.taxCredit.provincialTaxCredit, lang)}</dd>
            </div>
            <div className='results__row results__row--total'>
              <dt>{t.total}</dt>
              <dd>{formatCad(result.taxCredit.totalTaxCredit, lang)}</dd>
            </div>
          </dl>
          <div className='results__discover'>
            <a
              className='results__discover-cta'
              href={getDiscoverDonationsUrl()}
              target='_blank'
              rel='noopener noreferrer'
            >
              {t.discoverDonationsCta}
            </a>
          </div>
        </section>
      : null}
    </div>
  );
}
