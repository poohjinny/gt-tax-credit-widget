import type { Language } from '../types/taxCredit'

export type OrgId = 'dev'

const ALLOWED_ORGS: readonly OrgId[] = ['dev']

/**
 * Reads `?org=` from a query string. Only whitelisted org ids are returned.
 * Example: `?org=dev` → `dev`
 */
export function parseOrgFromSearch(search: string): OrgId | null {
  const raw = new URLSearchParams(search).get('org')?.trim().toLowerCase()
  if (!raw) return null
  return (ALLOWED_ORGS as readonly string[]).includes(raw) ? (raw as OrgId) : null
}

export function getOrgLogoSrc(org: OrgId, lang: Language): string {
  if (org === 'dev') {
    return lang === 'fr' ? '/org/dev/logo_fr.svg' : '/org/dev/logo_en.svg'
  }
  return ''
}
