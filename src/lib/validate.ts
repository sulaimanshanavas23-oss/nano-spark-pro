/**
 * Lightweight client-side validation & sanitization helpers.
 * Keeps user-supplied text clean before it is sent or logged.
 */

export interface ValidationResult {
  valid: boolean
  message?: string
}

export function sanitizeText(value: string, maxLength: number): string {
  const cleaned = value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  return cleaned.slice(0, maxLength)
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

export function validateRequired(value: string, label: string, maxLength: number): ValidationResult {
  const cleaned = sanitizeText(value, maxLength)
  if (!cleaned) return { valid: false, message: `${label} is required.` }
  if (value.length > maxLength) return { valid: false, message: `${label} is too long (max ${maxLength} characters).` }
  return { valid: true }
}

export function validateEmail(value: string): ValidationResult {
  const cleaned = sanitizeText(value, 200)
  if (!cleaned) return { valid: false, message: 'Email is required.' }
  if (!isValidEmail(cleaned)) return { valid: false, message: 'Please enter a valid email address.' }
  return { valid: true }
}
