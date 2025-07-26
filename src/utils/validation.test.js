import { describe, it, expect } from 'vitest'
import {
	isValidEmail,
	isValidPhone,
	isRequired,
	hasMinLength,
	hasMaxLength,
	isNotFutureDate
} from './validation.js'

describe('Validation Utils', () => {
	describe('isValidEmail', () => {
		it('should return true for valid emails', () => {
			expect(isValidEmail('test@example.com')).toBe(true)
			expect(isValidEmail('user.name@domain.org')).toBe(true)
			expect(isValidEmail('test+tag@example.co.uk')).toBe(true)
		})

		it('should return false for invalid emails', () => {
			expect(isValidEmail('invalid-email')).toBe(false)
			expect(isValidEmail('test@')).toBe(false)
			expect(isValidEmail('@example.com')).toBe(false)
			expect(isValidEmail('test.example.com')).toBe(false)
			expect(isValidEmail('')).toBe(false)
			expect(isValidEmail(null)).toBe(false)
			expect(isValidEmail(undefined)).toBe(false)
		})
	})

	describe('isValidPhone', () => {
		it('should return true for valid phone numbers', () => {
			expect(isValidPhone('555-123-4567')).toBe(true)
			expect(isValidPhone('(555) 123-4567')).toBe(true)
			expect(isValidPhone('5551234567')).toBe(true)
			expect(isValidPhone('+1234567890')).toBe(true)
		})

		it('should return false for invalid phone numbers', () => {
			expect(isValidPhone('123')).toBe(false)
			expect(isValidPhone('abc-def-ghij')).toBe(false)
			expect(isValidPhone('')).toBe(false)
			expect(isValidPhone(null)).toBe(false)
			expect(isValidPhone(undefined)).toBe(false)
		})
	})

	describe('isRequired', () => {
		it('should return true for non-empty values', () => {
			expect(isRequired('test')).toBe(true)
			expect(isRequired('   test   ')).toBe(true) // trimmed
			expect(isRequired(123)).toBe(true)
			expect(isRequired(0)).toBe(true)
			expect(isRequired(false)).toBe(true)
		})

		it('should return false for empty values', () => {
			expect(isRequired('')).toBe(false)
			expect(isRequired('   ')).toBe(false) // only whitespace
			expect(isRequired(null)).toBe(false)
			expect(isRequired(undefined)).toBe(false)
		})
	})

	describe('hasMinLength', () => {
		it('should return true when value meets minimum length', () => {
			expect(hasMinLength('hello', 3)).toBe(true)
			expect(hasMinLength('hello', 5)).toBe(true)
			expect(hasMinLength('12345', 5)).toBe(true)
		})

		it('should return false when value is too short', () => {
			expect(hasMinLength('hi', 3)).toBe(false)
			expect(hasMinLength('', 1)).toBe(false)
			expect(hasMinLength(null, 1)).toBe(false)
			expect(hasMinLength(undefined, 1)).toBe(false)
		})
	})

	describe('hasMaxLength', () => {
		it('should return true when value is within maximum length', () => {
			expect(hasMaxLength('hello', 10)).toBe(true)
			expect(hasMaxLength('hello', 5)).toBe(true)
			expect(hasMaxLength('', 5)).toBe(true)
			expect(hasMaxLength(null, 5)).toBe(true)
			expect(hasMaxLength(undefined, 5)).toBe(true)
		})

		it('should return false when value exceeds maximum length', () => {
			expect(hasMaxLength('hello world', 5)).toBe(false)
			expect(hasMaxLength('123456', 5)).toBe(false)
		})
	})

	describe('isNotFutureDate', () => {
		it('should return true for dates in the past', () => {
			expect(isNotFutureDate('1990-01-01')).toBe(true)
			expect(isNotFutureDate('2020-06-15')).toBe(true)
		})

		it('should return true for today', () => {
			const today = new Date().toISOString().split('T')[0]
			expect(isNotFutureDate(today)).toBe(true)
		})

		it('should return false for future dates', () => {
			const futureYear = new Date().getFullYear() + 1
			expect(isNotFutureDate(`${futureYear}-01-01`)).toBe(false)
		})

		it('should return false for invalid dates', () => {
			expect(isNotFutureDate('')).toBe(false)
			expect(isNotFutureDate('invalid-date')).toBe(false)
			expect(isNotFutureDate(null)).toBe(false)
			expect(isNotFutureDate(undefined)).toBe(false)
		})
	})
})
